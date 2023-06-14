import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import ProofNode from "./Line";
import Goal from "./Goal";
import Tree from "../utils/Tree";

function Proof() {
  const [tree, setTree] = useState(new Tree({ type: "hole" }));

  return (
    <>
      {tree &&
        tree.toArray().map((node, index) => (
          <ListGroup.Item as="li" key={index} className="mb-1">
            <ProofNode {...{ node, index, setTree }} />
          </ListGroup.Item>
        ))}
      <Goal {...{ setTree }} />
    </>
  );
}

export default Proof;
