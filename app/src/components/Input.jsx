import PropTypes from "prop-types";
import { useRef } from "react";

import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Tree from "../utils/Tree";
import { fill } from "../utils/Engine";
import parse from "../utils/Parser";

Input.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  setTree: PropTypes.func.isRequired,
};

function Input({ node, setTree }) {
  const input = useRef(null);

  function handleTyping(target) {
    let result = null;

    try {
      result = parse(target.value);
      target.setCustomValidity("");
    } catch (e) {
      target.setCustomValidity("invalid formula");
    }
    setTree((tree) =>
      tree.update(
        node,
        node.base,
        target.value !== "",
        node.children,
        node.input
      )
    );

    return result;
  }

  function handleSubmit(event) {
    const hole = handleTyping(input.current);
    if (hole) {
      node.children = node.children.map(
        (child) => new Tree(fill(child.value, hole))
      );
    }
    setTree((tree) => tree.update(node, node.base, true, node.children, !hole));
    event.preventDefault();
  }

  return (
    <Collapse in={node.input} mountOnEnter unmountOnExit className="mb-3">
      <div>
        <Form noValidate validated={node.validated} onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text>?</InputGroup.Text>
            <Form.Control
              placeholder="enter ?"
              onChange={(e) => handleTyping(e.target)}
              ref={input}
            />
            <Button type="submit" variant="outline-secondary">
              Enter
            </Button>
          </InputGroup>
        </Form>
      </div>
    </Collapse>
  );
}

export default Input;
