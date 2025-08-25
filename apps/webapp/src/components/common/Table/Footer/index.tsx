import { getPagePositions } from '@rhino/utils';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FooterType } from '..';
import { useUserFilter } from '../../../../context/userFilter';

type Footer = {
  pagination: FooterType;
};

const TableFooter = ({ pagination }: Footer) => {
  const [pagePositions, setPagePositions] = useState<number[]>([]);

  const { client, location, group } = useUserFilter();
  const { t } = useTranslation('common');
  const paginationRef = useRef(pagination);

  const calculateShowIndex = (
    currentPage: number,
    pageSize: number,
    totalCount: number
  ) => {
    const from = currentPage * pageSize + 1;
    const to = Math.min((currentPage + 1) * pageSize, totalCount);
    return { from: totalCount > 0 ? from : 0, to };
  };

  const getTotalPages = () => {
    return Math.ceil(pagination.totalCount / pagination.pageSize);
  };

  const getLastPageIndex = () => {
    return Math.max(0, getTotalPages() - 1);
  };

  const showIndex = calculateShowIndex(
    pagination.currentPage,
    pagination.pageSize,
    pagination.totalCount
  );

  useEffect(() => {
    setPagePositions(getPagePositions({ totalCount: pagination.totalCount }));
  }, [pagination.totalCount]);

  useEffect(() => {
    paginationRef.current.setCurrentPage(0);
    paginationRef.current.setPageSize(paginationRef.current.pageSize || 5);
  }, [client, location, group]);

  const handlePageSizeChange = (newPageSize: number) => {
    pagination.setPageSize(newPageSize);
    pagination.setCurrentPage(0);
  };

  const handleFirstPage = () => {
    pagination.setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(0, pagination.currentPage - 1);
    pagination.setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    const totalPages = getTotalPages();
    const newPage = Math.min(totalPages - 1, pagination.currentPage + 1);
    pagination.setCurrentPage(newPage);
  };

  const handleLastPage = () => {
    const lastPageIndex = getLastPageIndex();
    pagination.setCurrentPage(lastPageIndex);
  };

  const handlePageClick = (pageIndex: number) => {
    pagination.setCurrentPage(pageIndex);
  };

  const canGoPrevious = pagination.currentPage > 0;
  const canGoNext = pagination.currentPage < getTotalPages() - 1;

  return (
    <div className="flex justify-between my-5 flex-col gap-5 mt-10 lg:flex-row lg:items-center">
      {/* Page size selector */}
      <div>
        <span className="text-[#949494] text-[13px]">
          {t('table.footer.show')} &nbsp;
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="!w-fit !py-[8px] text-rhino-indigo-blue"
          >
            {pagePositions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          &nbsp;{t('table.footer.positions')}
        </span>
      </div>

      {/* Showing page count */}
      <div>
        <span className="flex items-center gap-1 text-[#949494] text-[13px] font-thin">
          <div>{t('table.footer.showing')} </div>
          <strong>
            {showIndex.from} {t('table.footer.to')} {showIndex.to}{' '}
            {t('table.footer.of')} {pagination.totalCount}
          </strong>
        </span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center text-rhino-indigo-blue-light text-[12px] font-thin">
        {/* First page button */}
        <button
          className="border rounded-tl rounded-bl px-2.5 py-1 border-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleFirstPage}
          disabled={!canGoPrevious}
        >
          {'<<'}
        </button>

        {/* Previous page button */}
        <button
          className="border px-2.5 py-1 border-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={!canGoPrevious}
        >
          {t('table.footer.previous')}
        </button>

        {/* Page number buttons */}
        {Array(getTotalPages())
          .fill(null)
          .map((_, index) => index)
          .slice(
            Math.floor(pagination.currentPage / 10) * 10,
            Math.floor(pagination.currentPage / 10) * 10 + 10
          )
          .map((pageIndex) => (
            <button
              key={pageIndex}
              className={`border px-2.5 py-1 border-gray-200 cursor-pointer ${
                pagination.currentPage === pageIndex
                  ? 'text-[#808080] bg-gray-100'
                  : 'text-rhino-indigo-blue hover:bg-gray-50'
              }`}
              onClick={() => handlePageClick(pageIndex)}
            >
              {pageIndex + 1}
            </button>
          ))}

        {/* Next page button */}
        <button
          className="border px-2.5 py-1 border-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleNextPage}
          disabled={!canGoNext}
        >
          {t('table.footer.next')}
        </button>

        {/* Last page button */}
        <button
          className="border rounded-br rounded-tr px-2.5 py-1 border-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleLastPage}
          disabled={!canGoNext}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default TableFooter;
