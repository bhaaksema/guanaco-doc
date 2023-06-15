import PropTypes from "prop-types";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import parse from "../utils/Parser";
import Tree from "../utils/Tree";

Goal.propTypes = {
  setTree: PropTypes.func.isRequired,
};

function Goal({ setTree }) {
  const [validated, setValidated] = useState(false);

  function handleTyping(target) {
    try {
      setTree(new Tree(parse(target.value)));
      target.setCustomValidity("");
    } catch (e) {
      console.error(e);
      setTree(new Tree({ type: "hole" }));
      target.setCustomValidity("invalid formula");
    }
    setValidated(target.value !== "");
  }

  return (
    <Form noValidate validated={validated} className="mt-3">
      <FloatingLabel label="Goal">
        <Form.Control
          placeholder="enter goal"
          onChange={(e) => handleTyping(e.target)}
          autoFocus
        />

        <Form.Control.Feedback type="invalid">
          This formula is not well-formed
        </Form.Control.Feedback>
      </FloatingLabel>
    </Form>
  );
}

export default Goal;
