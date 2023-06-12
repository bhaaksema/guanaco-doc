import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";

import { parse } from "../scripts/Parser";
import { checkRule, rulesList } from "../scripts/Rules";

ProofRow.propTypes = {
  row: PropTypes.shape({
    formula: PropTypes.string.isRequired,
    rule: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setValidated: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function ProofRow({ row, index, setValidated, setRows }) {
  function handleTyping(target) {
    setRows((rows) => {
      const newRows = [...rows];
      newRows[index].formula = target.value;
      return newRows;
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
    setRows((rows) => {
      const newRows = [...rows];
      newRows[index].rule = target.value;
      return newRows;
    });

    let rule = rulesList[target.selectedIndex];

    if (index !== 0) {
      // remove all previous rows
      setRows((rows) => rows.slice(index));
    }

    if (rule.name !== "A2") {
      // append new row
      setRows((rows) => [{ formula: "", rule: "A1" }, ...rows]);
    }

    try {
      const ast = parse(target.previousSibling.value);
      if (checkRule(ast, rule)) {
        target.setCustomValidity("");
      } else {
        target.setCustomValidity("invalid rule");
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
        value={row.formula}
        onChange={(e) => handleTyping(e.target)}
        className="w-50"
      />
      <Form.Select onChange={(e) => handleSelect(e.target)} value={row.rule}>
        {rulesList.map((rule) => (
          <option key={rule.name}>{rule.name}</option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}
