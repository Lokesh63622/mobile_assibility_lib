import { audioDescriptionOrAlternativeRule } from './Level_A/multinode/audioDescriptionOrAlternativeRule';
import { audioVideoAlternativeRule } from './Level_A/multinode/audioVideoAlternativeRule';
import { captionsPrerecordedRule } from './Level_A/multinode/captionsPrerecordedRule';
import { consistentHelpRule } from './Level_A/multinode/consistentHelpRule';
import { focusOrderRule } from './Level_A/multinode/focusOrderRule';
import { infoAndRelationshipsRule } from './Level_A/multinode/infoAndRelationshipsRule';
import { keyboardOperableMultiNodeRule } from './Level_A/multinode/keyboardOperableMultiNodeRule';
import { meaningfulSequenceRule } from './Level_A/multinode/meaningfulSequenceRule';
import { noKeyboardTrapRule } from './Level_A/multinode/noKeyboardTrapRule';
import { useOfColorRule } from './Level_A/multinode/useOfColorRule';
//level A node
import { audioControlRule } from './Level_A/node/audioControlRule';
import { bypassBlocksRule } from './Level_A/node/bypassBlocksRule';
import { characterKeyShortcutRule } from './Level_A/node/characterKeyShortcutRule';
import { errorIdentificationRule } from './Level_A/node/errorIdentificationRule';
import { labelsOrInstructionsRule } from './Level_A/node/labelsOrInstructionsRule';
import { languageOfPageRule } from './Level_A/node/languageOfPageRule';
import { linkPurposeRule } from './Level_A/node/linkPurposeRule';
import { missingLabelRule } from './Level_A/node/missingLabelRule';
import { nameRoleValueRule } from './Level_A/node/nameRoleValueRule';
import { nonTextContentRule } from './Level_A/node/nonTextContentRule';
import { onFocusRule } from './Level_A/node/onFocusRule';
import { onInputRule } from './Level_A/node/onInputRule';
import { pageTitledRule } from './Level_A/node/pageTitledRule';
import { pauseStopHideRule } from './Level_A/node/pauseStopHideRule';
import { redundantEntryRule } from './Level_A/node/redundantEntryRule';
import { sensoryCharacteristicsRule } from './Level_A/node/sensoryCharacteristicsRule';
import { threeFlashesRule } from './Level_A/node/threeFlashesRule';
import { timingAdjustableRule } from './Level_A/node/timingAdjustableRule';
//Level_AA multinodes
import { consistentIdentificationRule } from './Level_AA/mutinode/consistentIdentificationRule';
import { consistentNavigationRule } from './Level_AA/mutinode/consistentNavigationRule';
import { headingsAndLabelsRule } from './Level_AA/mutinode/headingsAndLabelsRule';
import { multipleWaysRule } from './Level_AA/mutinode/multipleWaysRule';
import { overlappingElementsRule } from './Level_AA/mutinode/overlappingElementsRule';
import { duplicateLabelRule } from './Level_AA/mutinode/duplicateLabelRule';
//Level_AA nodes
import { accessibleAuthenticationRule } from './Level_AA/node/accessibleAuthenticationRule';
import { audioDescriptionRule } from './Level_AA/node/audioDescriptionRule';
import { contentOnHoverFocusRule } from './Level_AA/node/contentOnHoverFocusRule';
import { contrastMinimumRule } from './Level_AA/node/contrastMinimumRule';
import { draggingMovementsRule } from './Level_AA/node/draggingMovementsRule';
import { errorPreventionRule } from './Level_AA/node/errorPreventionRule';
import { errorSuggestionRule } from './Level_AA/node/errorSuggestionRule';
import { focusableWithoutLabelRule } from './Level_AA/node/focusableWithoutLabelRule';
import { focusAppearanceRule } from './Level_AA/node/focusAppearanceRule';
import { focusNotObscuredRule } from './Level_AA/node/focusNotObscuredRule';
import { focusVisibleRule } from './Level_AA/node/focusVisibleRule';
import { identifyInputPurposeRule } from './Level_AA/node/identifyInputPurposeRule';
import { imagesOfTextRule } from './Level_AA/node/imagesOfTextRule';
import { languageOfPartsRule } from './Level_AA/node/languageOfPartsRule';
import { liveCaptionsRule } from './Level_AA/node/liveCaptionsRule';
import { nonTextContrastRule } from './Level_AA/node/nonTextContrastRule';
import { orientationRule } from './Level_AA/node/orientationRule';
import { reflowRule } from './Level_AA/node/reflowRule';
import { resizeTextRule } from './Level_AA/node/resizeTextRule';
import { statusMessagesRule } from './Level_AA/node/statusMessagesRule';
import { targetSizeRule } from './Level_AA/node/targetSizeRule';
import { textSpacingRule } from './Level_AA/node/textSpacingRule';

