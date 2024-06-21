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

const SequenceExplorerMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="SequenceExplorer" typeOfUtil="class" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>SequenceExplorer</code> is a subclass of <code>Explorer</code>{" "}
            that samples the next parameter for a test using a quasi-random
            sequence. This class supports various sampling strategies including
            Monte Carlo, Halton, and Sobol sequences.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>SequenceExplorer</code> initializes the
            class with a specified sampling strategy, seed, and other parameters
            necessary for sequence generation.
          </p>
          <ul>
            <li>
              <strong>strategy</strong> <em>(str)</em>: The sampling strategy.
              Supported values are "random", "halton", and "sobol".
            </li>
            <li>
              <strong>seed</strong> <em>(int)</em>: Seed for the random number
              generator, used if scrambling the sequence.
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
              <strong>scramble</strong> <em>(bool, default=False)</em>: Scramble
              the sequence.
            </li>
            <li>
              <strong>fast_forward</strong> <em>(int, default=0)</em>: Number of
              iterations to fast forward during initialization.
            </li>
          </ul>

          <section style={styles.section}>
            <h3 style={styles.header3}>Initialization Example</h3>
            <p>
              The following code initializes an instance of the{" "}
              <code>ExhaustiveExplorer</code> class with the necessary
              parameters.
            </p>
            <CodeBlock
              data={data.sequence_explorer.initialization_eg}
            ></CodeBlock>
            <p>
              Here, we initialize the <code>SequenceExplorer</code> for each of
              the specified strategies (Monte Carlo, Halton, Sobol) and execute
              1000 steps for each explorer.
            </p>
          </section>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>_d</strong> <em>(int)</em>: Dimensionality of the
              parameter space.
            </li>
            <li>
              <strong>_seq</strong> <em>(qmc.QMC)</em>: The quasi-random
              sequence generator.
            </li>
            <li>
              <strong>_strategy</strong> <em>(str)</em>: The sampling strategy
              used.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Properties</h2>
          <ul>
            <li>
              <strong>strategy</strong> <em>(str)</em>: Returns the sampling
              strategy used.
            </li>
            <li>
              <strong>seq</strong> <em>(qmc.QMC)</em>: Returns the quasi-random
              sequence generator.
            </li>
            <li>
              <strong>d</strong> <em>(int)</em>: Returns the dimensionality of
              the parameter space.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Methods</h2>
          <p>
            <strong>next_arr() -&gt; np.ndarray</strong>
          </p>
          <p>
            Returns the next array of parameters to be tested, based on the
            sampling strategy.
          </p>
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
          <h2 style={styles.header2}>Function Example</h2>
          <CodeBlock data={data.exhaustive_explorer.full_example} />
          <h3 style={styles.header3} className="mt-[20px]">
            Output
          </h3>
          <Image
            src="/images/example_outputs/sequential.svg"
            alt="Sequence Explorer Output"
            width={800}
            height={0}
            style={{ height: "auto" }}
          />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default transition(SequenceExplorerMethod);
