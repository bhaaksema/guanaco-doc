import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import { parse } from './Parser'
import { checkRule, rulesList } from './Rules';

export default function Rows({ rows, rules }) {
  const [validated, setValidated] = useState(false);

  function ruleHandler(event, ast) {
    event.target.nextSibling.setCustomValidity("")

    if (!checkRule(ast, rulesList[0])) {
      event.target.nextSibling.setCustomValidity("invalid rule")
    }
  }

  function handler(event) {
    if (event.target.value === "") {
      setValidated(false)
      return
    }

    try {
      let ast = parse(event.target.value)
      ruleHandler(event, ast)
      event.target.setCustomValidity("")
    } catch (e) {
      event.target.setCustomValidity("invalid formula")
      event.target.nextSibling.setCustomValidity("invalid formula")
    }
    setValidated(true)
  }

  return (
    <ListGroup as="ol" >
      {rows.map((formula, index) => (
        <Form as="li" key={index} className="mb-1" validated={validated} >
          <InputGroup>
            <InputGroup.Text id="line-number">{index + 1}.</InputGroup.Text>
            <Form.Control id="formula" placeholder="enter formula" defaultValue={formula} onChange={handler} className="w-50" />
            <Form.Select className="w-10">
              <option>Rule</option>
              {rules.map((rule) => (<option key={rule}>{rule}</option>))}
            </Form.Select>
          </InputGroup>
        </Form>
      ))}
    </ListGroup>
  )
}
