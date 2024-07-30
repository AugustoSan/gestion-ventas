export class PagedList<T> {
    public currentPage: number;
    public totalPages: number;
    public pageSize: number;
    public totalCount: number;
    public hasPreviousPage: boolean;
    public hasNextPage: boolean;
    public nextPageNumber: number | null;
    public previousPageNumber: number | null;
    public items: T[];
  
    constructor(items: T[], count: number, pageNumber: number, pageSize: number) {
      this.items = items;
      this.totalCount = count;
      this.pageSize = pageSize;
      this.currentPage = pageNumber;
      const currentPageTemp = this.currentPage + 1;

      this.totalPages = Math.ceil(count / pageSize);
      this.hasPreviousPage = currentPageTemp > 1;
      this.hasNextPage = currentPageTemp < this.totalPages;
      this.nextPageNumber = this.hasNextPage ? currentPageTemp + 1 : null;
      this.previousPageNumber = this.hasPreviousPage ? currentPageTemp - 1 : null;
    }
  
    public static create<T>(source: T[], pageNumber: number, pageSize: number): PagedList<T> {
      const count = source.length;
      const start = pageNumber * pageSize;
      const items = source.slice(start, start + pageSize);
  
      return new PagedList<T>(items, count, pageNumber, pageSize);
    }

    toPlainObject() {
        return {
          currentPage: this.currentPage,
          totalPages: this.totalPages,
          pageSize: this.pageSize,
          totalCount: this.totalCount,
          items: this.items,
        };
      }
  }
  
//   // Example usage
//   const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example data source
//   const pageNumber = 2; // Current pag
  