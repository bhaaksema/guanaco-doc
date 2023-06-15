import { useState } from "react";

import Tree from "../utils/Tree";
import Line from "./Line";
import Goal from "./Goal";

function Proof() {
  const [tree, setTree] = useState(new Tree({ type: "hole" }));

  return (
    <>
      {tree &&
        tree
          .toArray()
          .map((node, index) => (
            <Line key={index} {...{ node, index, setTree }} />
          ))}
      <Goal {...{ setTree }} />
    </>
  );
}

export default Proof;
