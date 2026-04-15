// AUTO-GENERATED FILE. DO NOT EDIT.
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

export const componentDocs: Record<string, ComponentDoc> = {
  "button": {
    "componentName": "Button",
    "props": [
      {
        "name": "size",
        "required": false,
        "type": "enum",
        "defaultValue": "md",
        "description": ""
      },
      {
        "name": "variant",
        "required": false,
        "type": "enum",
        "defaultValue": "primary",
        "description": ""
      }
    ]
  },
  "input": {
    "componentName": "Input",
    "props": []
  },
  "badge": {
    "componentName": "Badge",
    "props": [
      {
        "name": "size",
        "required": false,
        "type": "enum",
        "defaultValue": "md",
        "description": ""
      },
      {
        "name": "variant",
        "required": false,
        "type": "enum",
        "defaultValue": "solid",
        "description": ""
      }
    ]
  },
  "switch": {
    "componentName": "Switch",
    "props": [
      {
        "name": "checked",
        "required": false,
        "type": "boolean",
        "defaultValue": null,
        "description": ""
      },
      {
        "name": "label",
        "required": false,
        "type": "ReactNode",
        "defaultValue": null,
        "description": ""
      },
      {
        "name": "onCheckedChange",
        "required": false,
        "type": "((checked: boolean) => void)",
        "defaultValue": null,
        "description": ""
      }
    ]
  },
  "checkbox": {
    "componentName": "Checkbox",
    "props": [
      {
        "name": "label",
        "required": false,
        "type": "ReactNode",
        "defaultValue": null,
        "description": ""
      }
    ]
  },
  "textarea": {
    "componentName": "Textarea",
    "props": []
  },
  "label": {
    "componentName": "Label",
    "props": [
      {
        "name": "optional",
        "required": false,
        "type": "ReactNode",
        "defaultValue": null,
        "description": ""
      }
    ]
  },
  "separator": {
    "componentName": "Separator",
    "props": [
      {
        "name": "orientation",
        "required": false,
        "type": "enum",
        "defaultValue": "horizontal",
        "description": ""
      }
    ]
  },
  "link": {
    "componentName": "Link",
    "props": [
      {
        "name": "href",
        "required": true,
        "type": "string",
        "defaultValue": null,
        "description": ""
      }
    ]
  },
  "card": {
    "componentName": "Card",
    "props": []
  }
} as const;
