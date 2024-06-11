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

const ScenarioClassMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Scenario Class" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>Scenario</code> is an abstract class for the scenario module. It takes parameters generated from a ScenarioManager.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>Scenario</code> initializes the class with parameters generated from a ScenarioManager.
          </p>
          <ul>
            <li>
              <strong>params</strong> <em>(pd.Series)</em>: Input configuration for this scenario.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>_params</strong> <em>(pd.Series)</em>: Input configuration for this scenario.
            </li>
            <li>
              <strong>_score</strong> <em>(pd.Series)</em>: Scenario score.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Properties</h2>
          <p>
            <strong>params -&gt; pd.Series</strong>
          </p>
          <p>
            Input configuration for this scenario.
          </p>
          <p>
            <strong>score -&gt; pd.Series</strong>
          </p>
          <p>
            Scenario score.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={`class Scenario(abc.ABC):
    def __init__(self, params : pd.Series):
        """
        The abstract class for the scenario module.
        The scenario takes @params which are generated from a ScenarioManager.
        """
        assert isinstance(params, pd.Series)
        self._params = params
        self._score = pd.Series({"default" : 0})
        return

    @property
    def params(self) -> pd.Series:
        """
        Input configuration for this scenario.
        """
        return self._params

    @property
    def score(self) -> pd.Series:
        """
        Scenario score.
        """
        return self._score
`} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ScenarioClassMethod;
