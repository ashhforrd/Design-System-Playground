import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import docgen from "react-docgen-typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const parser = docgen.withCustomConfig(path.join(projectRoot, "tsconfig.json"), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
});

const components = [
  { key: "button", file: "src/components/ui/button/button.tsx", name: "Button" },
  { key: "input", file: "src/components/ui/input/input.tsx", name: "Input" },
  { key: "badge", file: "src/components/ui/badge/badge.tsx", name: "Badge" },
  { key: "switch", file: "src/components/ui/switch/switch.tsx", name: "Switch" },
  { key: "checkbox", file: "src/components/ui/checkbox/checkbox.tsx", name: "Checkbox" },
  { key: "textarea", file: "src/components/ui/textarea/textarea.tsx", name: "Textarea" },
  { key: "label", file: "src/components/ui/label/label.tsx", name: "Label" },
  { key: "separator", file: "src/components/ui/separator/separator.tsx", name: "Separator" },
  { key: "link", file: "src/components/ui/link/link.tsx", name: "Link" },
  { key: "card", file: "src/components/ui/card/card.tsx", name: "Card" },
];

/** @type {Record<string, {componentName: string, props: Array<{name: string, required: boolean, type: string, defaultValue: string | null, description: string}>}>} */
const output = {};

for (const target of components) {
  const absolute = path.join(projectRoot, target.file);
  const docs = parser.parse(absolute);
  const componentDoc = docs.find((entry) => entry.displayName === target.name) ?? docs[0];

  if (!componentDoc) {
    output[target.key] = { componentName: target.name, props: [] };
    continue;
  }

  const props = Object.values(componentDoc.props ?? {})
    .filter((prop) => !prop.parent)
    .map((prop) => ({
      name: prop.name,
      required: Boolean(prop.required),
      type: prop.type?.name ?? "unknown",
      defaultValue: prop.defaultValue?.value ?? null,
      description: prop.description ?? "",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  output[target.key] = {
    componentName: componentDoc.displayName ?? target.name,
    props,
  };
}

const generatedPath = path.join(projectRoot, "src/generated/component-docs.ts");
const fileContent = `// AUTO-GENERATED FILE. DO NOT EDIT.
// Run: npm run docs:generate

export type ComponentPropDoc = {
  name: string;
  required: boolean;
  type: string;
  defaultValue: string | null;
  description: string;
};

export type ComponentDoc = {
  componentName: string;
  props: ComponentPropDoc[];
};

export const componentDocs: Record<string, ComponentDoc> = ${JSON.stringify(output, null, 2)} as const;
`;

fs.writeFileSync(generatedPath, fileContent, "utf8");
console.log(`Generated docs: ${path.relative(projectRoot, generatedPath)}`);
