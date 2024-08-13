const pluralize = require("pluralize");
const fs = require("fs");
const path = require("path");

// Function to process a single file
function processFile(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const fullBaseName = path.basename(filePath, ext);
  
  // Check if the file is an entity file
  if (fullBaseName.endsWith('.entity')) {
    const baseName = fullBaseName.slice(0, -7); // Remove '.entity' from the base name
    
    // Check if the basename is plural
    if (pluralize.isPlural(baseName)) {
      const singularBaseName = pluralize.singular(baseName);
      const newPath = path.join(dir, `${singularBaseName}.entity${ext}`);
      
      fs.rename(filePath, newPath, (err) => {
        if (err) {
          console.error(`Error renaming ${filePath}: ${err}`);
        } else {
          console.log(`Renamed ${filePath} to ${newPath}`);
        }
      });
    }
  }
}

// Function to process all files in a directory
function processDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}: ${err}`);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting file stats for ${filePath}: ${err}`);
          return;
        }

        if (stats.isDirectory()) {
          processDirectory(filePath);  // Recursively process subdirectories
        } else {
          processFile(filePath);
        }
      });
    });
  });
}

const entitiesDir = path.join(__dirname, "..", "src", "entities");

// Process the entities directory
processDirectory(entitiesDir);

module.exports = { processFile, processDirectory };