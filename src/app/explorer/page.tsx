"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    lineHeight: 1.6,
  },
  header: {
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  section: {
    marginBottom: "20px",
  },
  codeBlock: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontFamily: "Courier New, Courier, monospace",
    overflowX: "auto" as "auto",
  },
  header2: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
  },
};

const ExplorerClassMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Explorer Class" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>Explorer</code> is an abstract class responsible for performing exploration steps.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>Explorer</code> initializes the class with a <code>ScenarioManager</code>, a scenario generator function, and a target score classifier.
          </p>
          <ul>
            <li>
              <strong>scenario_manager</strong> <em>(ScenarioManager)</em>: The manager responsible for handling scenarios.
            </li>
            <li>
              <strong>scenario</strong> <em>(Callable[[pd.Series], Scenario])</em>: A callable that generates a scenario from a pandas Series.
            </li>
            <li>
              <strong>target_score_classifier</strong> <em>(Callable[[pd.Series], bool])</em>: A callable that classifies the target score.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>_arr_history</strong> <em>(List[np.ndarray])</em>: History of arrays.
            </li>
            <li>
              <strong>_params_history</strong> <em>(List[pd.DataFrame])</em>: History of parameters.
            </li>
            <li>
              <strong>_score_history</strong> <em>(List[pd.DataFrame])</em>: History of scores.
            </li>
            <li>
              <strong>_tsc_history</strong> <em>(List[np.ndarray])</em>: History of target score classifications.
            </li>
            <li>
              <strong>_stage</strong> <em>(int)</em>: Current stage of exploration.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Properties</h2>
          <ul>
            <li>
              <strong>arr_history -&gt; np.ndarray</strong>: History of arrays.
            </li>
            <li>
              <strong>params_history -&gt; pd.DataFrame</strong>: History of parameters.
            </li>
            <li>
              <strong>score_history -&gt; pd.DataFrame</strong>: History of scores.
            </li>
            <li>
              <strong>tsc_history -&gt; np.ndarray</strong>: History of target score classifications.
            </li>
            <li>
              <strong>stage -&gt; int</strong>: Current stage of exploration.
            </li>
            <li>
              <strong>scenario_manager -&gt; ScenarioManager</strong>: The manager responsible for handling scenarios.
            </li>
            <li>
              <strong>scenario -&gt; Scenario</strong>: A callable that generates a scenario from a pandas Series.
            </li>
            <li>
              <strong>target_score_classifier -&gt; Callable[[pd.Series], bool]</strong>: A callable that classifies the target score.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Methods</h2>
          <p>
            <strong>next_arr() -&gt; np.ndarray</strong>
          </p>
          <p>
            This obtains the next array.
          </p>
          <p>
            <strong>step() -&gt; bool</strong>
          </p>
          <p>
            Perform one exploration step. Returns if the scenario test is in the target score set.
          </p>
          <p>
            <strong>concat_history(explorer: Explorer) -&gt; None</strong>
          </p>
          <p>
            Combines history of another explorer instance to self.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={`class Explorer(abc.ABC):
    def __init__(self, 
        scenario_manager : ScenarioManager,
        scenario : Callable[[pd.Series], Scenario],
        target_score_classifier : Callable[[pd.Series], bool]
    ):
        assert isinstance(scenario_manager, ScenarioManager)
        assert isinstance(scenario, Callable)
        assert isinstance(target_score_classifier, Callable)

        self._scenario_manager = scenario_manager
        self._scenario = scenario
        self._target_score_classifier = target_score_classifier

        self._arr_history = []
        self._params_history = []
        self._score_history = []
        self._tsc_history = []

        self._stage = 0
        self.STAGE_EXPLORATION_COMPLETE = 12345
        return
    
    @property
    def arr_history(self) -> np.ndarray:
        return np.array(self._arr_history)

    @property
    def params_history(self) -> pd.DataFrame:
        return pd.DataFrame(self._params_history)

    @property
    def score_history(self) -> pd.DataFrame:
        return pd.DataFrame(self._score_history)

    @property
    def tsc_history(self) -> np.ndarray:
        return np.array(self._tsc_history)

    @property
    def stage(self) -> int:
        return self._stage

    @property
    def scenario_manager(self) -> ScenarioManager:
        return self._scenario_manager

    @property
    def scenario(self) -> Scenario:
        return self._scenario

    @property
    def target_score_classifier(self) -> Callable[[pd.Series], bool]:
        return self._target_score_classifier

    @abc.abstractmethod
    def next_arr(self) -> np.ndarray:
        """
        This obtains the next arr.
        """
        raise NotImplementedError

  def step(self) -> bool:
        """
        Perform one exploration step.
        Returns if the scenario test is in the target score set.
        """
        if self.stage == self.STAGE_EXPLORATION_COMPLETE:
            raise ExplorationCompleteException

        arr = self.next_arr()                        # Long walk
        params = self._scenario_manager.project(arr) # Generate paramas
        test = self._scenario(params)                # Run scenario
        is_target_score = self._target_score_classifier(test.score)

        self._arr_history.append(arr)
        self._params_history.append(params)
        self._score_history.append(test.score)
        self._tsc_history.append(is_target_score)
        return is_target_score

    def concat_history(self, explorer):
        """
        Combines history of @explorer to self.
        """
        [self._arr_history.append(arr) for arr in explorer._arr_history]
        [self._params_history.append(params) \
            for params in explorer._params_history]
        [self._score_history.append(score) \
            for score in explorer._score_history]
        [self._tsc_history.append(tsc) for tsc in explorer._tsc_history]
        return
        `} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ExplorerClassMethod;




