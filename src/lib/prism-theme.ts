import { PrismTheme } from "prism-react-renderer";

export const rosePineTheme: PrismTheme = {
  plain: {
    color: "#e0def4",
    backgroundColor: "#191724",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "#6e6a86",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        color: "#9ccfd8", // foam
      },
    },
    {
      types: ["property", "function"],
      style: {
        color: "#ebbcba", // rose
      },
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#eb6f92", // love
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#c4a7e7", // iris
      },
    },
    {
      types: [
        "boolean",
        "string",
        "entity",
        "url",
        "attr-value",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "at-rule",
        "placeholder",
        "variable",
      ],
      style: {
        color: "#f6c177", // gold
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#31748f", // pine
      },
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through",
      },
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["important"],
      style: {
        color: "#c4a7e7",
      },
    },
  ],
};
