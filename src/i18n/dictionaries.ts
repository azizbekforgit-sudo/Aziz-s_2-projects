import ru, { type Dict } from "./ru";
import uz from "./uz";
import type { Locale } from "./config";

export type { Dict };
export const DICTIONARIES: Record<Locale, Dict> = { uz, ru };
