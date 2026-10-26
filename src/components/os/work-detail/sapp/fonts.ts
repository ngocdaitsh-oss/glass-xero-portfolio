import { Be_Vietnam_Pro, Fira_Sans, Inter, PT_Mono, Plus_Jakarta_Sans, Roboto } from "next/font/google";

/*
 * Fonts used by the SAPP case study specimens, loaded once for the whole page
 * (each section used to load its own copy). Use `.className`, or `.variable`
 * with `font-[family-name:var(--font-sapp-…)]`.
 */
export const sappBeVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sapp-bvp",
  display: "swap",
});
export const sappRoboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sapp-roboto",
  display: "swap",
});
export const sappInter = Inter({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700"], display: "swap" });
export const sappPtMono = PT_Mono({ subsets: ["latin"], weight: "400", variable: "--font-sapp-ptmono", display: "swap" });
export const sappJakarta = Plus_Jakarta_Sans({ subsets: ["latin", "vietnamese"], weight: ["400", "700"], variable: "--font-sapp-jakarta", display: "swap" });
export const sappFira = Fira_Sans({ subsets: ["latin", "vietnamese"], weight: ["600"], display: "swap" });
