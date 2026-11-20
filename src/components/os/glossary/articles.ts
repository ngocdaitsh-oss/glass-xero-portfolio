import { AB_TESTING } from "./ab-testing";
import { ACCESSIBILITY } from "./accessibility";
import { AFFINITY_DIAGRAM } from "./affinity-diagram";
import { ATTITUDINAL_METHODS } from "./attitudinal-methods";
import { BENCHMARK_STUDY } from "./benchmark-study";
import { CARD_SORTING } from "./card-sorting";
import { CLICKSTREAM_ANALYSIS } from "./clickstream-analysis";
import { COGNITIVE_LOAD } from "./cognitive-load";
import { CONFIDENCE_INTERVALS } from "./confidence-intervals";
import { CONTENT_DESIGN } from "./content-design";
import { CONTEXTUAL_INQUIRY } from "./contextual-inquiry";
import { CUSTOMER_EFFORT_SCORE } from "./customer-effort-score";
import { CUSTOMER_EXPERIENCE } from "./customer-experience";
import { CUSTOMER_FEEDBACK_LOOP } from "./customer-feedback-loop";
import { CUSTOMER_JOURNEY } from "./customer-journey";
import { CXO } from "./cxo";
import { DESIGN_COMPARISON } from "./design-comparison";
import { DESIGN_SPRINT } from "./design-sprint";
import { DESIGN_THINKING } from "./design-thinking";
import { DIARY_STUDY } from "./diary-study";
import { EMPATHY_MAPPING } from "./empathy-mapping";
import { ETHNOGRAPHIC_RESEARCH } from "./ethnographic-research";
import { EYE_TRACKING } from "./eye-tracking";
import { FIELD_STUDY } from "./field-study";
import { FIRST_CLICK_TESTING } from "./first-click-testing";
import { FOCUS_GROUP } from "./focus-group";
import { HEATMAP } from "./heatmap";
import { HEURISTIC_EVALUATION } from "./heuristic-evaluation";
import { HIGH_FIDELITY_PROTOTYPE } from "./high-fidelity-prototype";
import { IDEATION } from "./ideation";
import { INFORMATION_ARCHITECTURE } from "./information-architecture";
import { JOBS_TO_BE_DONE } from "./jobs-to-be-done";
import { JOURNEY_MAPPING } from "./journey-mapping";
import { LEAN_UX } from "./lean-ux";
import { LIKERT_SCALE } from "./likert-scale";
import { LONGITUDINAL_STUDY } from "./longitudinal-study";
import { LOW_FIDELITY_PROTOTYPE } from "./low-fidelity-prototype";
import { MARKET_RESEARCH } from "./market-research";
import { MENTAL_MODEL } from "./mental-model";
import { MICROCOPY } from "./microcopy";
import { MINIMUM_VIABLE_PRODUCT } from "./minimum-viable-product";
import { MODERATED_TESTING, MODERATED_USABILITY_TESTING } from "./moderated-testing";
import { MULTIVARIATE_TESTING } from "./multivariate-testing";
import { NET_PROMOTER_SCORE } from "./net-promoter-score";
import { ONBOARDING } from "./onboarding";
import { PROTOTYPE } from "./prototype";
import { QUALITATIVE_RESEARCH } from "./qualitative-research";
import { QUANTITATIVE_RESEARCH } from "./quantitative-research";
import type { Article } from "./types";

/** Published articles in the list's A–Z order (src/lib/glossary.ts); the detail footer's "next term" walks this list. */
export const ARTICLES: Article[] = [
  AB_TESTING,
  ACCESSIBILITY,
  AFFINITY_DIAGRAM,
  ATTITUDINAL_METHODS,
  BENCHMARK_STUDY,
  CXO,
  CARD_SORTING,
  CLICKSTREAM_ANALYSIS,
  COGNITIVE_LOAD,
  CONFIDENCE_INTERVALS,
  CONTENT_DESIGN,
  CONTEXTUAL_INQUIRY,
  CUSTOMER_EFFORT_SCORE,
  CUSTOMER_EXPERIENCE,
  CUSTOMER_FEEDBACK_LOOP,
  CUSTOMER_JOURNEY,
  DESIGN_COMPARISON,
  DESIGN_SPRINT,
  DESIGN_THINKING,
  DIARY_STUDY,
  EMPATHY_MAPPING,
  ETHNOGRAPHIC_RESEARCH,
  EYE_TRACKING,
  FIELD_STUDY,
  FIRST_CLICK_TESTING,
  FOCUS_GROUP,
  HEATMAP,
  HEURISTIC_EVALUATION,
  HIGH_FIDELITY_PROTOTYPE,
  IDEATION,
  INFORMATION_ARCHITECTURE,
  JOBS_TO_BE_DONE,
  JOURNEY_MAPPING,
  LEAN_UX,
  LIKERT_SCALE,
  LONGITUDINAL_STUDY,
  LOW_FIDELITY_PROTOTYPE,
  MARKET_RESEARCH,
  MENTAL_MODEL,
  MICROCOPY,
  MINIMUM_VIABLE_PRODUCT,
  MODERATED_TESTING,
  MODERATED_USABILITY_TESTING,
  MULTIVARIATE_TESTING,
  NET_PROMOTER_SCORE,
  ONBOARDING,
  PROTOTYPE,
  QUALITATIVE_RESEARCH,
  QUANTITATIVE_RESEARCH,
];

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
