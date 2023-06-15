import PropTypes from "prop-types";

import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";

import Input from "./Input";
import rulesList from "../data/RulesK";
import shortcuts from "../data/Shortcuts";
import { check } from "../utils/Engine";
import pretty from "../utils/Pretty";
import Tree from "../utils/Tree";

Line.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  index: PropTypes.number.isRequired,
  setTree: PropTypes.func.isRequired,
};

function Line({ node, index, setTree }) {
  function handleSelect(target) {
    target.setCustomValidity("");

    // find the selected rule
    const base = target.value;
    const rule = rulesList.concat(shortcuts).find((rule) => rule.name === base);

    // update the tree
    if (rule) {
      const premises = check(node.value, rule, false);
      const children = premises.map((premise) => new Tree(premise));
      setTree((tree) =>
        tree.update(
          node,
          base,
          premises.length === 1,
          children,
          premises.length > 1
        )
      );
    } else {
      setTree((tree) => tree.update(node, base, true, [], false));
    }
  }

  return (
    <Collapse in={true} appear>
      <div>
        <Input {...{ node, setTree }} />
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
