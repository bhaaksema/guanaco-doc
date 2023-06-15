import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Proof from "./components/Proof";

export default function App() {
  const A2 = "(K{a} f1 & K{a} (f1 -> f2)) -> K{a} f2";
  const A2p = "K{a} (f1 -> f2) -> (K{a} f1 -> K{a} f2)";

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5">
        <Card.Header>
          <Card.Title>
            Guanaco - Syntactic Proof Guide for Epistemic Logic
          </Card.Title>
          <Card.Text>
            This tool helps people to determine which rules can be applied and
            to decide whether these rules have been applied correctly.
            <br /> <br />
            Examples:
          </Card.Text>
          <ul>
            <li>
              <code>{A2}</code>
            </li>
            <li>
              <code>{A2p}</code>
            </li>
          </ul>
        </Card.Header>
        <Card.Body>
          <Proof />
        </Card.Body>
      </Card>
    </Container>
  );
}
