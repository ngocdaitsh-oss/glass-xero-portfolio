/** Project mockups shared by the desktop Photos window and the mobile Photos page. */

export type Photo = {
  id: string;
  title: string;
  project: string;
  album: "UI/UX projects" | "Brand identity";
  year: string;
  src: string;
  blurb: string;
  role: string;
  favorite?: boolean;
};

export const PHOTOS: Photo[] = [
  {
    id: "sapp",
    title: "SAPP LMS",
    project: "SAPP · SAPP Academy",
    album: "UI/UX projects",
    year: "2024",
    src: "/figma/works/sapp-poster.png",
    blurb: "Learning management screens for course discovery, enrollment and the student dashboard.",
    role: "UI/UX designer",
    favorite: true,
  },
  {
    id: "bave",
    title: "bave",
    project: "bave · Bave Global Tech",
    album: "UI/UX projects",
    year: "2024",
    src: "/figma/works/bave-poster.png",
    blurb: "A car-service booking app: maintenance, tyres and repair, written for vehicle owners.",
    role: "UI/UX designer",
    favorite: true,
  },
  {
    id: "bsc",
    title: "BSC — Homepage redesign",
    project: "BSC · BIDV Securities",
    album: "UI/UX projects",
    year: "2023",
    src: "/figma/works/bsc-mockup.png",
    blurb: "Account-opening landing for BSC — a clearer eKYC path and one brand language across web and app.",
    role: "UI/UX designer",
  },
  {
    id: "vops",
    title: "vOps",
    project: "vOps · Viettel Group",
    album: "UI/UX projects",
    year: "2025",
    src: "/figma/works/vops-mockup.png",
    blurb: "A digital workplace on the VIC design system, shared across iOS, Android, web and desktop.",
    role: "Product designer",
  },
  {
    id: "thuc",
    title: "Thực Vị Thiên",
    project: "Thực Vị Thiên",
    album: "Brand identity",
    year: "2022",
    src: "/figma/works/thuc-mark.svg",
    blurb: "A restaurant rebrand that brings Taiwanese culture forward after a change of ownership.",
    role: "Brand designer",
  },
  {
    id: "rum",
    title: "98rum",
    project: "98rum",
    album: "Brand identity",
    year: "2023",
    src: "/figma/works/rum-mark.svg",
    blurb: "Name, mark and personality for a local fashion label aimed at young people.",
    role: "Brand designer",
  },
];

/**
 * Mobile Photos (Figma 369:22050 / 369:22130): ten mockups, two per project,
 * grouped by year. `work` links each one to its PHOTOS entry and case study.
 */
export type MobilePhoto = { id: string; work: string; src: string; group: "2024" | "2022 – 2023" };

export const MOBILE_PHOTOS: MobilePhoto[] = [
  { id: "sapp-1", work: "sapp", src: "/figma/mobile/photos/sapp-1.png", group: "2024" },
  { id: "sapp-2", work: "sapp", src: "/figma/mobile/photos/sapp-2.png", group: "2024" },
  { id: "bave-1", work: "bave", src: "/figma/mobile/photos/bave-1.png", group: "2024" },
  { id: "bave-2", work: "bave", src: "/figma/mobile/photos/bave-2.png", group: "2024" },
  { id: "bsc-1", work: "bsc", src: "/figma/mobile/photos/bsc-1.png", group: "2022 – 2023" },
  { id: "bsc-2", work: "bsc", src: "/figma/mobile/photos/bsc-2.png", group: "2022 – 2023" },
  { id: "thuc-1", work: "thuc", src: "/figma/mobile/photos/thuc-1.png", group: "2022 – 2023" },
  { id: "thuc-2", work: "thuc", src: "/figma/mobile/photos/thuc-2.png", group: "2022 – 2023" },
  { id: "rum-1", work: "rum", src: "/figma/mobile/photos/rum-1.png", group: "2022 – 2023" },
  { id: "rum-2", work: "rum", src: "/figma/mobile/photos/rum-2.png", group: "2022 – 2023" },
];
