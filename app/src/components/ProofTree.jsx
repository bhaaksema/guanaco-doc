import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import ProofNode from "./ProofNode";
import Goal from "./Goal";

function ProofTree() {
  const [tree, setTree] = useState(null);

  return (
    <>
      <ListGroup as="ol" style={{ listStyleType: "none" }}>
        {tree &&
          tree.toArray().map((node, index) => (
            <Form as="li" key={index} className="mb-1">
              <ProofNode {...{ node, index }} />
            </Form>
          ))}
      </ListGroup>
      <Goal {...{ setTree }} />
    </>
  );
}

export default ProofTree;
