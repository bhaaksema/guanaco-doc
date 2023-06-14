import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import PropTypes from "prop-types";
import { useState } from "react";

import parse from "../utils/Parser";
import Tree from "../utils/Tree";

Goal.propTypes = {
  setTree: PropTypes.func.isRequired,
};

function Goal({ setTree }) {
  const [validated, setValidated] = useState(false);

  function handleTyping(target) {
    if (target.value !== "") {
      try {
        setTree(new Tree(parse(target.value)));
        console.log(parse(target.value));
        target.setCustomValidity("");
      } catch (e) {
        setTree(null);
        target.setCustomValidity("invalid formula");
        console.log(e);
      }
    }
    setValidated(target.value !== "");
  }

  return (
    <Form noValidate validated={validated} className="mt-3">
      <FloatingLabel label="Goal">
        <Form.Control
          placeholder="enter goal"
          onChange={(e) => handleTyping(e.target)}
          size="lg"
        />
      </FloatingLabel>
    </Form>
  );
}

export default Goal;
