import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import ProofRow from "./ProofNode";

export default function ProofTree() {
  const [validated, setValidated] = useState(false);
  const [rows, setRows] = useState([{ formula: "", rule: "A1" }]);

  return (
    <ListGroup as="ol" style={{ listStyleType: "none" }}>
      {rows.map((row, index) => (
        <Form as="li" key={index} className="mb-1" validated={validated}>
          <ProofRow {...{ row, index, setValidated, setRows }} />
        </Form>
      ))}
    </ListGroup>
  );
}
