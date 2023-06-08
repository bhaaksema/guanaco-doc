import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

import { parse } from './Parser'
import { checkRule, rulesList } from './Rules';

export default function Rows() {
  const [validated, setValidated] = useState(false)
  let rows = [""]

  function textHandler(event) {
    if (event.target.value === "") {
      setValidated(false); return
    }

    try {
      parse(event.target.value)
      event.target.setCustomValidity("")
    } catch (e) {
      event.target.setCustomValidity("invalid formula")
    }
    setValidated(true)
  }

  function ruleHandler(event) {
    try {
      const ast = parse(event.target.previousSibling.value)
      if (checkRule(ast, rulesList[0])) {
        event.target.setCustomValidity("")
      } else {
        event.target.setCustomValidity("invalid rule")
      }
    } catch (e) {
      event.target.setCustomValidity("invalid formula")
    }
  }

  return (
    <ListGroup as="ol" style={{ listStyleType: "none" }} >
      {rows.map((formula, index) => (
        <Form as="li" key={index} className="mb-1" validated={validated} >
          <InputGroup>
            <InputGroup.Text id="line-number">{index + 1}.</InputGroup.Text>
            <Form.Control id="formula" placeholder="enter formula"
              defaultValue={formula} onChange={textHandler} className="w-50" />
            <Form.Select onChange={ruleHandler} defaultValue={0}>
              <option disabled value={0}>Rule</option>
              {rulesList.map((rule, index) => (<option key={index}>{rule.name}</option>))}
            </Form.Select>
          </InputGroup>
        </Form>
      ))}
    </ListGroup>
  )
}
