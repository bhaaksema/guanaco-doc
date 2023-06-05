import Rows from './Rows'

import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function App() {
  const rules = ["A1", "A2", "A3"]
  const [rows, setRows] = useState(["hello", "world"])

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>Bottom-up Syntactic Proof Guide</Card.Title>
          <Card.Text>
            This tool helps people to determine which rules can be applied and to decide whether these rules have been applied correctly.
          </Card.Text>
          <Rows {...{ rows, rules }} />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App
