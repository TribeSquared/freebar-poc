// Fails the build if any page was written to a broken address,
// e.g. a literal "{{ page.fileSlug }}" folder, or if an expected page is missing.
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const out = "_site";
const expected = ["index.html", "governance/index.html", "admin/index.html"];
const problems = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (/[{}%]/.test(entry.name)) problems.push(`Broken address: ${path}`);
    if (entry.isDirectory()) walk(path);
  }
}

walk(out);
for (const page of expected) {
  if (!existsSync(join(out, page))) problems.push(`Missing page: ${out}/${page}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`Output check passed (${expected.length} expected pages present).`);
