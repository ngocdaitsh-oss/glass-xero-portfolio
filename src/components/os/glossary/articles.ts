import { AB_TESTING } from "./ab-testing";
import { ACCESSIBILITY } from "./accessibility";
import { AFFINITY_DIAGRAM } from "./affinity-diagram";
import { ATTITUDINAL_METHODS } from "./attitudinal-methods";
import type { Article } from "./types";

/** Published articles in A–Z order; the detail footer's "next term" walks this list. */
export const ARTICLES: Article[] = [AB_TESTING, ACCESSIBILITY, AFFINITY_DIAGRAM, ATTITUDINAL_METHODS];

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