//level AAA multinodes
import { abbreviationsRule } from './Level_AAA/multinode/abbreviationsRule';
import { accessibleAuthenticationEnhancedRule } from './Level_AAA/multinode/accessibleAuthenticationEnhancedRule';
import { animationFromInteractionsRule } from './Level_AAA/multinode/animationFromInteractionsRule';
import { changeOnRequestRule } from './Level_AAA/multinode/changeOnRequestRule';
import { errorPreventionAllRule } from './Level_AAA/multinode/errorPreventionAllRule';
import { focusNotObscuredEnhancedRule } from './Level_AAA/multinode/focusNotObscuredEnhancedRule';
import { helpRule } from './Level_AAA/multinode/helpRule';
import { interruptionsRule } from './Level_AAA/multinode/interruptionsRule';
import { keyboardNoExceptionRule } from './Level_AAA/multinode/keyboardNoExceptionRule';
import { linkPurposeLinkOnlyRule } from './Level_AAA/multinode/linkPurposeLinkOnlyRule';
import { locationRule } from './Level_AAA/multinode/locationRule';
import { noTimingRule } from './Level_AAA/multinode/noTimingRule';
import { reauthenticatingRule } from './Level_AAA/multinode/reauthenticatingRule';
import { sectionHeadingsRule } from './Level_AAA/multinode/sectionHeadingsRule';
import { threeFlashesRules } from './Level_AAA/multinode/threeFlashesRules';
import { timeoutsRule } from './Level_AAA/multinode/timeoutsRule';
import { unusualWordsRule } from './Level_AAA/multinode/unusualWordsRule';


//level AAA nodes
import { audioOnlyLiveRule } from './Level_AAA/node/audioOnlyLiveRule';
import { concurrentInputMechanismsRule } from './Level_AAA/node/concurrentInputMechanismsRule';
import { contrastEnhancedRule } from './Level_AAA/node/contrastEnhancedRule';
import { extendedAudioDescriptionRule } from './Level_AAA/node/extendedAudioDescriptionRule';
import { identifyPurposeRule } from './Level_AAA/node/identifyPurposeRule';
import { imagesOfTextNoExceptionRule } from './Level_AAA/node/imagesOfTextNoExceptionRule';
import { lowBackgroundAudioRule } from './Level_AAA/node/lowBackgroundAudioRule';
import { mediaAlternativePrerecordedRule } from './Level_AAA/node/mediaAlternativePrerecordedRule';
import { pronunciationRule } from './Level_AAA/node/pronunciationRule';
import { readingLevelRule } from './Level_AAA/node/readingLevelRule';
import { signLanguageRule } from './Level_AAA/node/signLanguageRule';
import { smallTouchTargetRule } from './Level_AAA/node/smallTouchTargetRule';
import { targetSizeRules } from './Level_AAA/node/targetSizeRules';
import { visualPresentationRule } from './Level_AAA/node/visualPresentationRule';











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
