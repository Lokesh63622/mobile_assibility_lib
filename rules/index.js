import {missingLabelRule} from "./missingLabelRule.js";
import {smallTouchTargetRule} from "./smallTouchTargetRule.js";
import {duplicateLabelRule} from "./duplicateLabelRule.js";
import {focusableWithoutLabelRule} from "./focusableWithoutLabelRule.js";
import {overlappingElementsRule} from "./overlappingElementsRule.js";

export const nodeRules = [
  missingLabelRule,
  smallTouchTargetRule,
  focusableWithoutLabelRule,
];

export const multiNodeRules = [
  duplicateLabelRule,
  overlappingElementsRule
];
