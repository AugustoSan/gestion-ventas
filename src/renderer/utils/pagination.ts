import { PagedList } from '../../main/utils/Pagination';

export const createPaginationForSlides = <T>(data: PagedList<T>): IPaginationForSlides => {
    const pagination: IPaginationForSlides = {
      currentPage: data.currentPage,
      sizePage: data.pageSize,
      totalPages: data.totalPages,
      totalCount: data.totalCount,
      hasPreviousPage: data.hasPreviousPage,
      hasNextPage: data.hasNextPage,
      nextPageNumber: data.nextPageNumber,
      previousPageNumber: data.previousPageNumber
    };
    return pagination;
  };