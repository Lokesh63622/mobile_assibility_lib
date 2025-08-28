import {missingLabelRule} from "./node/missingLabelRule.js";
import {smallTouchTargetRule} from "./node/smallTouchTargetRule.js";
import {duplicateLabelRule} from "./node/duplicateLabelRule.js";
import {focusableWithoutLabelRule} from "./node/focusableWithoutLabelRule.js";
import {overlappingElementsRule} from "./multinode/overlappingElementsRule.js";

export const nodeRules = [
  missingLabelRule,
  smallTouchTargetRule,
  focusableWithoutLabelRule,
];

export const multiNodeRules = [
  duplicateLabelRule,
  overlappingElementsRule
];
