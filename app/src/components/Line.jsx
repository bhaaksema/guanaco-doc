import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";

import axiomsList from "../data/Axioms";
import rulesList from "../data/Rules";
import Tree from "../utils/Tree";
import check from "../utils/Engine";
import pretty from "../utils/Pretty";

Line.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  index: PropTypes.number.isRequired,
  setTree: PropTypes.func.isRequired,
};

function Line({ node, index, setTree }) {
  function handleSelect(event) {
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
        <Container className="border-bottom rounded" fluid>
          <Navbar.Brand>
            {index + 1}&emsp;⊢&ensp;{pretty(node.value)}
          </Navbar.Brand>
        </Container>
        <Form className="d-flex w-50">
          <InputGroup>
            <Form.Select onChange={handleSelect} value={node.base}>
              <option disabled value={0}>
                Base
              </option>

              {/* Axioms */}
              {axiomsList
                .filter((axiom) => check(node.value, axiom, true))
                .map((axiom) => (
                  <option key={axiom.name}>{axiom.name}</option>
                ))}

              {/* Rules */}
              {rulesList
                .filter((rule) => check(node.value, rule, false).length !== 0)
                .map((rule) => (
                  <option key={rule.name}>{rule.name}</option>
                ))}
            </Form.Select>
            <InputGroup.Text>{node.validated ? "✅" : "🟧"}</InputGroup.Text>
          </InputGroup>
        </Form>
      </Navbar>
    </>
  );
}

export default Line;
