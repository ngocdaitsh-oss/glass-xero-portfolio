/** About Me copy shared by the desktop window and the mobile About page. Items keep the desktop text and the shorter mobile text from Figma. */

export const JOBS = [
  {
    year: "2026",
    /** Mobile (Figma 375:194815) shows a shorter span and body. */
    mobileSpan: "Aug 2026 – Now",
    mobileBody: "Designing Viettel’s internal Workplace, ERP, vOps, and political-affairs products; researching employee personas and project flows to improve how teams work.",
    span: "August 2026 – Now",
    role: "Product Designer",
    company: "@Viettel IT Center",
    active: true,
    body: "I design internal products for Viettel, including Workplace, ERP, vOps, and political-affairs platforms. I research employee personas and map end-to-end project flows to uncover friction and improve the quality and efficiency of how Viettel employees work.",
  },
  {
    year: "2025",
    /** Mobile (Figma 375:194815) shows a shorter span and body. */
    mobileSpan: "Mar 2025 – Aug 2026",
    mobileBody: "Redesigned the LMS for students, ran UX research and usability-testing interviews to improve product quality.",
    span: "Mar 2025 – August 2026",
    role: "Product Designer",
    company: "@SAPP Academy",
    body: "At SAPP Academy, I was responsible for redesigning the LMS system for students, conducting UX research, and conducting usability testing interviews with the goal of improving product quality.",
  },
  {
    year: "2024",
    /** Mobile (Figma 375:194815) shows a shorter span and body. */
    mobileSpan: "Mar 2024 – Dec 2024",
    mobileBody: "Led UI and UX research and interface design for company projects, working directly with the Project Manager and Business Analyst.",
    span: "Mar 2024 – Dec 2024",
    role: "UI/UX Designer",
    company: "@Bave Global Tech LTD.",
    muted: true,
    body: "In charge and handle research on UI and UX, perform interface design and user experience for company projects. Working directly with Project Manager & Business Analyst.",
  },
  {
    year: "2023",
    /** Mobile (Figma 375:194815) shows a shorter span and body. */
    mobileSpan: "Mar 2023 – Feb 2024",
    mobileBody: "Built websites with Account Managers for financial partners such as BSC and Smart Invest, plus FPT IS and Stavian.",
    span: "Mar 2023 – Feb 2024",
    role: "UI/UX Designer",
    company: "@Wecan Group",
    muted: true,
    body: "At W.G, I worked with Account Managers and implemented website development projects for financial company partners such as BSC, Smart Invest,... Or other companies and businesses such as CMC Telecom, FPT IS and Stavian. I learned a lot of knowledge about User Interface while I’m here.",
  },
];

/** [name, desktop description, mobile description (Figma 375:195037)] */
export const SKILL_GROUPS: { title: string; icon: string; items: [string, string, string][] }[] = [
  {
    title: "Personal Skills",
    icon: "/figma/mobile/users.svg",
    items: [
      ["User Research", "Conduct user research to identify user needs, behaviors, and pain points, translating insights into design decisions.", "Identify user needs, behaviours and pain points, and turn insights into design decisions."],
      ["Heuristic Evaluation", "Evaluate interfaces using Nielsen’s 10 Usability Heuristics to uncover usability problems and recommend improvements.", "Review interfaces against Nielsen's 10 heuristics to find usability problems."],
      ["A/B Testing", "Design and analyze A/B tests to validate design hypotheses and support data-driven product decisions.", "Design and analyse A/B tests to validate design hypotheses."],
      ["Usability Testing", "Plan, conduct, and analyze usability testing sessions to identify usability issues and improve user experience.", "Plan, run and analyse sessions to find and fix usability issues."],
      ["Information Architecture", "Organize and structure content to create intuitive navigation and user flows.", "Structure content for intuitive navigation and user flows."],
      ["User Flow & Wireframing", "Design user flows, task flows, low-fidelity wireframes, and interactive prototypes for digital products.", "User flows, task flows, low-fi wireframes and interactive prototypes."],
      ["Design System", "Build and maintain scalable design systems, including primitive tokens, semantic tokens, reusable components, variants, and interaction states.", "Primitive and semantic tokens, reusable components, variants and states."],
      ["UI Design", "Create responsive, adaptive user-centered interfaces with a strong focus on consistency, accessibility, and visual hierarchy.", "Responsive, accessible interfaces with a clear visual hierarchy."],
    ],
  },
  {
    title: "Workflow Skills",
    icon: "/figma/mobile/cog.svg",
    items: [
      ["Agile Scrum Workflow", "Collaborate effectively within Agile Scrum teams through sprint planning, backlog refinement, design reviews, and iterative delivery.", "Sprint planning, backlog refinement, design reviews and iterative delivery."],
      ["MVP Planning", "Define and prioritize Minimum Viable Product (MVP) features based on user needs, business goals, and development feasibility.", "Prioritise MVP features by user needs, business goals and feasibility."],
      ["Cross-functional Collaboration", "Work closely with Product Managers, Business Analysts, Developers, and QA teams to deliver high-quality digital products.", "Work closely with PMs, BAs, developers and QA."],
      ["Business Requirement Analysis", "Read, analyze, and translate business requirements from Business Analysts into clear product insights and actionable design solutions.", "Translate BA requirements into product insights and design solutions."],
      ["Design Handoff", "Prepare development-ready designs with clear specifications, documentation, and component usage guidelines to ensure smooth implementation.", "Development-ready specs, documentation and component guidelines."],
    ],
  },
  {
    title: "Product Thinking",
    icon: "/figma/mobile/star-mark.svg",
    items: [
      ["User-Centered Design", "Apply user-centered design principles throughout the product lifecycle to create intuitive, accessible, and meaningful user experiences.", "Apply user-centred principles across the product lifecycle."],
      ["Success Metrics", "Establish measurable success metrics and KPIs to evaluate product performance and support continuous improvement.", "Set measurable KPIs to evaluate product performance."],
      ["Problem Solving", "Identify user pain points, define design opportunities, and develop practical solutions that balance usability and business goals.", "Turn pain points into practical solutions that balance usability and business."],
      ["Design Validation", "Validate concepts through prototyping, usability testing, heuristic evaluation, and iterative design improvements before implementation.", "Validate concepts through prototypes, testing and iteration."],
    ],
  },
];
