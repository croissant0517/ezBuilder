const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const generator = require("@babel/generator").default;

const moduleAnalyser = (path) => {
  const content = fs.readFileSync(path, "utf-8");
  // console.log(content);
  const ast = parser.parse(content, {
    sourceType: "module",
  }); // AST
  // console.log(ast);
  // console.log(ast.program.body);
  traverse(ast, {
    CallExpression(path) {
      console.log("path", path);

      if (
        path.node.callee.type === "MemberExpression" &&
        path.node.callee.object.name === "console"
      ) {
        path.remove();
      }
    },
  });
  let output = generator(ast, {});
  // console.log(output.code);
};

const moduleInfo = moduleAnalyser("./src/index.js");
