/**
 *  a generic reponse interface
 */
export interface ApiResponse<T> {
  data: T;
  errors?: any;
}
