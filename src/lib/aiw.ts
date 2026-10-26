/**
 * UI/UX AI Workflow content shared by the desktop document (AiWorkflowWindow)
 * and the mobile page (components/mobile/AiwPage). English source strings;
 * the Vietnamese lives in i18n/vi/aiw.ts.
 */

export const TOC = [
  { id: "overview", index: "01", label: "Overview" },
  { id: "workflow-map", index: "02", label: "Workflow map" },
  { id: "phase-1", index: "03", label: "Phase 1 · Discovery & Define" },
  { id: "phase-2", index: "04", label: "Phase 2 · AI Design Execution" },
  { id: "phase-3", index: "05", label: "Phase 3 · Review & Deliver" },
] as const;

export type SectionId = (typeof TOC)[number]["id"];

export const STATS = [
  ["Phases", "3"],
  ["Workflow steps", "6"],
  ["Approval gate", "1"],
  ["Inputs → Outputs", "5 → 6"],
] as const;

export const LEAD =
  "The AI-driven UI/UX workflow enables design teams to work in a more structured manner, spanning the entire process from requirement gathering, problem analysis, and flow mapping to UI design, review, and handoff.";

export const PHASE_CARDS = [
  { icon: "/figma/aiw/os-target.svg", title: "Phase 1: Discovery & Define", text: "Understand requirements & Finalize scope" },
  { icon: "/figma/aiw/os-design.svg", title: "Phase 2: AI Design Execution", text: "AI implementing Figma designs" },
  { icon: "/figma/aiw/os-chat.svg", title: "Phase 3: Review, Refine & Deliver", text: "Review, Edit & Handover" },
] as const;

export const MAP_BODY =
  "Every step is tagged by who leads it — Human, AI, or Human with AI — and a single UI approval gate decides whether a design moves to handoff or loops back for revision.";

export type Who = "AI" | "HUMAN" | "HUMAN + AI";

export const LEGEND = [
  { swatch: "dot", color: "#1f8fd6", label: "Human" },
  { swatch: "dot", color: "#6b4cff", label: "AI" },
  { swatch: "dot", color: "#e0457b", label: "Human with AI" },
  { swatch: "diamond", color: "#f46c0b", label: "Gate" },
] as const;

/** [name, mono code, icon] */
export const INPUTS: [string, string, string][] = [
  ["SRS", "DOC", "/figma/aiw/icon-file-text.svg"],
  ["Business Rules", "RULES", "/figma/aiw/icon-shield.svg"],
  ["Design System", "DS", "/figma/aiw/icon-grid.svg"],
  ["Brand Guideline", "BRAND", "/figma/aiw/icon-brand.svg"],
  ["Existing Figma File", "FIG", "/figma/aiw/icon-image.svg"],
];

export const OUTPUTS: [string, string, string][] = [
  ["Wireframe", "WIRE", "/figma/aiw/icon-grid.svg"],
  ["Component Library", "LIB", "/figma/aiw/icon-columns.svg"],
  ["UI State & Variants", "STATES", "/figma/aiw/icon-check.svg"],
  ["Userflow", "FLOW", "/figma/aiw/icon-refresh.svg"],
  ["Hi-fi Design", "HI-FI", "/figma/aiw/icon-image.svg"],
  ["Handoff", "DEV", "/figma/aiw/icon-download.svg"],
];

export const STEPS: { id: string; who: Who; title: string; body: string }[] = [
  { id: "01", who: "AI", title: "AI analysis SRS", body: "Document analysis, defining functions, flows, screens, and scope." },
  {
    id: "02",
    who: "HUMAN",
    title: "Designer clarifies and supplements information",
    body: "Reviews and confirms the scope, clarifying any uncertainties before the design process begins.",
  },
  { id: "03", who: "AI", title: "AI-designed wireframes", body: "Proposes solutions based on the Designer's documents." },
  { id: "04", who: "AI", title: "AI-generated high-fidelity design (Figma)", body: "High-fidelity design based on the Design System." },
  { id: "05", who: "HUMAN + AI", title: "Designer reviews the UI", body: "Quality review and handling of missing data, edge cases & consistency." },
];

