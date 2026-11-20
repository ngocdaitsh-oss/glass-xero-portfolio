import type { ComponentType } from "react";
import type { SectionDef } from "./ui";

/** One glossary article: hero data, the sections that make the table of contents, and the body. */
export type Article = {
  slug: string;
  /** Bump when the body's structure changes so edits saved against the old structure are dropped. */
  version: number;
  term: string;
  /** Lifecycle function (GLOSSARY_FUNCTIONS index) shown in the eyebrow and breadcrumb. */
  fn: number;
  vi: string;
  kind: string;
  definition: string;
  definitionMore: string;
  oneLine: string;
  /** Two big tiles at the bottom of the at-a-glance card. */
  glance: [string, string][];
  facts: { label: string; items: string[] }[];
  sections: SectionDef[];
  Body: ComponentType;
};
