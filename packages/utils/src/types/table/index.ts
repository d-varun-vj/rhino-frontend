export type Sort = {
  field: string;
  direction: string;
};

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface TableMeta {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