export const FINAL_STEP = {
  id: "06",
  who: "HUMAN" as Who,
  title: "Final high-fidelity design & handoff",
  body: "Review, edit & hand over development-ready designs.",
};

export const PHASE_HEADS = {
  "phase-1": {
    index: "03 — PHASE 01",
    title: "Discovery & Define",
    subtitle: "Understand requirements & finalize scope.",
    people: [
      ["Designer", "#3d6fe8"],
      ["BA / PO", "#14b8a6"],
      ["Claude", "#7c3aed"],
    ] as [string, string][],
  },
  "phase-2": {
    index: "04 — PHASE 02",
    title: "AI Design Execution",
    subtitle: "AI implementing Figma designs.",
    people: [
      ["Claude", "#7c3aed"],
      ["Designer", "#3d6fe8"],
    ] as [string, string][],
  },
  "phase-3": {
    index: "05 — PHASE 03",
    title: "Review, Refine & Deliver",
    subtitle: "Review, edit & handover.",
    people: [
      ["Designer", "#3d6fe8"],
      ["Claude", "#7c3aed"],
    ] as [string, string][],
  },
};

export type Role = { glyph: "clip" | "speech" | "spark"; who: "AI" | "HUMAN"; title: string; body: string; accent?: boolean };

export const ROLE_ICON = {
  clip: "/figma/aiw/role-attach.svg",
  speech: "/figma/aiw/role-palette.svg",
  spark: "/figma/aiw/role-sparkles.svg",
} as const;

export const ROLES_1: Role[] = [
  { glyph: "clip", who: "HUMAN", title: "BA / PO", body: "The BA provides documentation, business rules & product context." },
  { glyph: "speech", who: "HUMAN", title: "UI/UX", body: "Designer reviews and confirms the scope, clarifying any uncertainties before the design process begins." },
  { glyph: "spark", who: "AI", title: "AI", accent: true, body: "Claude assists with requirement analysis, breaking down flows, screens, and states, and suggesting test cases." },
];

export const ROLES_2: Role[] = [
  {
    glyph: "spark",
    who: "AI",
    title: "AI",
    accent: true,
    body: "AI supports the rapid deployment of tasks in the design phase, such as suggesting information architecture, recommending workflows, creating UX briefs, writing microcopy, building frames/layouts, and assisting in creating Figma screens.",
  },
  {
    glyph: "speech",
    who: "HUMAN",
    title: "UI/UX",
    body: "The designer is responsible for guiding the user experience, checking the logic flow, selecting a suitable layout, and ensuring the design adheres to the finalized scope.",
  },
];

export type Capability = { n: string; icon: string; crop?: string; title: string };

const READ = { icon: "/figma/aiw/cap-read.png", crop: "absolute top-[-10%] left-[-14.93%] size-[127.5%] max-w-none" };

export const CAPABILITIES_1: Capability[] = [
  { n: "01", ...READ, title: "Read document" },
  { n: "02", icon: "/figma/aiw/cap-main.png", crop: "absolute top-[-12.18%] left-[-12.47%] size-[127.5%] max-w-none", title: "Identify main function" },
  { n: "03", icon: "/figma/aiw/cap-rules.png", title: "Business rule analysis" },
  { n: "04", icon: "/figma/aiw/cap-flow.png", title: "Identify Flow / Screen / State" },
  { n: "05", icon: "/figma/aiw/cap-edge.png", crop: "absolute top-[-11.92%] left-[-11.36%] size-[124.69%] max-w-none", title: "Suggest edge & permission cases" },
];

