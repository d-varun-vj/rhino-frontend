export const getPagePositions = ({ totalCount }: { totalCount: number }) => {
  const PAGE_POSITIONS = [5, 10, 25, 50];

  const nextLargestIndex = PAGE_POSITIONS.findIndex(
    (size) => size > totalCount
  );

  const reasonablePageSizes = PAGE_POSITIONS.filter((pageSize, index) => {
    return pageSize <= totalCount || index === nextLargestIndex;
  });

  return reasonablePageSizes.length > 0 ? reasonablePageSizes : [5];
};
