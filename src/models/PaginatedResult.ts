export interface IPaginatedResult<T> {
  data: T[]
  offset: number
  count: number
  totalRows: number
}
