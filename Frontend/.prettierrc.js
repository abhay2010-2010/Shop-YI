// .prettierrc.js

/**
 * @type {import('prettier').Options}
 */
export default {
    // === Standard Prettier Options ===
    printWidth: 80, // Max line length
    tabWidth: 4, // Number of spaces per indentation level
    useTabs: false, // Use spaces instead of tabs
    semi: false, // Do not print semicolons at the ends of statements
    singleQuote: false, // Use double quotes instead of single quotes
    trailingComma: "none", // No trailing commas
    bracketSpacing: true, // Print spaces between brackets in object literals
    bracketSameLine: true, // Put > of JSX elements on the same line as the last attribute

    // === Plugin Configuration ===
    plugins: ["@ianvs/prettier-plugin-sort-imports"],

    // Custom Import Order Settings
    importOrder: [
        "<BUILTIN_MODULES>", // Node.js built-in modules
        "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
        "", // Empty line
        "^@plasmo/(.*)$", // Your specific grouping for plasmo packages
        "",
        "^@plasmohq/(.*)$", // Your specific grouping for plasmohq packages
        "",
        "^~(.*)$", // Your specific grouping for custom aliases starting with ~
        "",
        "^[./]" // Relative imports (./, ../)
    ]
}
