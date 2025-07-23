
/**
 * besides "indices" (see other interface file), we have "alerts"
 * and also "warnings" and "outlooks"
 * 
 * See https://sws-data.sws.bom.gov.au/api/v1 documentation.
 */


/**
 * api responses follow the general structure:
 * {
 *   data: [...],   // array of relevant entries
 *   errors?: any   // optional errors if the request fails
 * }
 */
import { ApiResponse } from "./Generic";

/**
 * possible causes of geomagnetic activity:
 * coronal hole, coronal mass ejection, disappearing filament, flare.
 */
export type GeophysicalCause = 
  | "coronal hole"
  | "coronal mass ejection"
  | "disappearing filament"
  | "flare";


/**
 * latitude bands, used in aurora alerts/watch/outlook.
 */
export type LatitudeBand = 
    | "high"
    | "mid"
    | "low"
    | "equatorial";


/**
 * categories of alert strengths
 * used in alert descriptions
 */
export type AlertCategory = 
    | 'minor'
    | 'major'
    | 'severe';


/**
 * forecast activity object for MagWarning.
 * 
 * Fields:
 * - date: Date the forecast applies to (UTC)
 * - forecast: Forecast activity description
 * 
 */
export interface ForecastActivity {
  date: string;
  forecast: string;
}

/** ALERTS */

/**
 * Magnetic Alert entry returned by get-mag-alert
 * 
 * will be an array with either one element representing
 * the current magnetic alert, or empty if no alert is current.
 * 
 * Fields:
 * - start_time: Time alert became active (UTC)
 * - valid_until: Time alert is valid until (UTC)
 * - g_scale: NOAA Geomagnetic Storm scale level (G1-G5) as a number
 * - description: Alert level, one of 'minor', 'major', or 'severe'
 */
export interface MagAlertEntry {
  start_time: string;
  valid_until: string;
  g_scale: number;
  description: AlertCategory;
}

export type MagAlertResponse = ApiResponse<MagAlertEntry[]>;

/**
 * 
 * Fields:
 * - issue_time: When the warning was issued (UTC)
 * - start_date: First applicable day (UTC)
 * - end_date: Last applicable day (UTC)
 * - cause: Cause of geomagnetic activity (coronal hole, CME, etc.)
 * - activity: Forecast geomagnetic activity levels per day
 * - comments: Forecaster's comments
 * 
 */
export interface MagWarningEntry {
  issue_time: string;
  start_date: string;
  end_date: string;
  cause: GeophysicalCause;
  activity: ForecastActivity[];
  comments: string;
}

export type MagWarningResponse = ApiResponse<MagWarningEntry[]>;

/**
 * 
 * "data" contains an array with one current alert or empty if none.
 * 
 * Fields:
 * - start_time: When the alert became active (UTC)
 * - valid_until: When the alert is valid until (UTC)
 * - k_aus: Alert level according to Australian K index (0-9)
 * - lat_band: Latitude band likely to observe aurora
 * - description: Description of the alert based on k_aus
 * 
 */
export interface AuroraAlertEntry {
  start_time: string;
  valid_until: string;
  k_aus: number;
  lat_band: LatitudeBand;
  description: string;
}

export type AuroraAlertResponse = ApiResponse<AuroraAlertEntry[]>;

/**
 * 
 * "data" contains an array with one current watch or empty if none.
 * 
 * Fields:
 * - issue_time: When the watch was issued (UTC)
 * - start_date: First applicable day (UTC)
 * - end_date: Last applicable day (UTC)
 * - cause: Dominant cause (coronal hole or CME)
 * - k_aus: Expected auroral activity level (0-9)
 * - lat_band: Latitude band likely to observe aurora
 * - comments: Forecaster comments
 * 
 */
export interface AuroraWatchEntry {
  issue_time: string;
  start_date: string;
  end_date: string;
  cause: Extract<GeophysicalCause, "coronal hole" | "coronal mass ejection">;
  k_aus: number;
  lat_band: LatitudeBand;
  comments: string;
}

export type AuroraWatchResponse = ApiResponse<AuroraWatchEntry[]>;


/**
 *
 * Fields:
 * - issue_time: When the outlook was issued (UTC)
 * - start_date: First applicable day (UTC)
 * - end_date: Last applicable day (UTC)
 * - cause: Dominant cause (coronal hole or CME)
 * - k_aus: Expected auroral activity level (0-9), optional if available
 * - lat_band: Latitude band likely to observe aurora, optional if available
 * - comments: Forecaster comments
 * 
 */
export interface AuroraOutlookEntry {
  issue_time: string;
  start_date: string;
  end_date: string;
  cause: Extract<GeophysicalCause, "coronal hole" | "coronal mass ejection">;
  k_aus?: number;
  lat_band?: LatitudeBand;
  comments: string;
}

export type AuroraOutlookResponse = ApiResponse<AuroraOutlookEntry[]>;
