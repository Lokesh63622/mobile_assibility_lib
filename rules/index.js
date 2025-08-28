import { audioDescriptionOrAlternativeRule } from './Level_A/multinode/audioDescriptionOrAlternativeRule.js';
import { audioVideoAlternativeRule } from './Level_A/multinode/audioVideoAlternativeRule.js';
import { captionsPrerecordedRule } from './Level_A/multinode/captionsPrerecordedRule.js';
import { consistentHelpRule } from './Level_A/multinode/consistentHelpRule.js';
import { focusOrderRule } from './Level_A/multinode/focusOrderRule.js';
import { infoAndRelationshipsRule } from './Level_A/multinode/infoAndRelationshipsRule.js';
import { keyboardOperableMultiNodeRule } from './Level_A/multinode/keyboardOperableMultiNodeRule.js';
import { meaningfulSequenceRule } from './Level_A/multinode/meaningfulSequenceRule.js';
import { noKeyboardTrapRule } from './Level_A/multinode/noKeyboardTrapRule.js';
import { useOfColorRule } from './Level_A/multinode/useOfColorRule.js';
//level A node
import { audioControlRule } from './Level_A/node/audioControlRule.js';
import { bypassBlocksRule } from './Level_A/node/bypassBlocksRule.js';
import { characterKeyShortcutRule } from './Level_A/node/characterKeyShortcutRule.js';
import { errorIdentificationRule } from './Level_A/node/errorIdentificationRule.js';
import { labelsOrInstructionsRule } from './Level_A/node/labelsOrInstructionsRule.js';
import { languageOfPageRule } from './Level_A/node/languageOfPageRule.js';
import { linkPurposeRule } from './Level_A/node/linkPurposeRule.js';
import { missingLabelRule } from './Level_A/node/missingLabelRule.js';
import { nameRoleValueRule } from './Level_A/node/nameRoleValueRule.js';
import { nonTextContentRule } from './Level_A/node/nonTextContentRule.js';
import { onFocusRule } from './Level_A/node/onFocusRule.js';
import { onInputRule } from './Level_A/node/onInputRule.js';
import { pageTitledRule } from './Level_A/node/pageTitledRule.js';
import { pauseStopHideRule } from './Level_A/node/pauseStopHideRule.js';
import { redundantEntryRule } from './Level_A/node/redundantEntryRule.js';
import { sensoryCharacteristicsRule } from './Level_A/node/sensoryCharacteristicsRule.js';
import { threeFlashesRule } from './Level_A/node/threeFlashesRule.js';
import { timingAdjustableRule } from './Level_A/node/timingAdjustableRule.js';
//Level_AA multinodes
import { consistentIdentificationRule } from './Level_AA/mutinode/consistentIdentificationRule.js';
import { consistentNavigationRule } from './Level_AA/mutinode/consistentNavigationRule.js';
import { headingsAndLabelsRule } from './Level_AA/mutinode/headingsAndLabelsRule.js';
import { multipleWaysRule } from './Level_AA/mutinode/multipleWaysRule.js';
import { overlappingElementsRule } from './Level_AA/mutinode/overlappingElementsRule.js';
import { duplicateLabelRule } from './Level_AA/mutinode/duplicateLabelRule.js';
//Level_AA nodes
import { accessibleAuthenticationRule } from './Level_AA/node/accessibleAuthenticationRule.js';
import { audioDescriptionRule } from './Level_AA/node/audioDescriptionRule.js';
import { contentOnHoverFocusRule } from './Level_AA/node/contentOnHoverFocusRule.js';
import { contrastMinimumRule } from './Level_AA/node/contrastMinimumRule.js';
import { draggingMovementsRule } from './Level_AA/node/draggingMovementsRule.js';
import { errorPreventionRule } from './Level_AA/node/errorPreventionRule.js';
import { errorSuggestionRule } from './Level_AA/node/errorSuggestionRule.js';
import { focusableWithoutLabelRule } from './Level_AA/node/focusableWithoutLabelRule.js';
import { focusAppearanceRule } from './Level_AA/node/focusAppearanceRule.js';
import { focusNotObscuredRule } from './Level_AA/node/focusNotObscuredRule.js';
import { focusVisibleRule } from './Level_AA/node/focusVisibleRule.js';
import { identifyInputPurposeRule } from './Level_AA/node/identifyInputPurposeRule.js';
import { imagesOfTextRule } from './Level_AA/node/imagesOfTextRule.js';
import { languageOfPartsRule } from './Level_AA/node/languageOfPartsRule.js';
import { liveCaptionsRule } from './Level_AA/node/liveCaptionsRule.js';
import { nonTextContrastRule } from './Level_AA/node/nonTextContrastRule.js';
import { orientationRule } from './Level_AA/node/orientationRule.js';
import { reflowRule } from './Level_AA/node/reflowRule.js';
import { resizeTextRule } from './Level_AA/node/resizeTextRule.js';
import { statusMessagesRule } from './Level_AA/node/statusMessagesRule.js';
import { targetSizeRule } from './Level_AA/node/targetSizeRule.js';
import { textSpacingRule } from './Level_AA/node/textSpacingRule.js';

