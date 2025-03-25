import { FooterType } from '..';
import { useEffect, useState } from 'react';
import { useFilter } from '../../../../context/useFilter';

type Footer = {
  pagination: FooterType;
};

const TableFooter = ({ pagination }: Footer) => {
  const [showIndex, setShowIndex] = useState<{
    from: number;
    to: number;
  }>({ from: 1, to: pagination.pageSize });

  const { client, location, group } = useFilter();

  useEffect(() => {
    setShowIndex({ from: 1, to: pagination.pageSize });
    pagination.setCurrentPage(0);
    pagination.setPageSize(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    client,
    location,
    group,
    pagination.setCurrentPage,
    pagination.setPageSize,
  ]);

  return (
    <div className="flex justify-between  my-5 flex-col gap-5 mt-10 lg:flex-row lg:items-center">
      {/* Page show filter */}
      <div>
        <span className="text-[#949494] text-[13px]">
          show &nbsp;
          <select
            value={pagination?.pageSize}
            onChange={(e) => {
              pagination?.setPageSize(Number(e.target.value));
              setShowIndex({
                from: showIndex.from,
                to:
                  pagination.pageSize < Number(e.target.value)
                    ? showIndex.from + Number(e.target.value) - 1
                    : showIndex.to -
                      (pagination.pageSize - Number(e.target.value)),
              });
            }}
            className="!w-fit !py-[8px] text-rhino-indigo-blue"
          >
            {[5, 10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          positions
        </span>
      </div>
      {/* Showing page count */}
      <div>
        <span className="flex items-center gap-1 text-[#949494] text-[13px] font-thin">
          <div>Showing </div>
          <strong>
            {pagination.totalCount > 0 ? showIndex.from : 0} to{' '}
            {pagination.totalCount > showIndex.to
              ? showIndex.to
              : pagination.totalCount}{' '}
            of {pagination.totalCount}
          </strong>
        </span>
      </div>
      {/* Pagination */}
      <div className="flex items-center  text-rhino-indigo-blue-light text-[12px] font-thin">
        <button
          className="border rounded-tl rounded-bl p-1"
          onClick={() => {
            pagination?.setCurrentPage(0);
            pagination.setPageSize(
              pagination.pageSize ? pagination.pageSize : 5
            );
            setShowIndex({ from: 1, to: pagination.pageSize });
          }}
        >
          {'<<'}
        </button>
        <button
          className="border p-1"
          onClick={() => {
            pagination?.setCurrentPage(
              pagination.currentPage ? pagination.currentPage - 1 : 0
            );
            pagination.setPageSize(
              pagination.pageSize ? pagination.pageSize : 5
            );
            setShowIndex({
              from:
                showIndex.from > 1 ? showIndex.from - pagination.pageSize : 1,
              to:
                showIndex.to > pagination.pageSize
                  ? showIndex.to - pagination.pageSize
                  : showIndex.to,
            });
          }}
        >
          {'Previous'}
        </button>

        {/* <>
          {[...(Array(pagination.totalCount) as number[])]
            .slice(
              Math.floor(pagination.currentPage / 10) * 10,
              Math.floor(pagination?.currentPage / 10) * 10 + 10
            )
            .map((_, pageIndex) => {
              const actualIndex =
                Math.floor(pagination?.currentPage / 10) * 10 + pageIndex;
              return (
                <button
                  key={actualIndex}
                  className={`border  px-2 py-1 ${pagination?.currentPage === actualIndex ? ' text-[#808080]' : 'text-rhino-indigo-blue'} `}
                  onClick={() => {
                    console.log(
                      actualIndex > pagination.currentPage
                        ? 'forward'
                        : 'backward'
                    );
                    pagination.setPageSize(
                      pagination.pageSize ? pagination.pageSize : 5
                    );
                    setShowIndex({
                      from: actualIndex * pagination.pageSize + 1,
                      to: Math.min(
                        (actualIndex + 1) * pagination.pageSize,
                        pagination.totalCount
                      ),
                    });
                    pagination?.setCurrentPage(actualIndex);
                  }}
                >
                  {actualIndex + 1}
                </button>
              );
            })}
        </> */}
        <>
          {/* Create an array of page numbers */}
          {Array(Math.ceil(pagination.totalCount / pagination.pageSize))
            .fill(null) // Fill array with placeholders
            .map((_, index) => index) // Map placeholders to page indices
            .slice(
              Math.floor(pagination.currentPage / 10) * 10, // Start of current chunk
              Math.floor(pagination.currentPage / 10) * 10 + 10 // End of current chunk
            )
            .map((pageIndex) => {
              return (
                <button
                  key={pageIndex}
                  className={`border px-2 py-1 ${
                    pagination.currentPage === pageIndex
                      ? 'text-[#808080]'
                      : 'text-rhino-indigo-blue'
                  }`}
                  onClick={() => {
                    pagination.setPageSize(
                      pagination.pageSize ? pagination.pageSize : 5
                    );
                    setShowIndex({
                      from: pageIndex * pagination.pageSize + 1,
                      to: Math.min(
                        (pageIndex + 1) * pagination.pageSize,
                        pagination.totalCount
                      ),
                    });
                    pagination.setCurrentPage(pageIndex);
                  }}
                >
                  {pageIndex + 1} {/* Display page number */}
                </button>
              );
            })}
        </>

        <button
          className="border  p-1"
          onClick={() => {
            pagination?.setCurrentPage(pagination.currentPage + 1);
            pagination.setPageSize(
              pagination.pageSize ? pagination.pageSize : 5
            );
            setShowIndex({
              from:
                showIndex.from < pagination.totalCount
                  ? showIndex.from + pagination.pageSize
                  : showIndex.from,
              to:
                showIndex.to < pagination.totalCount
                  ? showIndex.to + pagination.pageSize
                  : showIndex.to,
            });
          }}
          disabled={showIndex.to >= pagination.totalCount ? true : false}
        >
          {'Next'}
        </button>
        <button
          className="border rounded-br rounded-tr p-1"
          onClick={() => {
            pagination?.setCurrentPage(
              Math.floor(pagination?.totalCount / pagination?.pageSize) - 1
            );
            pagination.setPageSize(
              pagination.pageSize ? pagination.pageSize : 5
            );
            setShowIndex({
              from: pagination.totalCount - pagination.pageSize,
              to: pagination.totalCount,
            });
          }}
          // disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default TableFooter;
