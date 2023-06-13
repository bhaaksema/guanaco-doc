import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import ProofNode from "./ProofNode";

export default function ProofTree() {
  const [validated, setValidated] = useState(false);
  const [nodes, setNodes] = useState([{ formula: "", base: "A1" }]);

  return (
    <ListGroup as="ol" style={{ listStyleType: "none" }}>
      {nodes.map((node, index) => (
        <Form as="li" key={index} className="mb-1" validated={validated}>
          <ProofNode {...{ node, index, setValidated, setNodes }} />
        </Form>
      ))}
    </ListGroup>
  );
}
