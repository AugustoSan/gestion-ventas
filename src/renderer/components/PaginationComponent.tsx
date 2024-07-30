import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { PagedList } from '../utils/Filters';

interface IDataProps<T>
{
  data: PagedList<T>;
  actionNextPage: () => void;
  actionPreviousPage: () => void;
}

export const PaginationComponent = <T,>({data}:IDataProps<T>):JSX.Element => {

  return (
    <div>
      <Pagination className="justify-content-center">
        <Pagination.First disabled={!data.hasPreviousPage} />
        <Pagination.Prev disabled={!data.hasPreviousPage}/>
        {
          data.hasPreviousPage === false 
            ? null
            : (
              <Pagination.Item active={false}>
                {data.previousPageNumber}
              </Pagination.Item>)
        }
        <Pagination.Item active={true}>
          {data.currentPage}
        </Pagination.Item>
        {
          data.hasNextPage === false 
            ? null
            : (
              <Pagination.Item onClick={() => {
                data.currentPage = data.currentPage + 1;
              }}>
                {data.nextPageNumber}
              </Pagination.Item>)
        }
        <Pagination.Next disabled={!data.hasNextPage} />
        <Pagination.Last disabled={!data.hasNextPage} />
      </Pagination>
    </div>
  );
}