export const CAPABILITIES_2: Capability[] = [
  { n: "01", ...READ, title: "Create UX briefs for each flow" },
  { n: "02", ...READ, title: "Propose information architecture" },
  { n: "03", ...READ, title: "Select components from the DS" },
  { n: "04", ...READ, title: "Create a Figma design file" },
  { n: "05", ...READ, title: "Create every screen & state" },
];

export const COPY = {
  object1: "This phase involves the Designer, BA, and Claude.",
  input1: [
    "The inputs for this phase consist of the documents and background information necessary to accurately understand the design requirements.",
    "This serves as the foundation for designers and the AI to correctly analyze the scope, identify key workflows, and avoid overlooking critical logic.",
  ],
  aiRole1:
    "The role of AI is to speed up the analysis process and reduce the risk of missing logic, but the entire result is still checked, adjusted, and validated by the Designer.",
  output1:
    "The output of this phase is a clearly compiled design guidance document, including a requirement summary, flow list, screen list, state list, open questions, and confirmed design scope.",
  object2:
    "This phase helps to make the design process faster and clearer while still ensuring the output aligns with the product scope, logic, and UX/UI standards of the team.",
  input2:
    "The input for this phase is the information confirmed from the Discovery & Define phase, including scope, flow, screen, state, design system, component library, UX writing guideline, and the design platform to be implemented.",
  aiRole2:
    "The role of AI is to speed up the design process and reduce the risk of missing logic, but the entire result is still checked, adjusted, and validated by the Designer.",
  output2: [
    "The output of this phase consists of design products generated during the AI Design Execution process, including the UX brief, proposed wireframe/layout, UX writing content, Figma draft, list of created screens/states, and a self-review checklist.",
    "These outputs help the team quickly create an initial design for evaluation, revision, and further refinement before moving on to the formal review phase.",
  ],
  review3: [
    "The designer reviews the AI-generated UI for quality, missing data, edge cases and consistency.",
    "Designs that don't pass the UI approval gate loop back for revision; approved designs are finalized and handed off.",
  ],
  final3: "The approved design ships as a development-ready package for the team.",
};

/** Phase 1 output as a list (mobile Figma 388:99574; the desktop shows output-phase1.png). */
export const OUTPUT_LIST_1 = ["Requirement summary", "List of flow, screen & state", "Open questions", "Confirmed design scope"];

/** Phase 2 output as rows (mobile Figma 388:99652; the desktop shows output-phase2.png). */
export const OUTPUT_LIST_2: [string, string, string][] = [
  ["UX brief", "DOC", "/figma/aiw/icon-file-text.svg"],
  ["Wireframe / Layout proposal", "WIRE", "/figma/aiw/icon-grid.svg"],
  ["UX writing set", "COPY", "/figma/mobile/aiw/icon-message.svg"],
  ["List of created screens and states", "LIST", "/figma/aiw/icon-columns.svg"],
  ["Self-review checklist", "CHECK", "/figma/aiw/icon-check.svg"],
];

export const HANDOFF: [string, string, string][] = [
  ["Hi-fi Design", "HI-FI", "/figma/aiw/icon-image.svg"],
  ["UI State & Variants", "STATES", "/figma/aiw/icon-check.svg"],
  ["Component Library", "LIB", "/figma/aiw/icon-columns.svg"],
  ["Handoff", "DEV", "/figma/aiw/icon-download.svg"],
];

/** Input maps: the desktop draws them as graphs, mobile as grouped chips. */
export const INPUT_MAP_1 = {
  core: "Requirement",
  groups: [
    { label: "CONTEXT", items: ["User role", "Business rule"] },
    { label: "BA DOCUMENTS", items: ["BRD", "FS", "User Story"] },
  ],
};

export const INPUT_MAP_2 = {
  core: "Confirm scope",
  groups: [
    { label: "GUIDELINES", items: ["Design System for AI", "UX writing guideline"] },
    { label: "LIBRARY", items: ["AI Component library"] },
  ],
};
