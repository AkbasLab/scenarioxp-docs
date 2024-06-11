"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import transition from "@/transition.js";

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

const BoundaryRRTExplorer = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="BoundaryRRTExplorer" typeOfUtil="class" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>BoundaryRRTExplorer</code> is a subclass of{" "}
            <code>Explorer</code> that navigates parameter space using a
            Rapidly-exploring Random Tree (RRT) approach. This class is
            particularly useful for finding boundaries in high-dimensional
            spaces using different adherence strategies.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>BoundaryRRTExplorer</code> initializes the
            class with root points, a scenario manager, and other parameters
            necessary for the RRT exploration.
          </p>
          <ul>
            <li>
              <strong>root</strong> <em>(np.ndarray)</em>: The starting point
              for the exploration.
            </li>
            <li>
              <strong>root_n</strong> <em>(np.ndarray)</em>: Normalized root
              point for the exploration.
            </li>
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
            <li>
              <strong>strategy</strong> <em>(str, default="e")</em>: The
              adherence strategy. Supported values are "constant",
              "exponential", "const", "exp", "c", "e".
            </li>
            <li>
              <strong>delta_theta</strong>{" "}
              <em>(float, default=15 * np.pi / 180)</em>: Angle for the
              adherence strategy.
            </li>
            <li>
              <strong>theta0</strong> <em>(float, default=90 * np.pi / 180)</em>
              : Initial angle for the adherence strategy.
            </li>
            <li>
              <strong>N</strong> <em>(int, default=4)</em>: Number of adherence
              steps.
            </li>
            <li>
              <strong>scale</strong> <em>(float, default=2)</em>: Scaling factor
              for the parameter increments.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>_brrt</strong> <em>(sbt.BoundaryRRT)</em>: The Boundary
              RRT object.
            </li>
            <li>
              <strong>_n_boundary_lost_exceptions</strong> <em>(int)</em>:
              Counter for boundary lost exceptions.
            </li>
            <li>
              <strong>_n_sample_out_of_bounds_exceptions</strong> <em>(int)</em>
              : Counter for sample out of bounds exceptions.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Properties</h2>
          <ul>
            <li>
              <strong>brrt</strong> <em>(sbt.BoundaryRRT)</em>: Returns the
              Boundary RRT object.
            </li>
            <li>
              <strong>n_boundary_lost_exceptions</strong> <em>(int)</em>:
              Returns the number of boundary lost exceptions.
            </li>
            <li>
              <strong>n_sample_out_of_bounds_exceptions</strong> <em>(int)</em>:
              Returns the number of sample out of bounds exceptions.
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
            Advances the Boundary RRT by one step. Catches and counts exceptions
            if the boundary is lost or the sample is out of bounds.
          </p>
          <p>
            <strong>_brrt_classifier(p: sbt.Point) -&gt; bool</strong>
          </p>
          <p>Classifies the given point using the boundary RRT classifier.</p>
          <p>
            <strong>
              _round_to_limits(arr: np.ndarray, min: np.ndarray, max:
              np.ndarray) -&gt; np.ndarray
            </strong>
          </p>
          <p>
            Rounds each dimension in <code>arr</code> to be within the specified{" "}
            <code>min</code> and <code>max</code> limits.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={data.boundary_rrt_explorer.function_def} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default transition(BoundaryRRTExplorer);
