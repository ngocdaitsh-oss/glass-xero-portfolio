import { os } from "./os";
import { windows } from "./windows";
import { works } from "./works";
import { aiw } from "./aiw";
import { bave } from "./bave";
import { sapp } from "./sapp";
import { vops } from "./vops";
import { bsc } from "./bsc";
import { thucBrand } from "./thuc-brand";
import { thucApplications } from "./thuc-applications";
import { rumBrand } from "./rum-brand";
import { rumApplications } from "./rum-applications";
import { shared } from "./shared";
import { mobile } from "./mobile";

/** English source string → Vietnamese. Later areas override earlier ones (mobile first, so desktop wording always wins). */
export const vi: Record<string, string> = { ...mobile, ...os, ...windows, ...aiw, ...works, ...bave, ...sapp, ...vops, ...bsc, ...thucBrand, ...thucApplications, ...rumBrand, ...rumApplications, ...shared };
