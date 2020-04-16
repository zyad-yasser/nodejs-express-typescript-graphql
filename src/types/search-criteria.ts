export interface ISearchCriteria {
  search?: string;
  limit?: number;
  skip?: number;
  sortColumn?: string;
  sortType?: string;
  filters?: IFilter[];
}

export interface IFilter {
  key: string;
  value: string;
}
