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

const ProjectMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Project" typeOfUtil="function" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Description</h2>
          <p>
            The <code>project</code> function projects a normalized value{" "}
            <code>n</code> (ranging from 0 to 1) to a corresponding value within
            a specified range <code>[a, b]</code>. Optionally, the projection
            can be discretized to the nearest specified increment{" "}
            <code>inc</code>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Parameters</h2>
          <ul>
            <li>
              <strong>a</strong> <em>(float)</em>: The lower bound of the
              projection range.
            </li>
            <li>
              <strong>b</strong> <em>(float)</em>: The upper bound of the
              projection range.
            </li>
            <li>
              <strong>n</strong> <em>(float)</em>: The normalized value to be
              projected, where <code>0 &lt;= n &lt;= 1</code>.
            </li>
            <li>
              <strong>inc</strong> <em>(float, optional)</em>: The
              discretization increment. If provided, the projected value will be
              rounded to the nearest multiple of this increment.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Returns</h2>
          <p>
            <strong>float</strong>: The projected value within the range{" "}
            <code>[a, b]</code>. If <code>inc</code> is provided, the value is
            discretized to the nearest increment.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Errors</h2>
          <p>
            <strong>AssertionError</strong>: If <code>n</code> is not in the
            range <code>[0, 1]</code> or if <code>b</code> is not greater than
            or equal to <code>a</code>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Examples</h2>
          <CodeBlock data={data.project.example_code} />
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={data.project.function_def} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default transition(ProjectMethod);
