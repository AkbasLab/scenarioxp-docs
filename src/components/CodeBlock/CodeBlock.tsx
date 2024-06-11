import React, { useEffect, useState } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";
import "./CodeBlock.css";

const CodeBlock = ({ data }: { data: string }) => {
  return (
    <div className="demo">
      <CopyBlock
        language={"python"}
        text={data}
        showLineNumbers={true}
        theme={atomOneDark}
        // wrapLines={true}
        codeBlock
      />
    </div>
  );
};

export default CodeBlock;
