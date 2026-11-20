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
];

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
