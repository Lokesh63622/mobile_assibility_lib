/* WCAG 2.2 Success Criteria (total: 86). Note: 4.1.1 Parsing was removed in WCAG 2.2. */
export const wcagRules = [
  {
    id: "1.1.1",
    name: "Non-text Content",
    level: "A",
    wcag_version: "2.0",
    description: "Provide text alternatives for all non-text content.",
  },
  {
    id: "1.2.1",
    name: "Audio-only and Video-only (Prerecorded)",
    level: "A",
    wcag_version: "2.0",
    description:
      "Provide alternatives for prerecorded audio-only and prerecorded video-only content.",
  },
  {
    id: "1.2.2",
    name: "Captions (Prerecorded)",
    level: "A",
    wcag_version: "2.0",
    description:
      "Provide captions for prerecorded audio content in synchronized media.",
  },
  {
    id: "1.2.3",
    name: "Audio Description or Media Alternative (Prerecorded)",
    level: "A",
    wcag_version: "2.0",
    description:
      "Provide audio description or a media alternative for prerecorded video content.",
  },
  {
    id: "1.2.4",
    name: "Captions (Live)",
    level: "AA",
    wcag_version: "2.0",
    description:
      "Provide captions for live audio content in synchronized media.",
  },
  {
    id: "1.2.5",
    name: "Audio Description (Prerecorded)",
    level: "AA",
    wcag_version: "2.0",
    description: "Provide audio description for prerecorded video content.",
  },
  {
    id: "1.2.6",
    name: "Sign Language (Prerecorded)",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Provide sign language interpretation for prerecorded audio content in synchronized media.",
  },
  {
    id: "1.2.7",
    name: "Extended Audio Description (Prerecorded)",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Provide extended audio description for prerecorded video content when pauses are insufficient.",
  },
  {
    id: "1.2.8",
    name: "Media Alternative (Prerecorded)",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Provide a full text alternative for prerecorded synchronized media.",
  },
  {
    id: "1.2.9",
    name: "Audio-only (Live)",
    level: "AAA",
    wcag_version: "2.0",
    description: "Provide an alternative for live audio-only content.",
  },
  {
    id: "1.3.1",
    name: "Info and Relationships",
    level: "A",
    wcag_version: "2.0",
    description:
      "Information, structure, and relationships can be programmatically determined or are available in text.",
  },
  {
    id: "1.3.2",
    name: "Meaningful Sequence",
    level: "A",
    wcag_version: "2.0",
    description:
      "When the sequence affects meaning, a correct reading sequence is programmatically determined.",
  },
  {
    id: "1.3.3",
    name: "Sensory Characteristics",
    level: "A",
    wcag_version: "2.0",
    description:
      "Instructions do not rely solely on sensory characteristics such as shape, size, visual location, orientation, or sound.",
  },
  {
    id: "1.3.4",
    name: "Orientation",
    level: "AA",
    wcag_version: "2.1",
    description:
      "Content does not restrict its view and operation to a single display orientation.",
  },
  {
    id: "1.3.5",
    name: "Identify Input Purpose",
    level: "AA",
    wcag_version: "2.1",
    description:
      "The purpose of input fields that collect user data can be programmatically determined.",
  },
  {
    id: "1.3.6",
    name: "Identify Purpose",
    level: "AAA",
    wcag_version: "2.1",
    description:
      "The purpose of user interface components, icons, and regions can be programmatically determined.",
  },
  {
    id: "1.4.1",
    name: "Use of Color",
    level: "A",
    wcag_version: "2.0",
    description:
      "Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.",
  },
  {
    id: "1.4.2",
    name: "Audio Control",
    level: "A",
    wcag_version: "2.0",
    description:
      "If audio plays automatically for more than 3 seconds, provide a mechanism to pause or stop the audio, or control volume independently.",
  },
  {
    id: "1.4.3",
    name: "Contrast (Minimum)",
    level: "AA",
    wcag_version: "2.0",
    description:
      "Text and images of text have a contrast ratio of at least 4.5:1, with exceptions.",
  },
  {
    id: "1.4.4",
    name: "Resize Text",
    level: "AA",
    wcag_version: "2.0",
    description:
      "Text can be resized up to 200% without loss of content or functionality.",
  },
  {
    id: "1.4.5",
    name: "Images of Text",
    level: "AA",
    wcag_version: "2.0",
    description:
      "If the same visual presentation can be achieved with text, do not use images of text except for essential purposes.",
  },
  {
    id: "1.4.6",
    name: "Contrast (Enhanced)",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Text and images of text have a contrast ratio of at least 7:1, with exceptions.",
  },
  {
    id: "1.4.7",
    name: "Low or No Background Audio",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "For prerecorded audio-only content, background sounds are low or can be turned off.",
  },
  {
    id: "1.4.8",
    name: "Visual Presentation",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Provide mechanisms to control foreground and background colors, line length, spacing, and text block width.",
  },
  {
    id: "1.4.9",
    name: "Images of Text (No Exception)",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Images of text are only used for pure decoration or where text can be customized by the user.",
  },
  {
    id: "1.4.10",
    name: "Reflow",
    level: "AA",
    wcag_version: "2.1",
    description:
      "Content reflows without loss of information or functionality, and without requiring scrolling in two dimensions for vertical scrolling content.",
  },
  {
    id: "1.4.11",
    name: "Non-text Contrast",
    level: "AA",
    wcag_version: "2.1",
    description:
      "User interface components and graphical objects have a contrast ratio of at least 3:1 against adjacent colors.",
  },
  {
    id: "1.4.12",
    name: "Text Spacing",
    level: "AA",
    wcag_version: "2.1",
    description:
      "No loss of content or functionality when users override text spacing properties.",
  },
  {
    id: "1.4.13",
    name: "Content on Hover or Focus",
    level: "AA",
    wcag_version: "2.1",
    description:
      "Additional content triggered by hover or focus can be dismissed, hovered, and persistent as needed.",
  },
  {
    id: "2.1.1",
    name: "Keyboard",
    level: "A",
    wcag_version: "2.0",
    description: "All functionality is operable through a keyboard interface.",
  },
  {
    id: "2.1.2",
    name: "No Keyboard Trap",
    level: "A",
    wcag_version: "2.0",
    description: "Keyboard focus is not trapped in any component.",
  },
  {
    id: "2.1.3",
    name: "Keyboard (No Exception)",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "All functionality is operable through a keyboard interface without requiring specific timings for individual keystrokes.",
  },
  {
    id: "2.1.4",
    name: "Character Key Shortcuts",
    level: "A",
    wcag_version: "2.1",
    description:
      "If a keyboard shortcut using only letter, punctuation, number, or symbol characters is implemented, provide a way to turn it off, remap it, or make it active only on focus.",
  },
  {
    id: "2.2.1",
    name: "Timing Adjustable",
    level: "A",
    wcag_version: "2.0",
    description:
      "Provide user controls to turn off, adjust, or extend time limits.",
  },
  {
    id: "2.2.2",
    name: "Pause, Stop, Hide",
    level: "A",
    wcag_version: "2.0",
    description:
      "For moving, blinking, scrolling, or auto-updating content, provide mechanisms to pause, stop, or hide.",
  },
  {
    id: "2.2.3",
    name: "No Timing",
    level: "AAA",
    wcag_version: "2.0",
    description: "Timing is not essential for any activity.",
  },
  {
    id: "2.2.4",
    name: "Interruptions",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Interruptions can be postponed or suppressed by the user, except for emergencies.",
  },
  {
    id: "2.2.5",
    name: "Re-authenticating",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Data is preserved when re-authenticating after a session expires.",
  },
  {
    id: "2.2.6",
    name: "Timeouts",
    level: "AAA",
    wcag_version: "2.1",
    description:
      "Users are warned of any inactivity timeout that could result in data loss, unless the timeout is 20 hours or more.",
  },
  {
    id: "2.3.1",
    name: "Three Flashes or Below Threshold",
    level: "A",
    wcag_version: "2.0",
    description:
      "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.",
  },
  {
    id: "2.3.2",
    name: "Three Flashes",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Web pages do not contain anything that flashes more than three times in any one second period.",
  },
  {
    id: "2.3.3",
    name: "Animation from Interactions",
    level: "AAA",
    wcag_version: "2.2",
    description:
      "A mechanism is available to disable animation triggered by interaction, unless the animation is essential.",
  },
  {
    id: "2.4.1",
    name: "Bypass Blocks",
    level: "A",
    wcag_version: "2.0",
    description:
      "Provide a mechanism to bypass blocks of content that are repeated on multiple Web pages.",
  },
  {
    id: "2.4.2",
    name: "Page Titled",
    level: "A",
    wcag_version: "2.0",
    description: "Web pages have titles that describe topic or purpose.",
  },
  {
    id: "2.4.3",
    name: "Focus Order",
    level: "A",
    wcag_version: "2.0",
    description: "Focus order preserves meaning and operability.",
  },
  {
    id: "2.4.4",
    name: "Link Purpose (In Context)",
    level: "A",
    wcag_version: "2.0",
    description:
      "The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined context.",
  },
  {
    id: "2.4.5",
    name: "Multiple Ways",
    level: "AA",
    wcag_version: "2.0",
    description:
      "More than one way is available to locate a Web page within a set of Web pages.",
  },
  {
    id: "2.4.6",
    name: "Headings and Labels",
    level: "AA",
    wcag_version: "2.0",
    description: "Headings and labels describe topic or purpose.",
  },
  {
    id: "2.4.7",
    name: "Focus Visible",
    level: "AA",
    wcag_version: "2.0",
    description:
      "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",
  },
  {
    id: "2.4.8",
    name: "Location",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Provide information about the user's location within a set of Web pages.",
  },
  {
    id: "2.4.9",
    name: "Link Purpose (Link Only)",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "A mechanism is available to identify the purpose of each link from link text alone.",
  },
  {
    id: "2.4.10",
    name: "Section Headings",
    level: "AAA",
    wcag_version: "2.0",
    description: "Section headings are used to organize the content.",
  },
  {
    id: "2.4.11",
    name: "Focus Not Obscured (Minimum)",
    level: "AA",
    wcag_version: "2.2",
    description:
      "When a user interface component receives keyboard focus, the component is not entirely hidden by author-created content.",
  },
  {
    id: "2.4.12",
    name: "Focus Not Obscured (Enhanced)",
    level: "AAA",
    wcag_version: "2.2",
    description:
      "When a user interface component receives keyboard focus, no part of the component is hidden by author-created content.",
  },
  {
    id: "2.4.13",
    name: "Focus Appearance (Minimum)",
    level: "AA",
    wcag_version: "2.2",
    description:
      "The visual focus indicator for keyboard focus meets minimum size and contrast requirements.",
  },
  {
    id: "2.5.1",
    name: "Pointer Gestures",
    level: "A",
    wcag_version: "2.1",
    description:
      "All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture.",
  },
  {
    id: "2.5.2",
    name: "Pointer Cancellation",
    level: "A",
    wcag_version: "2.1",
    description:
      "For functionality that can be operated using a single pointer, at least one of the following is true: no down-event activation, abort or undo, up reversal, or essential.",
  },
  {
    id: "2.5.3",
    name: "Label in Name",
    level: "A",
    wcag_version: "2.1",
    description:
      "For user interface components with labels that include text or images of text, the accessible name contains the text that is presented visually.",
  },
  {
    id: "2.5.4",
    name: "Motion Actuation",
    level: "A",
    wcag_version: "2.1",
    description:
      "Functionality that can be operated by device motion or user motion can also be operated by user interface components and motion activation can be disabled.",
  },
  {
    id: "2.5.5",
    name: "Target Size",
    level: "AAA",
    wcag_version: "2.1",
    description:
      "The size of the target for pointer inputs is at least 44 by 44 CSS pixels with exceptions.",
  },
  {
    id: "2.5.6",
    name: "Concurrent Input Mechanisms",
    level: "AAA",
    wcag_version: "2.1",
    description:
      "Web content does not restrict use of input modalities available on a platform.",
  },
  {
    id: "2.5.7",
    name: "Dragging Movements",
    level: "AA",
    wcag_version: "2.2",
    description:
      "All functionality that uses a dragging movement for operation can be achieved with a single pointer without dragging, unless essential.",
  },
  {
    id: "2.5.8",
    name: "Target Size (Minimum)",
    level: "AA",
    wcag_version: "2.2",
    description:
      "The size of the target for pointer inputs is at least 24 by 24 CSS pixels, except where exceptions apply.",
  },
  {
    id: "3.1.1",
    name: "Language of Page",
    level: "A",
    wcag_version: "2.0",
    description:
      "The default human language of each Web page can be programmatically determined.",
  },
  {
    id: "3.1.2",
    name: "Language of Parts",
    level: "AA",
    wcag_version: "2.0",
    description:
      "The human language of each passage or phrase in the content can be programmatically determined.",
  },
  {
    id: "3.1.3",
    name: "Unusual Words",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way.",
  },
  {
    id: "3.1.4",
    name: "Abbreviations",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "A mechanism for identifying the expanded form or meaning of abbreviations is available.",
  },
  {
    id: "3.1.5",
    name: "Reading Level",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "When text requires reading ability more advanced than lower secondary education level, provide supplemental content or an alternative version.",
  },
  {
    id: "3.1.6",
    name: "Pronunciation",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "A mechanism is available for identifying specific pronunciation of words where meaning is ambiguous without it.",
  },
  {
    id: "3.2.1",
    name: "On Focus",
    level: "A",
    wcag_version: "2.0",
    description:
      "When any component receives focus, it does not initiate a change of context.",
  },
  {
    id: "3.2.2",
    name: "On Input",
    level: "A",
    wcag_version: "2.0",
    description:
      "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior.",
  },
  {
    id: "3.2.3",
    name: "Consistent Navigation",
    level: "AA",
    wcag_version: "2.0",
    description:
      "Navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated.",
  },
  {
    id: "3.2.4",
    name: "Consistent Identification",
    level: "AA",
    wcag_version: "2.0",
    description:
      "Components that have the same functionality within a set of Web pages are identified consistently.",
  },
  {
    id: "3.2.5",
    name: "Change on Request",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "Changes of context are initiated only by user request or a mechanism is available to turn off such changes.",
  },
  {
    id: "3.2.6",
    name: "Consistent Help",
    level: "A",
    wcag_version: "2.2",
    description:
      "If a Web page includes help mechanisms, those mechanisms are presented in a consistent location or manner across sets of pages.",
  },
  {
    id: "3.3.1",
    name: "Error Identification",
    level: "A",
    wcag_version: "2.0",
    description:
      "If an input error is automatically detected, the item that is in error is identified and the error is described to the user.",
  },
  {
    id: "3.3.2",
    name: "Labels or Instructions",
    level: "A",
    wcag_version: "2.0",
    description:
      "Labels or instructions are provided when content requires user input.",
  },
  {
    id: "3.3.3",
    name: "Error Suggestion",
    level: "AA",
    wcag_version: "2.0",
    description:
      "If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user.",
  },
  {
    id: "3.3.4",
    name: "Error Prevention (Legal, Financial, Data)",
    level: "AA",
    wcag_version: "2.0",
    description:
      "For legal commitments, financial transactions, or submission of user data, provide mechanisms for reviewing, confirming, and correcting information.",
  },
  {
    id: "3.3.5",
    name: "Help",
    level: "AAA",
    wcag_version: "2.0",
    description: "Context-sensitive help is available.",
  },
  {
    id: "3.3.6",
    name: "Error Prevention (All)",
    level: "AAA",
    wcag_version: "2.0",
    description:
      "For all forms that require submission, provide mechanisms for reviewing, confirming, and correcting information.",
  },
  {
    id: "3.3.7",
    name: "Redundant Entry",
    level: "A",
    wcag_version: "2.2",
    description:
      "Information previously entered by or provided to the user that is required to be entered again is either auto-populated or available for the user to select.",
  },
  {
    id: "3.3.8",
    name: "Accessible Authentication (Minimum)",
    level: "AA",
    wcag_version: "2.2",
    description:
      "Authentication processes do not rely on cognitive function tests, unless alternatives are provided.",
  },
  {
    id: "3.3.9",
    name: "Accessible Authentication (Enhanced)",
    level: "AAA",
    wcag_version: "2.2",
    description:
      "Authentication processes do not rely on cognitive function tests; alternative mechanisms are provided without requiring memory, transcription, or math.",
  },
  {
    id: "4.1.2",
    name: "Name, Role, Value",
    level: "A",
    wcag_version: "2.0",
    description:
      "For all user interface components, the name and role can be programmatically determined; states, properties, and values can be set by user agents, including assistive technologies.",
  },
  {
    id: "4.1.3",
    name: "Status Messages",
    level: "AA",
    wcag_version: "2.1",
    description:
      "Status messages can be programmatically determined through role or properties so they can be presented to the user by assistive technologies without receiving focus.",
  },
];
