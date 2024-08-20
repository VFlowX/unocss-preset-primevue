import antfu from "@antfu/eslint-config"

export default antfu(
  {
    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: "double", // or 'double'
    },
    ignores: [
      // eslint ignore globs here
    ],
    rules: {
      "unused-imports/no-unused-imports": "off",
      "unused-imports/no-unused-vars": "off",
      "node/prefer-global/process": "off",
      "curly": "off",
    },
  },
)
