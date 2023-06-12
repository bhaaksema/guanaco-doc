import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Proof from "./components/Proof";

export default function App() {
  const A2 = "(K{1} f1 & K{1} (f1 -> f2)) -> K{1} f2";

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5" style={{ width: "40rem" }}>
        <Card.Body>
          <Card.Title>Bottom-up Syntactic Proof Guide</Card.Title>
          <Card.Text>
            This tool helps people to determine which rules can be applied and
            to decide whether these rules have been applied correctly.
            <br /> <br />
            Example: <code>{A2}</code>
          </Card.Text>
          <Proof />
        </Card.Body>
      </Card>
    </Container>
  );
}
