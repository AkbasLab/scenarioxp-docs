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

const ScenarioManagerMethod = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Scenario Manager" />

      <div style={styles.container}>
        <section style={styles.section}>
          <h2 style={styles.header2}>Class Overview</h2>
          <p>
            <code>Scenario Manager</code> is a class responsible for managing scenarios, including projecting a normalized array to selected concrete values from parameter ranges.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Initialization</h2>
          <p>
            The constructor for <code>Scenario Manager</code> initializes the class with a pandas DataFrame containing parameters for scenarios.
          </p>
          <ul>
            <li>
              <strong>params</strong> <em>(pd.DataFrame)</em>: DataFrame containing parameters for scenarios, with columns "feat", "min", "max", and "inc".
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Attributes</h2>
          <ul>
            <li>
              <strong>_params</strong> <em>(pd.DataFrame)</em>: DataFrame containing parameters for scenarios.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Methods</h2>
          <p>
            <strong>project(arr: np.ndarray) -&gt; pd.Series</strong>
          </p>
          <p>
            Projects a normalized array <code>arr</code> to selected concrete values from parameter ranges.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.header2}>Function Definition</h2>
          <CodeBlock data={`class ScenarioManager():
    def __init__(self, params : pd.DataFrame):
        """
        """
        req_indices = ["feat", "min", "max", "inc"]
        assert all([feat in req_indices for feat in params.columns])

        self._params = params

        # Determine the adjusted increment for each feature if min and max
        # were 0 and 1 respectively.
        b = params["max"]
        a = params["min"]
        i = params["inc"]
        params["inc_norm"] = i/(b-a)
        del b, a, i
        return

    @property
    def params(self) -> pd.DataFrame:
        return self._params

    def project(self, arr : np.ndarray) -> pd.Series:
        """
        Projects a normalized array @arr to selected concrete values from
        parameter ranges
        """
        # all values in arr must be in [0,1]
        if not (all(arr >= 0) and all(arr <= 1)):
            raise SampleOutOfBoundsException()

        df = self.params.copy() \
            .assign(n = arr)
        
        projected = df.apply(
            # lambda s: project(s["min"], s["max"], s["n"]),#, s["inc"]), 
            lambda s: project(s["min"], s["max"], s["n"], s["inc"]), 
            axis=1
        )

        projected.index = self.params["feat"]
        return projected
`} />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ScenarioManagerMethod;
