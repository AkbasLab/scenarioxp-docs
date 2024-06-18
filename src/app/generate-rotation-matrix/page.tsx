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

const GenerateRotationMatrixMethod = () => {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Generate Rotation Matrix" />
  
        <div style={styles.container}>
          <section style={styles.section}>
            <h2 style={styles.header2}>Description</h2>
            <p>
              The <code>Generate Rotation Matrix</code> function creates a function that can construct a matrix to rotate by a given angle using the span defined by two input vectors <code>u</code> and <code>v</code>.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Parameters</h2>
            <ul>
              <li>
                <strong>u</strong> <em>(np.ndarray)</em>: The first vector representing the span.
              </li>
              <li>
                <strong>v</strong> <em>(np.ndarray)</em>: The second vector representing the span, with the same dimensions as <code>u</code>.
              </li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Returns</h2>
            <p>
              <strong>Callable[[float], np.ndarray]</strong>: A function that returns a rotation matrix that rotates by a given angle <code>theta</code> using the provided span defined by <code>u</code> and <code>v</code>.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Errors</h2>
            <p>
              <strong>Exception</strong>: If <code>u</code> and <code>v</code> are not vectors or if they have differing dimensions.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Examples</h2>
            <CodeBlock data={`import numpy as np
  
  # Example: Creating and using the rotation matrix function
  u = np.array([1, 0])
  v = np.array([0, 1])
  rotation_fn = generateRotationMatrix(u, v)
  theta = np.pi / 4  # 45 degrees
  rotation_matrix = rotation_fn(theta)
  print(rotation_matrix)  # Output: the rotation matrix for 45 degrees`} />
          </section>
  
        </div>
      </DefaultLayout>
    );
  };
  

  export default GenerateRotationMatrixMethod;




