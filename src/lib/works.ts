export type WorkCategory = "ui" | "graphic";

export type Work = {
  id: string;
  index: string;
  title: string;
  year: string;
  category: WorkCategory;
  tags: string[];
  highlights?: string[];
  /** Figma uses stronger highlight copy on the vOps and SAPP cards. */
  highlightStrong?: boolean;
  description?: string;
  blurb: string;
  /** Shorter summary on the mobile list rows (Figma "Mobile — Works (List)" 394:25516); falls back to `blurb`. */
  mobileBlurb?: string;
  logo: "sapp" | "bave" | "bsc" | "vops" | "thuc" | "freelance";
  cover: "sapp" | "bave" | "bsc" | "vops" | "thuc" | "rum";
};

export const works: Work[] = [
  {
    id: "vops",
    index: "04",
    title: "The Digital Workplace App for Viettel Group (vOps)",
    year: "2025",
    category: "ui",
    tags: ["Product design", "Mobile app", "Research plan", "Survey Research"],
    highlightStrong: true,
    highlights: [
      "Product design for the whole Viettel workforce",
      "Design system built on top of VIC",
      "One experience across iOS, Android, Web and Desktop",
    ],
    blurb: "Product design for the whole Viettel workforce · Design system built on top of VIC",
    mobileBlurb: "Digital workplace for every Viettel employee · Design system on VIC · iOS, Android, Web & Desktop",
    logo: "vops",
    cover: "vops",
  },
  {
    id: "sapp",
    index: "01",
    title: "The Learning Management System Application",
    year: "2024",
    category: "ui",
    tags: ["Product design", "Web app", "Usability Testing", "Task Weight Plan", "Micro Interaction"],
    highlightStrong: true,
    highlights: [
      "Product & OPS management system",
      "Clean & simple interface",
      "Usability testing for improving user experiences",
    ],
    blurb: "Product & OPS management system · Clean & simple interface · Usability testing",
    logo: "sapp",
    cover: "sapp",
  },
  {
    id: "bave",
    index: "02",
    title: "The Car Service Booking E-Commerce Application",
    year: "2024",
    category: "ui",
    tags: ["Product design", "Mobile app", "Data Research"],
    highlights: [
      "User research and defining end-user",
      "User experience, essential functions and priority ordering",
      "The optimal solution for vehicle users",
    ],
    blurb: "User research · Essential functions & priority ordering · Built for vehicle owners",
    logo: "bave",
    cover: "bave",
  },
  {
    id: "bsc",
    index: "03",
    title: "Website Redesign for BIDV Finance Company (BSC)",
    year: "2023",
    category: "ui",
    tags: ["Website redesign", "Fintech"],
    highlights: [
      "Optimize interface and improve functionality",
      "Reorienting the brand on digital experience",
      "Data flow and financial prototype",
    ],
    blurb: "Optimize interface and improve functionality · Reorienting the brand · Data flow and financial prototype",
    mobileBlurb: "Optimized interface · Brand reoriented for digital · Data flow & financial prototype",
    logo: "bsc",
    cover: "bsc",
  },
  {
    id: "thuc",
    index: "05",
    title: "The Thuc Vi Thien Restaurant Brand Identity",
    year: "2022",
    category: "graphic",
    tags: ["Brand identity", "F&B"],
    description:
      "Thuc Vi Thien was a cooperation between Taiwan and Shanghai franchise that fell into the image of traditional Chinese restaurant. After being taken over by a new team, who wanted to highlight Taiwanese culture and features, Dim Sum 8 needed to be rebranded.",
    blurb:
      "A rebrand that moves a Taiwan–Shanghai restaurant away from a generic Chinese image and toward Taiwanese culture.",
    mobileBlurb: "Rebranding a Taiwan–Shanghai dim sum franchise to highlight Taiwanese culture.",
    logo: "thuc",
    cover: "thuc",
  },
  {
    id: "rum",
    index: "06",
    title: "The 98rum Local Fashion Brand Identity",
    year: "2023",
    category: "graphic",
    tags: ["Product design", "Web app"],
    description:
      "98rum was created with the vision to create a local brand that is not only comfortable but versatile to wear both indoors and outdoors, and most importantly, has a youthful and bright style. Tasked with creating a name, visual identity and personality for the brand to appeal to young people.",
    blurb: "Naming, visual identity and a youthful personality for a local brand made to be worn in and out.",
    mobileBlurb: "Name, visual identity and personality for a youthful local fashion brand.",
    logo: "freelance",
    cover: "rum",
  },
];

export const uiWorks = works.filter((work) => work.category === "ui");
export const graphicWorks = works.filter((work) => work.category === "graphic");
