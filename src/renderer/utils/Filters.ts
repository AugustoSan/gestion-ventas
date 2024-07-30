export class PagedList<T> {
    public currentPage: number;
    public totalPages: number;
    public pageSize: number;
    public totalCount: number;
    public items: T[];
  
    constructor(items: T[], count: number, pageNumber: number, pageSize: number) {
      this.items = items;
      this.totalCount = count;
      this.pageSize = pageSize;
      this.currentPage = pageNumber;
      this.totalPages = Math.ceil(count / pageSize);
    }
  
    get hasPreviousPage(): boolean {
      return this.currentPage > 1;
    }
  
    get hasNextPage(): boolean {
      return this.currentPage < this.totalPages;
    }
  
    get nextPageNumber(): number | null {
      return this.hasNextPage ? this.currentPage + 1 : null;
    }
  
    get previousPageNumber(): number | null {
      return this.hasPreviousPage ? this.currentPage - 1 : null;
    }
  
    public static create<T>(source: T[], pageNumber: number, pageSize: number): PagedList<T> {
      const count = source.length;
      const start = (pageNumber - 1) * pageSize;
      const items = source.slice(start, start + pageSize);
  
      return new PagedList<T>(items, count, pageNumber, pageSize);
    }
  }
  
//   // Example usage
//   const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example data source
//   const pageNumber = 2; // Current pag
  