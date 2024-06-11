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

const ExplorationCompleteExceptionMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Exploration Complete Exception" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>Exploration Complete Exception</code> is an exception class that is thrown when an explorer calls <code>step()</code> when exploration logic is complete.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>Exploration Complete Exception</code> initializes the class with a default message indicating that no further exploration logic exists.
          </p>
          <ul>
            <li>
              <strong>msg</strong> <em>(str)</em>: The default error message indicating no further exploration logic exists.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>msg</strong> <em>(str)</em>: The error message indicating no further exploration logic exists.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Methods</h2>
          <p>
            <strong>__str__() -&gt; str</strong>
          </p>
          <p>
            Returns a string representation of the <code>Exploration Complete Exception</code> instance.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={`class ExplorationCompleteException(Exception):
    "Thrown when an explorer calls step() when exploration logic is complete."

    def __init__(self):
        self.msg = "No further exploration logic exists."
        super().__init__(self.msg)
        return

    def __str__(self):
        return "<ExplorationCompleteException: %s>" % self.msg
`} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ExplorationCompleteExceptionMethod;
