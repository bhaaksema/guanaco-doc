import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import Rows from './Rows'

function App() {
  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5" style={{ width: '40rem' }}>
        <Card.Body>
          <Card.Title>Bottom-up Syntactic Proof Guide</Card.Title>
          <Card.Text>
            This tool helps people to determine which rules can be applied and to decide whether these rules have been applied correctly.
          </Card.Text>
          <Rows />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App
