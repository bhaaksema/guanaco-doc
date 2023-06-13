import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";

import { parse } from "../scripts/Parser";
import { check } from "../scripts/Engine";
import { axiomsList } from "../objects/Axioms";
import { rulesList } from "../objects/Rules";

ProofNode.propTypes = {
  node: PropTypes.shape({
    formula: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setValidated: PropTypes.func.isRequired,
  setNodes: PropTypes.func.isRequired,
};

export default function ProofNode({ node, index, setValidated, setNodes }) {
  function handleTyping(target) {
    setNodes((nodes) => {
      const newNodes = [...nodes];
      newNodes[index].formula = target.value;
      return newNodes;
    });

    if (target.value === "") {
      setValidated(false);
      return;
    }

    handleSelect(target.nextSibling);

    try {
      parse(target.value);
      target.setCustomValidity("");
    } catch (e) {
      target.setCustomValidity("invalid formula");
    }
    setValidated(true);
  }

  function handleSelect(target) {
    setNodes((nodes) => {
      const newNodes = [...nodes];
      newNodes[index].base = target.value;
      return newNodes;
    });

    try {
      const ast = parse(target.previousSibling.value);
      // find base in axioms
      let base = axiomsList.find((axiom) => axiom.name === target.value);
      const isAxiom = base !== undefined;

      if (!isAxiom) {
        // find base in rules
        base = rulesList.find((rule) => rule.name === target.value);
      }

      if (check(ast, base, isAxiom)) {
        target.setCustomValidity("");
      } else {
        target.setCustomValidity("invalid " + (isAxiom ? "axiom" : "rule"));
      }
    } catch (e) {
      target.setCustomValidity("invalid formula");
    }
  }

  return (
    <InputGroup>
      <InputGroup.Text id="line-number">{index + 1}.</InputGroup.Text>
      <Form.Control
        id="formula"
        placeholder="enter formula"
        value={node.formula}
        onChange={(e) => handleTyping(e.target)}
        className="w-50"
      />
      <Form.Select onChange={(e) => handleSelect(e.target)} value={node.base}>
        {axiomsList.map((axiom) => (
          <option key={axiom.name}>{axiom.name}</option>
        ))}
        <option disabled>──────────</option>
        {rulesList.map((rule) => (
          <option key={rule.name}>{rule.name}</option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}
