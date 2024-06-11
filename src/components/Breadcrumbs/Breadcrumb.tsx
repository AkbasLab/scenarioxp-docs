import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
  typeOfUtil: string;
}

const styles = {
  header: {
    paddingBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

const Breadcrumb = ({ pageName, typeOfUtil }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2> */}

      <h1 style={styles.header}>
        {typeOfUtil === "function" ? "Function" : "Class"}:{" "}
        <code className="font-thin">{pageName}</code>
      </h1>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              ScenarioXP /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
