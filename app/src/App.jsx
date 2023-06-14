import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Proof from "./components/Proof";

export default function App() {
  const A2 = "(K{1} f1 & K{1} (f1 -> f2)) -> K{1} f2";

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5">
        <Card.Header>
          <Card.Title>Syntactic Proof Guide for Epistemic Logic</Card.Title>
          <Card.Text>
            This tool helps people to determine which rules can be applied and
            to decide whether these rules have been applied correctly.
            <br /> <br />
            Example: <code>{A2}</code>
          </Card.Text>
        </Card.Header>
        <Card.Body>
          <Proof />
        </Card.Body>
      </Card>
    </Container>
  );
}
