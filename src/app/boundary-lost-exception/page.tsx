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

const BoundaryLostExceptionMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Boundary Lost Exception" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>Boundary Lost Exception</code> is an exception class that is thrown when a boundary adherer fails to find the boundary.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>Boundary Lost Exception</code> initializes the class with an optional message describing the error.
          </p>
          <ul>
            <li>
              <strong>msg</strong> <em>(str, default="Failed to locate boundary!")</em>: The error message describing the exception.
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
            Returns a string representation of the <code>Boundary Lost Exception</code> instance, including additional details about the angle and jump distance.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={`class BoundaryLostException(Exception):
    "When a boundary Adherer fails to find the boundary, this exception is thrown"

    def __init__(self, msg="Failed to locate boundary!"):
        self.msg = msg
        super().__init__(msg)

    def __str__(self):
        return f"<BoundaryLostException: {self.msg}>"`} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default BoundaryLostExceptionMethod;
