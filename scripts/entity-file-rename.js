const fs = require("fs");
const path = require("path");

const entitiesDir = path.join(__dirname, "..", "src", "entities");

function toKebabCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
}

function updateImports(filePath, oldName, newName) {
  const content = fs.readFileSync(filePath, "utf8");
  const updatedContent = content.replace(
    new RegExp(`from ['"]\\.\\/${oldName}['"]`, "g"),
    `from './${newName}'`
  );
  fs.writeFileSync(filePath, updatedContent);
}

function renameEntities() {
  const files = fs.readdirSync(entitiesDir);
  const renamedFiles = new Map();

  // First pass: Rename files
  files.forEach((file) => {
    if (file.endsWith(".entity.ts")) {
      const oldName = path.basename(file, ".entity.ts");
      const newName = toKebabCase(oldName);
      const oldPath = path.join(entitiesDir, file);
      const newPath = path.join(entitiesDir, `${newName}.entity.ts`);

      if (oldName !== newName) {
        fs.renameSync(oldPath, newPath);
        renamedFiles.set(oldName, newName);
        console.log(`Renamed: ${oldName}.entity.ts -> ${newName}.entity.ts`);
      }
    }
  });

  // Second pass: Update imports in all files
  fs.readdirSync(entitiesDir).forEach((file) => {
    if (file.endsWith(".entity.ts")) {
      const filePath = path.join(entitiesDir, file);
      renamedFiles.forEach((newName, oldName) => {
        updateImports(filePath, `${oldName}.entity`, `${newName}.entity`);
      });
    }
  });

  console.log("Entity renaming and import updating completed.");
}

renameEntities();

module.exports = { renameEntities };