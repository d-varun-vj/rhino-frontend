import { AssetConsumptionTableData } from '@rhino/apis';
import DebouncedTextField from 'apps/webapp/src/components/common/input/TextField/DebouncedTextField';
import { IoSearch } from 'react-icons/io5';

const ToolBar = ({
  selectedRows,
  compareMode = false,
  setSelectedRows,
  setCompareMode,
  onSearch,
  searchPlaceholder,
  searchValue,
}: {
  selectedRows: AssetConsumptionTableData[];
  compareMode: boolean;
  setSelectedRows: (value: AssetConsumptionTableData[]) => void;
  setCompareMode: (value: boolean) => void;
  onSearch: (value: string | number) => void;
  searchPlaceholder: string;
  searchValue: string | number;
}) => {
  return (
    <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="relative w-full md:w-72">
        <DebouncedTextField
          value={searchValue}
          onChange={onSearch}
          placeholder={searchPlaceholder}
          classNames={{ input: '!rounded-full' }}
          leftSection={<IoSearch />}
          debounce={1000}
        />
      </div>
      <div className="flex w-full md:w-auto items-center gap-3">
        {!compareMode ? (
          <>
            {/* Implementation will take place within the scope of PRD-4085 */}
            {/* <button
              onClick={() => setCompareMode(true)}
              className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 h-[36px] text-green-50 bg-rhino-energy-green rounded-full font-semibold hover:bg-rhino-green-accent transition-colors shadow-sm cursor-pointer"
            >
              <MdCompareArrows />
              <span className="text-sm font-medium">Compare</span>
            </button> */}

            {/* Implementation will take place within the scope of PRD-3574 */}
            {/* <button className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 h-[36px] text-green-50 bg-rhino-energy-green rounded-full font-semibold hover:bg-rhino-green-accent transition-colors shadow-sm cursor-pointer">
              <LuColumns3 />
              <span className="text-sm font-medium">Choose columns</span>
            </button> */}
          </>
        ) : (
          <>
            <button
              onClick={() => {
                console.log('Applying comparison for rows:', selectedRows);
                setCompareMode(false);
                setSelectedRows([]);
              }}
              className="flex-1 md:flex-none justify-center flex items-center gap-2 px-6 h-[36px] text-white bg-rhino-energy-green rounded-full font-semibold hover:bg-rhino-green-accent transition-colors shadow-sm cursor-pointer"
            >
              <span className="text-sm font-medium">Apply</span>
            </button>
            <button
              onClick={() => {
                setCompareMode(false);
                setSelectedRows([]);
              }}
              className="flex-1 md:flex-none justify-center flex items-center gap-2 px-6 h-[36px] text-white rounded-full font-semibold transition-colors shadow-sm cursor-pointer border border-gray-200 bg-rhino-indigo-blue"
            >
              <span className="text-sm font-medium">Cancel</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToolBar;
