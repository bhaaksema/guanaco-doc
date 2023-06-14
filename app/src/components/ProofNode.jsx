import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";

import check from "../utils/Engine";
import pretty from "../utils/Pretty";
import axiomsList from "../data/Axioms";
import rulesList from "../data/Rules";
import Tree from "../utils/Tree";

ProofNode.propTypes = {
  node: PropTypes.instanceOf(Tree).isRequired,
  index: PropTypes.number.isRequired,
};

export default function ProofNode({ node, index }) {
  function handleSelect(event) {
    const baseTxt = event.target.value;

    // find the selected base
    let base = rulesList.find((rule) => rule.name === baseTxt);
    const isAxiom = !base;

    if (isAxiom) {
      base = axiomsList.find((axiom) => axiom.name === baseTxt);
    }

    console.log(check(node.value, base, isAxiom));
  }

  return (
    <InputGroup size="lg">
      <InputGroup.Text>{index + 1}.</InputGroup.Text>
      <InputGroup.Text className="w-60">{pretty(node.value)}</InputGroup.Text>
      <Form.Select onChange={handleSelect} defaultValue={0}>
        <option disabled value={0}>
          Base
        </option>

        {/* Axioms */}
        <option disabled>────────</option>
        {axiomsList.map((axiom) => (
          <option key={axiom.name} disabled={!check(node.value, axiom, true)}>
            {axiom.name}
          </option>
        ))}

        {/* Rules */}
        <option disabled>────────</option>
        {rulesList.map((rule) => (
          <option
            key={rule.name}
            disabled={check(node.value, rule, false).length == 0}
          >
            {rule.name}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}
