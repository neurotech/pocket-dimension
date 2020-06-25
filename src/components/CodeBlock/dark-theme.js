import themes from "../ui/themes";

export default {
  'code[class*="language-"]': {
    fontFamily:
      'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    background: themes.dark.commonPalette.charcoal,
    color: themes.dark.commonPalette.white,
  },
  'pre[class*="language-"]': {
    fontFamily:
      'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    background: themes.dark.code.background,
    color: themes.dark.code.foreground,
    padding: "1rem",
    margin: "0",
    overflow: "auto",
  },
  ':not(pre) > code[class*="language-"]': {
    padding: ".1em",
    borderRadius: ".3em",
  },
  comment: {
    color: themes.dark.code.comment,
  },
  prolog: {
    color: themes.dark.code.comment,
  },
  doctype: {
    color: themes.dark.code.comment,
  },
  cdata: {
    color: themes.dark.code.comment,
  },
  punctuation: {
    color: themes.dark.code.punctuation,
  },
  tag: {
    color: "magenta",
  },
  operator: {
    color: themes.dark.code.operator,
  },
  number: {
    color: themes.dark.code.number,
  },
  property: {
    color: "magenta",
  },
  function: {
    color: themes.dark.code.function,
    fontWeight: "bold",
  },
  "tag-id": {
    color: "magenta",
  },
  selector: {
    color: "magenta",
  },
  "atrule-id": {
    color: "magenta",
  },
  "attr-name": {
    color: "magenta",
  },
  boolean: {
    color: themes.dark.code.boolean,
  },
  string: {
    color: themes.dark.code.string,
  },
  entity: {
    color: "magenta",
    cursor: "help",
  },
  url: {
    color: themes.dark.code.url,
  },
  keyword: {
    color: themes.dark.code.keyword,
  },
  control: {
    color: "red",
  },
  directive: {
    color: "red",
  },
  unit: {
    color: "red",
  },
  statement: {
    color: "red",
  },
  regex: {
    color: themes.dark.code.regex,
  },
  atrule: {
    color: "#fcc440",
  },
  placeholder: {
    color: "#fcc440",
  },
  variable: {
    color: "green",
  },
  deleted: {
    textDecoration: "line-through",
  },
  inserted: {
    borderBottom: "1px dotted #fff3eb",
    textDecoration: "none",
  },
  italic: {
    fontStyle: "italic",
  },
  important: {
    fontWeight: "bold",
    color: "#a48774",
  },
  bold: {
    fontWeight: "bold",
  },
  "pre > code.highlight": {
    Outline: ".4em solid #816d5f",
    OutlineOffset: ".4em",
  },
  ".line-numbers .line-numbers-rows": {
    borderRightColor: "#35302b",
  },
  ".line-numbers-rows > span:before": {
    color: "#46403d",
  },
  ".line-highlight": {
    background:
      "linear-gradient(to right, rgba(191, 160, 90, 0.2) 70%, rgba(191, 160, 90, 0))",
  },
};
