import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import { useRef } from "react";

import rulesList from "../data/Rules";
import parse from "../utils/Parser";
import { check, fill } from "../utils/Engine";
import pretty from "../utils/Pretty";
import Tree from "../utils/Tree";

Line.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  index: PropTypes.number.isRequired,
  setTree: PropTypes.func.isRequired,
};

function Line({ node, index, setTree }) {
  const input = useRef(null);

  function handleSelect(target) {
    target.setCustomValidity("");

    // find the selected rule
    const base = target.value;
    const rule = rulesList.find((rule) => rule.name === base);

    // update the tree
    if (rule) {
      const premises = check(node.value, rule, false);
      const children = premises.map((premise) => new Tree(premise));
      setTree((tree) =>
        tree.update(node, base, false, children, premises.length > 1)
      );
    } else {
      setTree((tree) => tree.update(node, base, true, [], false));
    }
  }

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
    const children = node.children.map(
      (child) => new Tree(fill(child.value, hole))
    );
    setTree((tree) => tree.update(node, node.base, true, children, false));
    event.preventDefault();
  }

  return (
    <Collapse in={true} appear>
      <div>
        <Collapse in={node.input}>
          <div>
            <Form validated={node.validated} onSubmit={handleSubmit}>
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
        <Navbar>
          <Container className="border-bottom rounded" fluid>
            <Navbar.Brand>
              {index + 1}&emsp;⊢&ensp;{pretty(node.value)}
            </Navbar.Brand>
          </Container>
          <Form validated={node.validated} className="d-flex w-25">
            <InputGroup hasValidation>
              <Form.Select
                onChange={(event) => handleSelect(event.target)}
                value={node.base}
                disabled={node.baseList.length === 0}
              >
                <option disabled value={0}>
                  Base
                </option>

                {/* Basis */}
                {node.baseList.map((base) => (
                  <option key={base.name}>{base.name}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form>
        </Navbar>
      </div>
    </Collapse>
  );
}

export default Line;
