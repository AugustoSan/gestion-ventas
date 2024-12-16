import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from 'react';

interface IPagination {
  currentPage: number;
  sizePage: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPageNumber: number | null;
  previousPageNumber: number | null;
  actionGoToPage: (page: number) => void;
}

export const PaginationComponent = ({
  currentPage, 
  sizePage, 
  totalPages, 
  totalCount, 
  hasPreviousPage,
  hasNextPage,
  nextPageNumber,
  previousPageNumber,
  actionGoToPage,
}: IPagination): JSX.Element => {
  
  const [pagesToShow, setPagesToShow] = useState<Array<number | string>>([]);

  useEffect(() => {
    const getPagesToShow = (): Array<number | string> => {
      const totalNumbers = 5;
      const totalBlocks = totalNumbers + 2;
      
      if (totalPages > totalBlocks) {
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);
        let pages: Array<number | string> = [];

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        if (startPage > 2) {
          pages.unshift('...');
        }

        if (endPage < totalPages - 1) {
          pages.push('...');
        }

        return [1, ...pages, totalPages];
      } else {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
      }
    };

    setPagesToShow(getPagesToShow());
  }, [currentPage, totalPages]);

  return (
    <div>
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => actionGoToPage(0)} disabled={!hasPreviousPage} />
        <Pagination.Prev onClick={() => actionGoToPage(currentPage - 1)} disabled={!hasPreviousPage} />
        {
          pagesToShow.map((page, index) => 
            typeof page === 'string' ? (
              <Pagination.Ellipsis key={`ellipsis-${index}`} />
            ) : (
              <Pagination.Item 
                key={`item-pagination-${index}`} 
                active={page === (currentPage + 1)}
                onClick={() => {
                  if (page === (currentPage + 1)) return;

                  actionGoToPage(page - 1);
                }}
              >
                {page}
              </Pagination.Item>
            )
          )
        }
        <Pagination.Next onClick={() => actionGoToPage(currentPage + 1)} disabled={!hasNextPage} />
        <Pagination.Last onClick={() => actionGoToPage(totalPages - 1)} disabled={!hasNextPage} />
      </Pagination>
    </div>
  );
};
