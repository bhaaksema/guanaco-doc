import Rows from './Rows'

import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { parse } from './Parser'

function App() {
  const rules = ["A1", "A2", "A3"]
  const [rows, setRows] = useState([])
  if (rows.length === 0) setRows(["hello", "world"])

  // DEBUG
  try {
    parse("p & (K{1} q)")
    console.log("success")
  } catch (e) {
    console.log(e)
  }

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
