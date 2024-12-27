export interface IPagination
{
  currentPage: number;
  sizePage: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPageNumber: number | null;
  previousPageNumber: number | null;
  actionGoToPage: React.Dispatch<React.SetStateAction<any>>;
}

export interface IPaginationForSlides
{
  currentPage: number;
  sizePage: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPageNumber: number | null;
  previousPageNumber: number | null;
}

export interface IDataRequestFindById {
  isValid: boolean;
  id: number;
}
