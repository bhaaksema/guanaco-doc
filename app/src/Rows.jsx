import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import { parse } from './Parser'

export default function Rows({ rows, rules }) {
  function test(res) {
    // DEBUG
    console.log(res)
  }

  function handler(event) {
    try {
      test(parse(event.target.value))
      event.target.nextSibling.nextSibling.innerText = "✅"
    } catch (e) {
      event.target.nextSibling.nextSibling.innerText = "⛔"
    }
  }

  return (
    <ListGroup as="ol" >
      {rows.map((formula, index) => (
        <InputGroup as="li" key={index} className="mb-1">
          <InputGroup.Text id="line-number">{index + 1}.</InputGroup.Text>
          <Form.Control id="formula" placeholder="enter formula" defaultValue={formula} onChange={handler} className="w-50" />
          <Form.Select className="w-10">
            <option>Rule</option>
            {rules.map((rule) => (<option key={rule}>{rule}</option>))}
          </Form.Select>
          <InputGroup.Text id="parse-result">⚠️</InputGroup.Text>
        </InputGroup>
      ))}
    </ListGroup>
  )
}