//level AAA multinodes
import { abbreviationsRule } from './Level_AAA/multinode/abbreviationsRule.js';
import { accessibleAuthenticationEnhancedRule } from './Level_AAA/multinode/accessibleAuthenticationEnhancedRule.js';
import { animationFromInteractionsRule } from './Level_AAA/multinode/animationFromInteractionsRule.js';
import { changeOnRequestRule } from './Level_AAA/multinode/changeOnRequestRule.js';
import { errorPreventionAllRule } from './Level_AAA/multinode/errorPreventionAllRule.js';
import { focusNotObscuredEnhancedRule } from './Level_AAA/multinode/focusNotObscuredEnhancedRule.js';
import { helpRule } from './Level_AAA/multinode/helpRule.js';
import { interruptionsRule } from './Level_AAA/multinode/interruptionsRule.js';
import { keyboardNoExceptionRule } from './Level_AAA/multinode/keyboardNoExceptionRule.js';
import { linkPurposeLinkOnlyRule } from './Level_AAA/multinode/linkPurposeLinkOnlyRule.js';
import { locationRule } from './Level_AAA/multinode/locationRule.js';
import { noTimingRule } from './Level_AAA/multinode/noTimingRule.js';
import { reauthenticatingRule } from './Level_AAA/multinode/reauthenticatingRule.js';
import { sectionHeadingsRule } from './Level_AAA/multinode/sectionHeadingsRule.js';
import { threeFlashesRules } from './Level_AAA/multinode/threeFlashesRules.js';
import { timeoutsRule } from './Level_AAA/multinode/timeoutsRule.js';
import { unusualWordsRule } from './Level_AAA/multinode/unusualWordsRule.js';


//level AAA nodes
import { audioOnlyLiveRule } from './Level_AAA/node/audioOnlyLiveRule.js';
import { concurrentInputMechanismsRule } from './Level_AAA/node/concurrentInputMechanismsRule.js';
import { contrastEnhancedRule } from './Level_AAA/node/contrastEnhancedRule.js';
import { extendedAudioDescriptionRule } from './Level_AAA/node/extendedAudioDescriptionRule.js';
import { identifyPurposeRule } from './Level_AAA/node/identifyPurposeRule.js';
import { imagesOfTextNoExceptionRule } from './Level_AAA/node/imagesOfTextNoExceptionRule.js';
import { lowBackgroundAudioRule } from './Level_AAA/node/lowBackgroundAudioRule.js';
import { mediaAlternativePrerecordedRule } from './Level_AAA/node/mediaAlternativePrerecordedRule.js';
import { pronunciationRule } from './Level_AAA/node/pronunciationRule.js';
import { readingLevelRule } from './Level_AAA/node/readingLevelRule.js';
import { signLanguageRule } from './Level_AAA/node/signLanguageRule.js';
import { smallTouchTargetRule } from './Level_AAA/node/smallTouchTargetRule.js';
import { targetSizeRules } from './Level_AAA/node/targetSizeRules.js';
import { visualPresentationRule } from './Level_AAA/node/visualPresentationRule.js';











export const nodeRules = [
  //A node 
  audioControlRule,
  bypassBlocksRule,
  characterKeyShortcutRule,
  errorIdentificationRule,
  labelsOrInstructionsRule,
  languageOfPageRule,
  linkPurposeRule,
  missingLabelRule,
  nameRoleValueRule,
  nonTextContentRule,
  onFocusRule,
  onInputRule,
  pageTitledRule,
  pauseStopHideRule,
  redundantEntryRule,
  sensoryCharacteristicsRule,
  threeFlashesRule,
  timingAdjustableRule,
  //AA node
   accessibleAuthenticationRule,
  audioDescriptionRule,
  contentOnHoverFocusRule,
  contrastMinimumRule,
  draggingMovementsRule,
  errorPreventionRule,
  errorSuggestionRule,
  focusableWithoutLabelRule,
  focusAppearanceRule,
  focusNotObscuredRule,
  focusVisibleRule,
  identifyInputPurposeRule,
  imagesOfTextRule,
  languageOfPartsRule,
  liveCaptionsRule,
  nonTextContrastRule,
  orientationRule,
  reflowRule,
  resizeTextRule,
  statusMessagesRule,
  targetSizeRule,
  textSpacingRule,
  //AAA nodes
   audioOnlyLiveRule,
  concurrentInputMechanismsRule,
  contrastEnhancedRule,
  extendedAudioDescriptionRule,
  identifyPurposeRule,
  imagesOfTextNoExceptionRule,
  lowBackgroundAudioRule,
  mediaAlternativePrerecordedRule,
  pronunciationRule,
  readingLevelRule,
  signLanguageRule,
  smallTouchTargetRule,
  targetSizeRules,
  visualPresentationRule
 
];

export const multiNodeRules = [
  //A multinode
  audioDescriptionOrAlternativeRule,
  audioVideoAlternativeRule,
  captionsPrerecordedRule,
  consistentHelpRule,
  focusOrderRule,
  infoAndRelationshipsRule,
  keyboardOperableMultiNodeRule,
  meaningfulSequenceRule,
  noKeyboardTrapRule,
  useOfColorRule,
  //AA multinode
   consistentIdentificationRule,
  consistentNavigationRule,
  headingsAndLabelsRule,
  multipleWaysRule,
  overlappingElementsRule,
  duplicateLabelRule,
  //AAA multinode
  abbreviationsRule,
  accessibleAuthenticationEnhancedRule,
  animationFromInteractionsRule,
  changeOnRequestRule,
  errorPreventionAllRule,
  focusNotObscuredEnhancedRule,
  helpRule,
  interruptionsRule,
  keyboardNoExceptionRule,
  linkPurposeLinkOnlyRule,
  locationRule,
  noTimingRule,
  reauthenticatingRule,
  sectionHeadingsRule,
  threeFlashesRules,
  timeoutsRule,
  unusualWordsRule
];
