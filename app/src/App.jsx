import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import Rows from './Rows'

function App() {
  const rules = ["A1", "A2", "A3"]
  const [rows, setRows] = useState([])
  if (rows.length === 0) setRows([""])

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5" style={{ width: '30rem' }}>
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
