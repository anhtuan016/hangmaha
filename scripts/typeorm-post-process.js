const fs = require("fs");
const path = require("path");

const entitiesDir = path.join(__dirname, "..", "src", "entities");

/** Add Expose Decorator */
const addExposeDecorator = (filePath) => {
  let fileContent = fs.readFileSync(filePath, "utf-8");

  // Add import for Expose if it doesn't exist
  if (!fileContent.includes('import { Expose }')) {
    const importStatement = "import { Expose } from 'class-transformer';\n";
    const lastImportIndex = fileContent.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfImports = fileContent.indexOf('\n', lastImportIndex) + 1;
      fileContent = fileContent.slice(0, endOfImports) + importStatement + fileContent.slice(endOfImports);
    } else {
      fileContent = importStatement + fileContent;
    }
  }

  // Add @Expose() decorator to class properties
  const lines = fileContent.split('\n');
  const updatedLines = lines.map(line => {
    if (line.includes('@Column(') && !line.includes('@Expose()')) {
      return '  @Expose()\n' + line;
    }
    return line;
  });

  const updatedContent = updatedLines.join('\n');
  fs.writeFileSync(filePath, updatedContent, "utf-8");
};

// Process all entity files
fs.readdirSync(entitiesDir).forEach((file) => {
  const filePath = path.join(entitiesDir, file);
  if (path.extname(filePath) === '.ts') {
    try {
      addExposeDecorator(filePath);
      console.log(`Successfully processed: ${file}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
});

console.log("Post-processing typeorm-generator completed.");

module.exports = { addExposeDecorator };