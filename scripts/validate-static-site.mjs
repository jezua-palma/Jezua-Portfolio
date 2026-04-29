import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "css/style.css",
  "js/script.js",
  "assets/profile.png",
  "assets/cv.pdf",
  ".github/workflows/static.yml",
];

const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length) {
  throw new Error(`Missing required site files: ${missing.join(", ")}`);
}

const index = readFileSync("index.html", "utf8");
const script = readFileSync("js/script.js", "utf8");
const workflow = readFileSync(".github/workflows/static.yml", "utf8");

const checks = [
  {
    passes: !index.includes("{{") && !index.includes("}}"),
    message: "index.html still contains server template placeholders.",
  },
  {
    passes: index.includes("@emailjs/browser") || script.includes("typeof emailjs === 'undefined'"),
    message: "EmailJS is not loaded or guarded.",
  },
  {
    passes: !index.includes("github.com/Errzua") && !script.includes("users/Errzua"),
    message: "Old GitHub username Errzua is still referenced.",
  },
  {
    passes: workflow.includes("path: _site"),
    message: "Pages workflow should upload the prepared _site directory.",
  },
];

const failures = checks.filter((check) => !check.passes);

if (failures.length) {
  throw new Error(failures.map((failure) => failure.message).join("\n"));
}

console.log("Static site validation passed.");
