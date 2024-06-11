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
};

export default data;
