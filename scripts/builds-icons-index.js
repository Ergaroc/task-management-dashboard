import fs from "fs";
import path from "path";

const componentsDir = path.resolve("src/icons/components");
const indexPath = path.join(componentsDir, "index.ts");

const files = fs
  .readdirSync(componentsDir)
  .filter((file) => file.endsWith(".tsx"));

const exports = files
  .map((file) => {
    const name = path.basename(file, ".tsx");
    return `export { default as ${name} } from "./${name}";`;
  })
  .join("\n");

fs.writeFileSync(indexPath, exports + "\n");
