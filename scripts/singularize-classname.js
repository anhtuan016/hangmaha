const fs = require("fs").promises;
const path = require("path");
const pluralize = require("pluralize");

// Function to process a single file
async function processFile(filePath) {
  try {
    let content = await fs.readFile(filePath, "utf8");
    const originalContent = content;

    // Regular expression to match class declaration
    const classRegex = /@Entity\([^)]*\)\s*export\s+class\s+(\w+)/;
    const match = content.match(classRegex);

    if (match) {
      const [, className] = match;
      if (pluralize.isPlural(className)) {
        const singularClassName = pluralize.singular(className);

        // Replace the class declaration
        content = content.replace(classRegex, `@Entity() export class ${singularClassName}`);

        // Replace all occurrences of the class name in the file
        const classNameRegex = new RegExp(`\\b${className}\\b`, "g");
        content = content.replace(classNameRegex, singularClassName);

        if (content !== originalContent) {
          await fs.writeFile(filePath, content, "utf8");
          console.log(`Updated class name in ${filePath} from ${className} to ${singularClassName}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err}`);
  }
}

// Function to process all files in a directory
async function processDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await processDirectory(filePath); // Recursively process subdirectories
      } else if (path.extname(filePath) === ".ts") {
        // Process only TypeScript files
        await processFile(filePath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${directoryPath}: ${err}`);
  }
}

// Main function to run the script
async function main() {
  const entitiesDir = path.join(__dirname, "..", "src", "entities");
  await processDirectory(entitiesDir);
  console.log("Finished processing all files.");
}

// Run the main function
main().catch((err) => console.error("An error occurred:", err));

module.exports = { processDirectory, processFile };