/**
 * Interfaces for the indices returned by the bom api.
 */

import { ApiResponse } from "./Generic";

/**
 * options for the "k"-index location specification
 * note "a" and "dst" only take "Australian Region"
 * 
 * NOTE
 * k-index is also further specified in the time domian
 * at 3 hours intervals, while the others are for days only
 * (where the time of day is 00:00:00 [hh:mm:ss])
 */

export const VALID_LOCATIONS = [
  "Alice Springs", "Canberra", "Cocos Island", "Narrabri", "Darwin", "Hobart",
  "Launceston", "Learmonth", "Melbourne", "Norfolk Island", "Perth",
  "Sydney", "Townsville", "Casey", "Davis", "Macquarie Island", "Mawson",
  "Australian region"
];

export interface IndexEntry {
  index: string | number;
  valid_time: string;
  expires?: string | number;
}

/**
 * NOTE
 * for k index
 * valid_time denotes start of 3 hour window of validity
 * 
 * for dst index
 * vaid_time equals the time of the dst value
 * 
 * for a index
 * valid_time denotes the start of the day for which the value is relevant
 */

/**
 * the k-index also might include an analysis time
 */
export interface KIndexEntry extends IndexEntry {
  analysis_time: string;
}

export type KIndexResponse = ApiResponse<KIndexEntry[]>;

/**
 * the other blander indices
 * 
 * weirdly and annoyingly these, despite the docs, returned nested arrays
 */
export type IndexResponse = ApiResponse<IndexEntry[][]>;

// will a general one do? or should we have something like:
//export type DstIndexResponse = ApiResponse<IndexEntry[]>;
