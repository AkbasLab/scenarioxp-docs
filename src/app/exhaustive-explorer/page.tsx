"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CodeBlock from "@/components/CodeBlock/CodeBlock";

import data from "../../data/data.js";
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

const ExhaustiveExplorerMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ExhaustiveExplorer" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>ExhaustiveExplorer</code> is a subclass of{" "}
            <code>Explorer</code> designed for brute force exploration. It
            exhaustively tests all combinations of parameters specified in the{" "}
            <code>ScenarioManager</code>. This class is useful for scenarios
            where a comprehensive exploration of parameter space is required to
            achieve the target score.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>ExhaustiveExplorer</code> initializes the
            class with a <code>ScenarioManager</code>, a <code>Scenario</code>{" "}
            callable, and a <code>target_score_classifier</code> callable.
          </p>
          <ul>
            <li>
              <strong>scenario_manager</strong> <em>(ScenarioManager)</em>: The
              manager responsible for handling scenarios.
            </li>
            <li>
              <strong>scenario</strong>{" "}
              <em>(Callable[[pd.Series], Scenario])</em>: A callable that
              generates a scenario from a pandas Series.
            </li>
            <li>
              <strong>target_score_classifier</strong>{" "}
              <em>(Callable[[pd.Series], bool])</em>: A callable that classifies
              the target score.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>_all_combinations</strong> <em>(list[np.ndarray])</em>:
              List of all parameter combinations to be tested.
            </li>
            <li>
              <strong>_ptr</strong> <em>(int)</em>: Pointer to the current
              combination being tested.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Properties</h2>
          <ul>
            <li>
              <strong>all_combinations</strong> <em>(list[np.ndarray])</em>:
              Returns the list of all parameter combinations.
            </li>
            <li>
              <strong>ptr</strong> <em>(int)</em>: Returns the current pointer
              value.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Methods</h2>
          <p>
            <strong>next_arr() -&gt; np.ndarray</strong>
          </p>
          <p>Returns the current array of parameters to be tested.</p>
          <p>
            <strong>step() -&gt; bool</strong>
          </p>
          <p>
            Advances to the next combination of parameters. Returns{" "}
            <code>True</code> if the exploration is complete, otherwise{" "}
            <code>False</code>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={data.exhaustive_explorer.function_def} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ExhaustiveExplorerMethod;
