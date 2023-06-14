import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

import check from "../utils/Engine";
import pretty from "../utils/Pretty";
import axiomsList from "../data/Axioms";
import rulesList from "../data/Rules";
import Tree from "../utils/Tree";

Line.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  index: PropTypes.number.isRequired,
  setTree: PropTypes.func.isRequired,
};

function Line({ node, index, setTree }) {
  function handleSelect(event) {
    // set validation
    event.target.setCustomValidity("");

    // find the selected rule
    const rule = rulesList.find((rule) => rule.name === event.target.value);
    const base = event.target.value;

    // update the tree
    if (rule) {
      const premises = check(node.value, rule, false);
      const children = premises.map((premise) => new Tree(premise));
      setTree((tree) => tree.update(node, base, true, children));
    } else {
      setTree((tree) => tree.update(node, base, true, node.children));
    }
  }

  return (
    <>
      <Navbar>
        <Container className="border-bottom" fluid>
          <Navbar.Brand>
            {index + 1}&emsp;⊢&ensp;{pretty(node.value)}
          </Navbar.Brand>
        </Container>
        <Form noValidate validated={node.validated} className="d-flex">
          <Form.Select onChange={handleSelect} value={node.base}>
            <option disabled value={0}>
              Base
            </option>

            {/* Axioms */}
            <option disabled>──────</option>
            {axiomsList.map((axiom) => (
              <option
                key={axiom.name}
                disabled={!check(node.value, axiom, true)}
              >
                {axiom.name}
              </option>
            ))}

            {/* Rules */}
            <option disabled>──────</option>
            {rulesList.map((rule) => (
              <option
                key={rule.name}
                disabled={check(node.value, rule, false).length == 0}
              >
                {rule.name}
              </option>
            ))}
          </Form.Select>
        </Form>
      </Navbar>
    </>
  );
}

export default Line;
