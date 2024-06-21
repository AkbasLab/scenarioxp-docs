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
    initialization_eg: `params_df = pd.read_csv("params.csv")
scenario = BlankScenario
tsc = lambda s: False

exp = sxp.ExhaustiveExplorer(manager, scenario, tsc)`,
    full_example: `import scenarioxp as sxp
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

class BlankScenario(sxp.Scenario):
    def __init__(self, params : pd.Series):
        super().__init__(params)
        self._score = pd.Series({"color" : 0})
        return

def main():
    params_df = pd.read_csv("params.csv")
    
    manager = sxp.ScenarioManager(params_df)
    scenario = BlankScenario
    tsc = lambda s: False

    exp = sxp.ExhaustiveExplorer(manager, scenario, tsc)
    
    fig = plt.figure(figsize=(5,2))
    ax = plt.gca()

    # Add vertical lines every 0.05
    for xc in np.arange(0.025, 1.05, 0.05):
        ax.axvline(x=xc, color='grey', linestyle='-', linewidth=0.5, zorder=1)
        ax.axhline(y=xc, color='grey', linestyle='-', linewidth=0.5, zorder=1)

    points = np.array(exp.all_combinations).T
    ax.scatter(*points,color="black",marker=".",zorder=2)

    ax.set_xlim([0,1])
    ax.set_ylim([0,0.5])
    ax.set_yticks([0,.1,.2,.3,.4,.5])
    ax.set_aspect('equal')

    # Use LaTeX for text rendering
    plt.rc('text', usetex=True)
    plt.rc('font', family='serif')
    ax.set_xlabel("$P_1$")
    ax.set_ylabel("$P_2$")


    fig.tight_layout()
    plt.savefig("exhaustive.pdf",bbox_inches="tight")
    return

main()`,
    all_combination: `points = np.array(exp.all_combinations).T`,
  },
  sequence_explorer: {
    initialization_eg: `params_df = pd.read_csv("params.csv")

manager = sxp.ScenarioManager(params_df)
scenario = BlankScenario
tsc = lambda s: False

strategies = [
    sxp.SequenceExplorer.MONTE_CARLO,
    sxp.SequenceExplorer.HALTON,
    sxp.SequenceExplorer.SOBOL
]

explorers = {}
for strategy in strategies:
    exp = sxp.SequenceExplorer(
        strategy = strategy,
        seed = 4444,
        scenario_manager = manager,
        scenario = scenario,
        target_score_classifier = tsc,
        scramble = False
    )
    [exp.step() for i in range(1000)]
    explorers[strategy] = exp`,
    full_example: `import scenarioxp as sxp
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

class BlankScenario(sxp.Scenario):
    def __init__(self, params : pd.Series):
        super().__init__(params)
        self._score = pd.Series({"color" : 0})
        return
    
def plot_2d():
    params_df = pd.read_csv("params.csv")

    manager = sxp.ScenarioManager(params_df)
    scenario = BlankScenario
    tsc = lambda s: False

    strategies = [
        sxp.SequenceExplorer.MONTE_CARLO,
        sxp.SequenceExplorer.HALTON,
        sxp.SequenceExplorer.SOBOL
    ]

    explorers = {}
    for strategy in strategies:
        exp = sxp.SequenceExplorer(
            strategy = strategy,
            seed = 4444,
            scenario_manager = manager,
            scenario = scenario,
            target_score_classifier = tsc,
            scramble = False
        )
        [exp.step() for i in range(1000)]
        explorers[strategy] = exp
        
    # Create the figure and GridSpec object
    fig = plt.figure(figsize=(5, 2))
    gs = fig.add_gridspec(1, 3, wspace=0)  # 3 rows, 1 column, no horizontal space between

    # Create subplots
    ax1 = fig.add_subplot(gs[0, 0])
    ax2 = fig.add_subplot(gs[0, 1], sharey=ax1)
    ax3 = fig.add_subplot(gs[0, 2], sharey=ax1)

    for i, items in enumerate(explorers.items()):
        ax = [ax1, ax2, ax3][i]
        # marker = [".","+","*"][i]
        strategy, exp = items
        if strategy == "random":
            strategy = "monte-carlo"
        x = exp.params_history["x"]
        y = exp.params_history["y"]
        ax.scatter(x,y,color="black",marker=".",zorder=2, s=4)
        ax.set_xlim([0,1])
        ax.set_ylim([0,1])
        ax.set_xlabel(strategy)
        ax.xaxis.set_label_position("top")
        ax.set_aspect('equal')
        continue
    
    # Set the x labels to avoid overlap
    ax1.xaxis.set_major_locator(plt.MaxNLocator(nbins=5))
    ax2.xaxis.set_major_locator(plt.MaxNLocator(nbins=5))
    ax3.xaxis.set_major_locator(plt.MaxNLocator(nbins=5))

    # Set custom x-ticks to avoid overlap
    ax1.set_xticks(np.linspace(0, 1, 6))  # Remove the last x tick label
    ax2.set_xticks(np.linspace(0, 1, 6)[1:])  # Remove the last x tick label
    ax3.set_xticks(np.linspace(0, 1, 6)[1:])  # Remove the last x tick label
    
    # Optionally, remove y-axis ticks and labels
    # ax1.tick_params(axis='y', which='both', left=False, right=False, labelleft=False)
    ax2.tick_params(axis='y', which='both', left=False, right=False, labelleft=False)
    ax3.tick_params(axis='y', which='both', left=False, right=False, labelleft=False)

    # Use LaTeX for text rendering
    plt.rc('text', usetex=True)
    plt.rc('font', family='serif')
    # ax2.set_xlabel("$P_1$")
    ax1.set_ylabel("$P_2$")
    fig.suptitle("$P_1$",x=.56, y=0.00)

    fig.tight_layout()
    plt.savefig("sequential.pdf",bbox_inches="tight")
    return

def main():
    plot_2d()
    return

main()`,
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
    full_example: `import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import scenarioxp as sxp
import random

class HalfCircleScenario(sxp.Scenario):
    def __init__(self, params : pd.Series):
        super().__init__(params)

        self.center = np.array([0.25,0])
        self.radius = 0.75

        point = np.array([params["x"], params["y"]])

        dist2center = np.linalg.norm(point - self.center)
        
        inside = (point[0] <= self.center[0]) \\
            and (dist2center <= self.radius) \\
            and (np.abs(point[1]) <= 0.5)

        self._score = pd.Series({"inside" : int(inside)})
        return

def plot(history : list[sxp.FindSurfaceExplorer]):

    fig = plt.figure(figsize = (5,2))
    ax = fig.gca()

    # Plot the points
    for exp in history:
        x = exp.params_history["x"]
        y = exp.params_history["y"]
        colors = ["red","black"]
        color = [colors[i] for i in exp.score_history["inside"]]
        # print(color)
        ax.scatter(
            x,y, 
            color="black",
            marker = ".",
            # facecolors="none",
            alpha = 1,
            zorder = 2
        )
        # ax.plot(x,y, 
        #         color="black", 
        #         linewidth = 2.5,
        #         )
        continue
    
    """
    Plot the circle
    """

    # Define the angle range for half circle
    theta = np.linspace(0, np.pi, 100)

    # Define the x and y coordinates for the half circle
    radius = 0.75
    x = radius * -np.sin(theta) + 0.25
    y = radius * np.cos(theta)

    # Plot the half circle
    ax.plot(x, y, color='black', zorder = 2)

    # Add a line to close the shape
    ax.plot([x[-1], x[0]], [y[-1], y[0]], color='black', zorder=2)

    # Fill the area under the half circle with gray hatching
    ax.fill_between(
        x, y, 
        hatch='\\\\\\\\',
        edgecolor="gray", 
        facecolor="white",
        alpha = 0.4,
        zorder = 1
    )

    # Set aspect ratio to equal to get a perfect circle
    ax.set_aspect('equal', adjustable='box')

    # Set axis limits
    ax.set_xlim(-1, 1)
    ax.set_ylim(-0.5, 0.5)

    # Y ticks
    ax.set_yticks([-0.5,-0.25,0,.25,.5])

    # Equal Aspect
    ax.set_aspect('equal')

    # Use LaTeX for text rendering
    plt.rc('text', usetex=True)
    plt.rc('font', family='serif')
    ax.set_xlabel("$P_1$")
    ax.set_ylabel("$P_2$")

    plt.tight_layout()
    plt.savefig("find-surface.pdf",bbox_inches="tight")
    return

def generate_data() -> list[sxp.FindSurfaceExplorer]:
    params_df = pd.read_csv("params.csv")
    manager = sxp.ScenarioManager(params_df)
    tsc = lambda s: s["inside"] == 1
    scenario = HalfCircleScenario
    amt = 10
    
    history = []

    for i in range(amt):
        """
        Use a sequence explorer to get into the performance mode
        """
        seq_exp = sxp.SequenceExplorer(
            strategy = sxp.SequenceExplorer.MONTE_CARLO,
            seed = random.randint(0,9999),
            scenario_manager = manager,
            scenario = scenario,
            target_score_classifier = tsc
        )

        while not seq_exp.step():
            continue
        
        """
        Now find the surface
        """
        fs_exp = sxp.FindSurfaceExplorer(
            root = seq_exp.arr_history[-1],
            seed = random.randint(0,9999),
            scenario_manager = manager,
            scenario = scenario,
            target_score_classifier = tsc
        )

        while not fs_exp.step():
            continue

        history.append(fs_exp)
        
        continue
    
    return history

def main():
    history = generate_data()
    plot(history)
    return

main()`,
  },
  boundary_rrt_explorer: {
    full_eg: `import matplotlib.pyplot as plt
from matplotlib.patches import Patch
import numpy as np
import pandas as pd
import scenarioxp as sxp
import random

from shapely.geometry import Polygon, Point

class FollowLineScenario(sxp.Scenario):
    def __init__(self, params):
        super().__init__(params)
        self._polygon = create_shape()
        point = Point(params["x"], params["y"])

        inside = int(self.polygon.contains(point)) \
            and point.x >= 0 and point.x <= 1

        self._score = pd.Series({
            "inside" : int(self.polygon.contains(point))
        })
        return

    @property
    def polygon(self) -> Polygon:
        return self._polygon

def create_shape() -> Polygon:
        # Define the radius
    width = 0.25
    height = 0.25

    # Create an array of angles from 0 to pi (180 degrees) to draw the half circle
    angles = np.linspace(0, np.pi, 100)

    # Calculate x and y coordinates of the half circle
    x = list(width * np.cos(angles) + .5)
    y = list(height * np.sin(angles) + .1)


    # Add triangle to the front. 
    for xy in [
        [1.0,.1],
        # [1,0]
    ]:
        x.insert(0,xy[0])
        y.insert(0,xy[1])
        continue

    #  Add to the back
    for xy in [
        [0,.4],
        [0,0]
    ]:
        x.append(xy[0])
        y.append(xy[1])
        continue

    # Close itself
    x.append(x[0])
    y.append(y[1])
    
    verticies = [(x[i],y[i]) for i in range(len(x))]
    polygon = Polygon(verticies)
    return polygon

def main():

    """
    Setup Plots
    """
    fig = plt.figure(figsize=(5,2.3))
    ax = fig.gca()

    """
    Collect info
    """ 
    params_df = pd.read_csv("params.csv")
    manager = sxp.ScenarioManager(params_df)
    scenario = FollowLineScenario
    tsc = lambda s: s["inside"] == 1

    kwargs = {
        "scenario_manager" : manager,
        "scenario" : scenario,
        "target_score_classifier" : tsc
    }

    """
    Start right on the edge.
    """
    params = pd.Series({"x":0.01, "y" : .35})
    root = np.array([params["x"], params["y"]*2])
    root_scenario = scenario(params)

    """
    Plot the Performance Boundary
    """

    x,y = root_scenario.polygon.exterior.xy
    x = list(x)[:-2]
    y = list(y)[:-2]

    # Plot the half circle
    ax.plot(x, y, color="black")

    # Fill the area under the half circle with gray hatching
    ax.fill_between(
        x, y, 
        hatch='\\\\',
        edgecolor="gray", 
        facecolor="white",
        alpha = 0.4,
        zorder = 0
    )
    
    """
    Find the surface
    """
    fs_exp = sxp.FindSurfaceExplorer(
        root = root,
        seed = 4,
        **kwargs
    )

    while not fs_exp.step():
        pass

    """
    Plot 
    """

    """
    Follow the surface
    """
    root = fs_exp._arr_history[-1]
    brrt_exp = sxp.BoundaryRRTExplorer(
        root = root,
        root_n = sxp.orthonormalize(root, fs_exp.v)[0],
        delta_theta = 90 * np.pi / 180,
        scale = 2.,
        **kwargs
    )
    while True:
        brrt_exp.step()
        if len(brrt_exp._arr_history) >= 1000:
            break

    x = brrt_exp.params_history["x"]
    y = brrt_exp.params_history["y"]
    ax.scatter(
        x,y,
        color = "black",
        marker = ".",
        zorder = 1,
        alpha = 0.5
    )
    
    ax.grid(False)

    ax.set_xlim(0,1)
    ax.set_ylim(0,.5)

    # Use LaTeX for text rendering
    plt.rc('text', usetex=True)
    plt.rc('font', family='serif')
    ax.set_xlabel("$P_1$")
    ax.set_ylabel("$P_2$")

    # Custom legend elements
    custom_patches = [
        Patch(
            facecolor='white', 
            edgecolor='black', 
            label='Solid White'
        ),
        Patch(
            facecolor='white', 
            edgecolor='gray', 
            hatch='\\\\', 
            label='Gray Hash "\\" pattern'
        )
    ]

    plt.legend(
        custom_patches, 
        ['$A\'$', '$A$'], 
        loc='upper right'
    )

    # Set aspect ratio to equal to ensure the circle is not distorted
    # ax.axis('equal')
    plt.tight_layout()
    plt.savefig("boundary.pdf", bbox_inches = "tight")

    print("A : A'")
    inside = (brrt_exp.score_history["inside"] == 1).sum()
    print("%3d : %3d" % (inside, 1000-inside))

    return

main()`,
    initialization_eg: `"""
Follow the surface
"""
root = fs_exp._arr_history[-1]
brrt_exp = sxp.BoundaryRRTExplorer(
    root = root,
    root_n = sxp.orthonormalize(root, fs_exp.v)[0],
    delta_theta = 90 * np.pi / 180,
    scale = 2.,
    **kwargs
)`,
    step_eg: `while True:
brrt_exp.step()
if len(brrt_exp._arr_history) >= 1000:
break`,
  },
};

export default data;
