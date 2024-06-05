import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

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

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Project" />

      {/* <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div> */}

      <div style={styles.container}>
        {/* <h1 style={styles.header}>
          Function: <code className="font-thin">project</code>
        </h1> */}

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
          <pre style={styles.codeBlock}>
            {`// Example 1: Without Discretization Increment
const result1 = project(10, 20, 0.5);
console.log(result1);  // Output: 15.0

// Example 2: With Discretization Increment
const result2 = project(10, 20, 0.33, 0.1);
console.log(result2);  // Output: 13.0`}
          </pre>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <pre style={styles.codeBlock}>
            {`def project(a: float, b: float, n: float, inc: float = None) -> float:
    """
    Project a normal val @n between @a and @b with a discretization 
    increment @inc.
    """
    assert n >= 0 and n <= 1
    assert b >= a

    # If no increment is provided, return the projection
    if inc is None:
        return n * (b - a) + a

    # Otherwise, round to the nearest increment
    n_inc = (b - a) / inc
    
    x = np.round(n_inc * n)
    return min(a + x * inc, b)`}
          </pre>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
