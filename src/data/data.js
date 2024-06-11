const data = {
  project: {
    example_code: `# Without granularity
x = sxp.project(a = 5, b = 10, n = 0.5)
print("x:", x)
    
# With granularity
# @inc controls the bin size.
y = sxp.project(5, 10, 0.5, inc = .4)
print("y:", y)`,
    function_def: `def project(a : float, b : float, n : float, inc : float = None) -> float:
    """
    Project a normal val @n between @a and @b with an discretization 
    increment @inc.
    """
    assert n >= 0 and n <= 1
    assert b >= a
     
    # If no increment is provided, return the projection
    if inc is None:
        return n * (b - a) + a
     
    # Otherwise, round to the nearest increment
    n_inc = (b-a) / inc
    
    x = np.round(n_inc * n)
    return min(a + x*inc, b)`,
  },
  exhaustive_explorer: {
    function_def: `class ExhaustiveExplorer(Explorer):
    
    def __init__(self,
        scenario_manager : ScenarioManager,
        scenario : Callable[[pd.Series], Scenario],
        target_score_classifier : Callable[[pd.Series], bool]
    ):
        """
        The brute force explorer, which exhaustively tests all combinations of
        parameters.
        """
        super().__init__(scenario_manager, scenario, target_score_classifier)

        # Get discrete nromal inverals
        discrete_intervals = scenario_manager.params["inc_norm"].apply(
            lambda inc : list(np.arange(0,1,inc))
        ).to_list()

        # Add 1 to the to end since np.arange does not.
        [di.append(1) for di in discrete_intervals]

        # Create parameter combinations
        self._all_combinations = [np.array(params) \\
            for params in itertools.product(*discrete_intervals)]
        
        self._ptr = 0
        return

    @property
    def all_combinations(self) -> list[np.ndarray]:
        return self._all_combinations

    @property
    def ptr(self) -> int:
        return self._ptr

    def next_arr(self) -> np.ndarray:
        return self._arr

    def step(self) -> bool:
        self._arr = self.all_combinations[self.ptr]
        super().step()
        self._ptr += 1
        if self._ptr >= len(self._all_combinations):
            self._stage = self.STAGE_EXPLORATION_COMPLETE
            return True
        return False`,
  },
  sequence_explorer: {
    function_def: `class SequenceExplorer(Explorer):
    MONTE_CARLO = "random"
    HALTON = "halton"
    SOBOL = "sobol"

    def __init__(self, 
        strategy : str,
        seed : int,
        scenario_manager : ScenarioManager,
        scenario : Callable[[pd.Series], Scenario],
        target_score_classifier : Callable[[pd.Series], bool],
        scramble : bool = False,
        fast_foward : int = 0
    ):
        super().__init__(scenario_manager, scenario, target_score_classifier)
        assert strategy in ["random", "halton", "sobol"]

        d = len(scenario_manager.params.index)

        if strategy == self.MONTE_CARLO:
            seq = np.random.RandomState(seed = seed)
            if fast_foward:
                seq.random(size=d)
        elif strategy == self.HALTON:
            seq = qmc.Halton(d=d, scramble=scramble)
            if fast_foward:
                seq.fast_forward(fast_foward)
        elif strategy == self.SOBOL:
            seq = qmc.Sobol(d=d, scramble=scramble)
            if fast_foward:
                seq.fast_forward(fast_foward)
        else:
            raise NotImplementedError

        self._d = d
        self._seq = seq
        self._strategy = strategy
        return

    def next_arr(self) -> np.ndarray:
        if self._strategy == self.MONTE_CARLO:
            return self._seq.random(size = self._d)
        elif self._strategy in [self.SOBOL, self.HALTON]:
            return self._seq.random(1)[0]
        raise NotImplementedError

    def step(self) -> bool:
        tsc = super().step()
        if tsc:
            self._stage = self.STAGE_EXPLORATION_COMPLETE
        return tsc`,
  },
  find_surface_explorer: {
    function_def: `class FindSurfaceExplorer(Explorer):
    def __init__(self, 
        root : np.ndarray,
        seed : int,
        scenario_manager : ScenarioManager,
        scenario : Callable[[pd.Series], Scenario],
        target_score_classifier : Callable[[pd.Series], bool]
    ):
        super().__init__(scenario_manager, scenario, target_score_classifier)
        self.root = root
        self._d = scenario_manager.params["inc_norm"].to_numpy()
        rng = np.random.RandomState(seed=seed)
        self._v = rng.uniform(-1,1, size=root.shape)
        self._s = self._v * self._d / np.linalg.norm(self._v)
        self._interm = [root]
        self._prev = None
        self._cur = root
        self._stage = 0
        return

    @property
    def v(self) -> np.ndarray:
        return self._v

    def step(self):
        if self._stage == 0:
            self._prev = self._cur
            self._interm += [self._prev]
            self._cur = self._round_to_limits(
                self._prev + self._s,
                np.zeros(len(self.root)),
                np.ones(len(self.root))
            )
            if all(self._cur == self._prev):
                self._stage = 1
            elif not super().step():
                self._stage = 1
            return False
        elif self._stage == 1:
            self._s *= 0.5
            self._cur = self._round_to_limits(
                self._prev + self._s,
                np.zeros(len(self.root)),
                np.ones(len(self.root))
            )
            if all(self._cur == self._prev):
                self._stage = self.STAGE_EXPLORATION_COMPLETE
                return True
            elif not super().step():
                self._stage = self.STAGE_EXPLORATION_COMPLETE
                return True
            self._stage = 2
            return False
        elif self._stage == 2:
            self._prev = self._cur
            self._interm += [self._prev]
            self._cur = self._round_to_limits(
                self._prev + self._s,
                np.zeros(len(self.root)),
                np.ones(len(self.root))
            )
            if all(self._cur == self._prev):
                self._stage = self.STAGE_EXPLORATION_COMPLETE
                return True
            elif not super().step():
                self._stage = self.STAGE_EXPLORATION_COMPLETE
                return True
            return False
        raise NotImplemented

    def next_arr(self) -> np.ndarray:
        return self._cur

    def _round_to_limits(
        self,
        arr : np.ndarray, 
        min : np.ndarray, 
        max : np.ndarray
    ) -> np.ndarray:
        is_lower = arr < min
        is_higher = arr > max
        for i in range(len(arr)):
            if is_lower[i]:
                arr[i] = min[i]
            elif is_higher[i]:
                arr[i] = max[i]
        return arr`,
  },
  boundary_rrt_explorer: {
    function_def: `class BoundaryRRTExplorer(Explorer):
    def __init__(self,
        root : np.ndarray,
        root_n : np.ndarray,
        scenario_manager : ScenarioManager,
        scenario : Callable[[pd.Series], Scenario],
        target_score_classifier : Callable[[pd.Series], bool],
        strategy : str = "e",
        delta_theta : float = 15 * np.pi / 180,
        theta0 : float = 90 * np.pi / 180,
        N : int = 4,
        scale : float =  2
    ): 
        super().__init__(scenario_manager, scenario, target_score_classifier)
        
        classifier = self._brrt_classifier
        domain = sbt.Domain.normalized(root.shape[0])
        scaler = scenario_manager.params["inc_norm"].to_numpy() * scale

        strategy = strategy.lower()
        assert strategy in ["constant", "exponential", "const", "exp", "c", "e"]

        if strategy in ["constant", "const", "c"]:
            adh_factory = sbt.ConstantAdherenceFactory(
                classifier, domain, scaler, delta_theta, True
            )
        else:
            adh_factory = sbt.ExponentialAdherenceFactory(
                classifier, scaler, theta0, N, domain, True
            )

        self._brrt = sbt.BoundaryRRT(
            sbt.Point(root), root_n, adh_factory
        )

        self._n_boundary_lost_exceptions = 0
        self._n_sample_out_of_bounds_exceptions = 0
        return

    @property
    def brrt(self) -> sbt.BoundaryRRT:
        return self._brrt
    
    @property
    def n_boundary_lost_exceptions(self) -> int:
        return self._n_boundary_lost_exceptions

    @property
    def n_sample_out_of_bounds_exceptions(self) -> int:
        return self._n_sample_out_of_bounds_exceptions

    def _brrt_classifier(self, p : sbt.Point) -> bool:
        self._arr = p.array
        return super().step()

    def next_arr(self) -> np.ndarray:
        return self._arr

    def step(self):
        try: 
            self.brrt.step()
        except sbt.BoundaryLostException:
            self._n_boundary_lost_exceptions += 1
        except sbt.SampleOutOfBoundsException:
            self._n_sample_out_of_bounds_exceptions += 1
        except SampleOutOfBoundsException: 
            self._n_sample_out_of_bounds_exceptions += 1
        return False`,
  },
};

export default data;
