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
const OrthonormalizeMethod = () => {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Orthonormalize" />
  
        <div style={styles.container}>
          <section style={styles.section}>
            <h2 style={styles.header2}>Description</h2>
            <p>
              The <code>orthonormalize</code> function generates a pair of orthonormal vectors given two input vectors <code>u</code> and <code>v</code> that form a span. This function applies the Gram-Schmidt process to ensure the vectors are orthonormal.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Parameters</h2>
            <ul>
              <li>
                <strong>u</strong> <em>(np.ndarray)</em>: The first n-dimensional vector.
              </li>
              <li>
                <strong>v</strong> <em>(np.ndarray)</em>: The second n-dimensional vector, of the same length as <code>u</code>.
              </li>
            </ul>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Returns</h2>
            <p>
              <strong>tuple[np.ndarray, np.ndarray]</strong>: A tuple containing two orthonormal vectors <code>un</code> and <code>vn</code> derived from the input vectors <code>u</code> and <code>v</code>.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Errors</h2>
            <p>
              <strong>AssertionError</strong>: If the lengths of <code>u</code> and <code>v</code> are not equal.
            </p>
            <p>
              Returns original vectors <code>u</code> and <code>v</code> if they are already orthogonal.
            </p>
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Examples</h2>
            <CodeBlock data={`import numpy as np
  
  # Example 1: Basic Orthonormalization
  u = np.array([1, 0, 0])
  v = np.array([1, 1, 0])
  un, vn = orthonormalize(u, v)
  print(un)  # Output: array([1., 0., 0.])
  print(vn)  # Output: array([0., 1., 0.])
  
  # Example 2: Non-Orthogonal Vectors
  u = np.array([1, 2, 3])
  v = np.array([4, 5, 6])
  un, vn = orthonormalize(u, v)
  print(un)  # Output: normalized u vector
  print(vn)  # Output: orthogonal and normalized to un`} />
          </section>
  
          <section style={styles.section}>
            <h2 style={styles.header2}>Function Definition</h2>
            <CodeBlock data={`import numpy as np
  
  def normalize(x: np.ndarray) -> np.ndarray:
      return x / np.linalg.norm(x)
  
  def orthonormalize(u: np.ndarray, v: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
      """
      Generates orthonormal vectors given two vectors @u, @v which form a span.
  
      -- Parameters --
      u, v : np.ndarray
          Two n-d vectors of the same length
  
      -- Return --
      (un, vn)
          Orthonormal vectors for the span defined by @u, @v
      """
      assert len(u) == len(v), "Vectors u and v must be of the same length."
  
      un = normalize(u)
      vn = v - np.dot(un, v) * un
      vn = normalize(vn)
  
      if not (np.dot(un, vn) < 1e-4):
          return u, v
  
      return un, vn`} />
          </section>
        </div>
      </DefaultLayout>
    );
  };
  export default OrthonormalizeMethod;




