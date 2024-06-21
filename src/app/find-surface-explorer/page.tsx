"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import transition from "@/transition.js";

import data from "../../data/data.js";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image.js";

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
  header3: {
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "7px",
  },
};

const FindSurfaceExplorer = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="FindSurfaceExplorer" typeOfUtil="class" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>FindSurfaceExplorer</code> is a subclass of{" "}
            <code>Explorer</code> that navigates from a specified root point
            within a target envelope to the surface. This class helps in finding
            the boundary or surface of the parameter space by adjusting the
            parameters iteratively.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>FindSurfaceExplorer</code> initializes the
            class with a root point, seed, and other parameters necessary for
            exploration.
          </p>
          <ul>
            <li>
              <strong>root</strong> <em>(np.ndarray)</em>: The starting point
              for the exploration.
            </li>
            <li>
              <strong>seed</strong> <em>(int)</em>: Seed for the random number
              generator.
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
          </ul>

          <h3 style={styles.header3}>Example</h3>
          <CodeBlock
            data={`import scenarioxp as sxp

fs_exp = sxp.FindSurfaceExplorer(
        root = seq_exp.arr_history[-1],
        seed = random.randint(0,9999),
        scenario_manager = manager,
        scenario = scenario,
        target_score_classifier = tsc
)`}
          />
          <p>
            In this example:
            <ul>
              <li>
                <code>root</code> is set to <code>[0.5, 0.5]</code>, the
                starting point for exploration.
              </li>
              <li>
                <code>seed</code> is set to <code>42</code> for reproducibility.
                This ensures that the random number generation is consistent
                across different runs.
              </li>
              <li>
                <code>scenarioManager</code> is an instance of{" "}
                <code>ScenarioManager</code> that manages the scenarios and
                their parameters.
              </li>
              <li>
                <code>scenario</code> is a function that generates a new{" "}
                <code>HalfCircleScenario</code> from the given parameters. It
                defines the specific conditions and computations for the
                scenario.
              </li>
              <li>
                <code>targetScoreClassifier</code> is a function that classifies
                whether a score indicates being inside the target area. It is
                used to evaluate if the current scenario meets the desired
                conditions.
              </li>
            </ul>
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>root</strong> <em>(np.ndarray)</em>: The initial root
              point for the exploration.
            </li>
            <li>
              <strong>_d</strong> <em>(np.ndarray)</em>: The jump distance for
              each parameter.
            </li>
            <li>
              <strong>_v</strong> <em>(np.ndarray)</em>: The vector for the
              direction of exploration.
            </li>
            <li>
              <strong>_s</strong> <em>(np.ndarray)</em>: The step size in the
              direction of <code>_v</code>.
            </li>
            <li>
              <strong>_interm</strong> <em>(list)</em>: A list of intermediate
              points during exploration.
            </li>
            <li>
              <strong>_prev</strong> <em>(np.ndarray)</em>: The previous point
              in the exploration.
            </li>
            <li>
              <strong>_cur</strong> <em>(np.ndarray)</em>: The current point in
              the exploration.
            </li>
            <li>
              <strong>_stage</strong> <em>(int)</em>: The current stage of the
              exploration process.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Properties</h2>
          <ul>
            <li>
              <strong>v</strong> <em>(np.ndarray)</em>: Returns the exploration
              vector.
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
            Advances to the next point in the exploration process. Returns{" "}
            <code>True</code> if the exploration is complete, otherwise{" "}
            <code>False</code>.
          </p>

          <p>
            <strong>Example</strong>
          </p>

          <CodeBlock
            data={`while not seq_exp.step():
      continue`}
          />
          <ul>
            <li>
              The <code>step</code> method is called in a loop until it returns{" "}
              <code>True</code>, indicating that the exploration is complete.
              The method performs one exploration step by generating the next
              set of parameters, testing the scenario, and checking if the
              target score is achieved.
            </li>
            <li>
              The current position is logged at each step using the{" "}
              <code>next_arr</code> method. This helps in tracking the
              exploration process and the parameters being tested at each stage.
            </li>
            <li>
              The <code>step</code> method handles the logic for moving towards
              the surface, transitioning to smaller step sizes, and getting
              closer to the target until the specified conditions are met.
            </li>
          </ul>

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
          <h2 style={styles.header2}>Full Example</h2>
          <CodeBlock data={data.find_surface_explorer.full_example} />

          <h3 style={styles.header3} className="mt-[20px]">
            Output
          </h3>
          <Image
            src="/images/example_outputs/find-surface.svg"
            alt="Find Surface Explorer Output"
            width={800}
            height={0}
            style={{ height: "auto" }}
          />
        </section>

        {/* <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={data.find_surface_explorer.function_def} />
        </section> */}
      </div>
    </DefaultLayout>
  );
};

export default transition(FindSurfaceExplorer);
