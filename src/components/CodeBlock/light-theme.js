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
    background: themes.light.commonPalette.snow,
    color: themes.light.commonPalette.charcoal,
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
    background: themes.light.commonPalette.snow,
    color: themes.light.commonPalette.charcoal,
    padding: "1rem",
    margin: "0",
    overflow: "auto",
  },
  ':not(pre) > code[class*="language-"]': {
    padding: ".1em",
    borderRadius: ".3em",
  },
  comment: {
    color: themes.light.code.comment,
  },
  prolog: {
    color: themes.light.code.comment,
  },
  doctype: {
    color: themes.light.code.comment,
  },
  cdata: {
    color: themes.light.code.comment,
  },
  punctuation: {
    color: themes.light.code.punctuation,
  },
  tag: {
    color: "magenta",
  },
  operator: {
    color: themes.light.code.operator,
  },
  number: {
    color: themes.light.code.number,
    fontWeight: "bold",
  },
  property: {
    color: "magenta",
  },
  function: {
    color: themes.light.code.function,
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
    color: themes.light.code.boolean,
  },
  string: {
    color: themes.light.code.string,
  },
  entity: {
    color: "magenta",
    cursor: "help",
  },
  url: {
    color: themes.light.code.url,
  },
  keyword: {
    color: themes.light.code.keyword,
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
    color: themes.light.code.regex,
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
