const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const generator = require("@babel/generator").default;

const moduleAnalyser = (filePath) => {
  const content = fs.readFileSync(filePath, "utf-8");
  // console.log(content);
  const ast = parser.parse(content, {
    sourceType: "module",
  }); // AST
  // console.log(ast.program.body);
  traverse(ast, {
    CallExpression(path) {
      if (
        path.node.callee.type === "MemberExpression" &&
        path.node.callee.object.name === "console" &&
        path.node.callee.property.name === "log"
      ) {
        // console.log("path", path.node.callee.property.name);
        path.remove();
      }
    },
  });

  let output = generator(ast, {});
  // console.log(output.code);

  const outputDir = path.join(__dirname, "dist");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(`${outputDir}/index.js`, output.code, "utf-8");
};

moduleAnalyser("./src/index.js");
