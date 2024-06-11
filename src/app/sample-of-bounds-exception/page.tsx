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

const SampleOutOfBoundsExceptionMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sample Out Of Bounds Exception" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>Sample Out Of Bounds Exception</code> is an exception class that is thrown when a boundary adherer samples out of bounds.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>Sample Out Of Bounds Exception</code> initializes the class with an optional message describing the error.
          </p>
          <ul>
            <li>
              <strong>msg</strong> <em>(str, default="Sample was out of bounds!")</em>: The error message describing the exception.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>msg</strong> <em>(str)</em>: The error message describing the exception.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Methods</h2>
          <p>
            <strong>__str__() -&gt; str</strong>
          </p>
          <p>
            Returns a string representation of the <code>Sample Out Of Bounds Exception</code> instance.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={`class SampleOutOfBoundsException(Exception):
    "When a boundary Adherer samples out of bounds, this exception may be thrown"

    def __init__(self, msg="Sample was out of bounds!"):
        self.msg = msg
        super().__init__(msg)

    def __str__(self):
        return f"<SampleOutOfBoundsException: {self.msg}>"
`} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default SampleOutOfBoundsExceptionMethod;
