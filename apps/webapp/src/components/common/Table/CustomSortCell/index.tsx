import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { SortArrow } from '../../../measurement/SelectMeasurement/types';

type CustomSortCellProps = {
  rowIndex: number;
  totalRows: number;
  onMove: (rowId: number, direction: SortArrow) => void;
  isDisable?: boolean;
};

const CustomSortCell = ({
  rowIndex,
  totalRows,
  onMove,
  isDisable = false,
}: CustomSortCellProps) => {
  const isFirst = rowIndex === 0;
  const isLast = rowIndex === totalRows - 1;

  const baseButtonClass =
    'p-1 rounded transition duration-150 cursor-pointer hover:bg-gray-100 active:bg-gray-200 text-black disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:active:bg-gray-200';

  return (
    <div className="flex gap-x-1">
      <button
        type="button"
        disabled={isLast || isDisable}
        onClick={() => onMove(rowIndex, 'down')}
        className={baseButtonClass}
        title="Move down"
      >
        <FaArrowDown size={14} />
      </button>

      <button
        type="button"
        disabled={isFirst || isDisable}
        onClick={() => onMove(rowIndex, 'up')}
        className={baseButtonClass}
        title="Move up"
      >
        <FaArrowUp size={14} />
      </button>
    </div>
  );
};

export default CustomSortCell;
