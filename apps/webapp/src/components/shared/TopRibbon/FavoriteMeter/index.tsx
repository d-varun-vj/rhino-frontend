import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import Table from '../../Table';
import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FavoriteMeterFilter, FavoriteMeterType } from './types';
import ActionCell from '../../Table/ActionCell';
import IconButton from '../../Buttons/IconButton';
import { useGetAllFavoriteMeters } from './api';
import { useUser } from '../../../../context/user';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useFavoriteMeter } from '../../../../context/favoriteMeter';
import { useUserFilter } from '../../../../context/userFilter';
import { FilterVariant } from '../../Table/types';
import { Sort } from '../../../../types/shared/table';

const FavoriteMeter = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { favoriteMeter, setFavoriteMeter } = useFavoriteMeter();
  const { client } = useUserFilter();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<Sort>({
    field: '',
    direction: '',
  });
  const [filters, setFilters] = useState<FavoriteMeterFilter>({
    name: '',
    authorEmail: '',
    shared: '',
  });
  const [isModelOpen, setModelOpen] = useState(false);

  const translationBaseRoute = 'favoriteMeterModel.table.';
  const columns = React.useMemo<ColumnDef<FavoriteMeterType, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        header: t(translationBaseRoute + 'header.name'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'name',
          sortKey: 'name',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.authorEmail,
        header: t(translationBaseRoute + 'header.author'),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: FilterVariant.TEXT,
          filterKey: 'authorEmail',
          sortKey: 'user.email',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => (row.shared === true ? 'Yes' : 'No'),
        header: t(translationBaseRoute + 'header.shared'),
        meta: {
          filterVariant: FilterVariant.SELECT,
          filterKey: 'shared',
          sortKey: 'shared',
          sortDirection: sort.direction,
          selectionOptions: ['Yes', 'No'],
        },
      },
      {
        accessorFn: (row) => row.createdAt,
        header: t(translationBaseRoute + 'header.createdDate'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'createdAt',
          sortDirection: sort.direction,
        },
      },
      {
        accessorFn: (row) => row.updatedAt,
        header: t(translationBaseRoute + 'header.updatedDate'),
        cell: (info) => info.getValue(),
        meta: {
          sortKey: 'updatedAt',
          sortDirection: sort.direction,
        },
      },
      {
        id: 'action',
        accessorFn: (row) => row.action,
        header: t(translationBaseRoute + 'header.actions'),
        meta: {
          sortKey: null,
        },
        cell: (info) => (
          <ActionCell>
            <IconButton
              action={() => {
                setModelOpen(false);
                setFavoriteMeter(info.row.original);
              }}
              popupContent={t(translationBaseRoute + 'popup')}
              style="bg-rhino-energy-green text-rhino-white"
            >
              <FaArrowRight />
            </IconButton>
          </ActionCell>
        ),
      },
    ],
    [setFavoriteMeter, t, sort.direction]
  );

  const { data: tableData, isLoading } = useGetAllFavoriteMeters({
    page: page,
    size: pageSize,
    userUuid: user ? user?.uuid : '',
    clientUuid: client ? client.uuid : '',
    filters: filters,
    sort: sort,
    userId: user ? user?.uuid : null,
    userType: user ? user?.userType : null,
  });
  const onSortClick = (field: string, direction: string) => {
    setSort({ field, direction });
  };

  const onFilterChange = (
    val: string | null,
    field: string,
    varient: FilterVariant | null
  ) => {
    switch (varient) {
      case FilterVariant.TEXT:
        setFilters((prev: FavoriteMeterFilter) => {
          return { ...prev, [field]: val };
        });
        break;
      case FilterVariant.SELECT:
        setFilters((prev: FavoriteMeterFilter) => {
          return { ...prev, [field]: val?.toLowerCase() };
        });
        break;
      case null:
        setFilters({
          name: '',
          authorEmail: '',
          shared: '',
        });
    }
  };

  return (
    <div>
      <div
        className={`cursor-pointer min-w-[14rem]  flex items-center justify-center gap-[0.5rem] leading-[1rem] h-[2.5rem] text-rhino-white font-bold  rounded-[4px] text-[13px] ${favoriteMeter ? 'bg-rhino-indigo-blue border-rhino-indigo-blue-light' : 'bg-rhino-energy-green border-rhino-energy-green-light'}`}
        onClick={() => {
          if (favoriteMeter !== null) {
            setModelOpen(false);
            setFavoriteMeter(null);
          } else {
            setModelOpen(true);
          }
        }}
      >
        {favoriteMeter
          ? favoriteMeter.name
          : t('topRibbon.favoriteMeterButton')}
        {favoriteMeter ? (
          <RiCloseCircleFill className="font-bold text-[16px]" />
        ) : (
          <FaArrowRight />
        )}
      </div>
      {isModelOpen && (
        <div className=" w-full h-full absolute top-0 left-0 z-30 transition-opacity bg-black/15  ">
          <div className="mx-16 my-20 max-lg:mx-5  flex items-center relative z-30  ">
            <div className="border-t-[.5rem] border-t-rhino-energy-green shadow-xl relative flex flex-col w-full bg-[#fff] border-transparent border-[1px] rounded h-[800px]">
              <div className="flex items-start justify-between p-[1.25rem] ">
                <h4 className="text-[2rem] font-bold text-rhino-indigo-blue my-0 leading-[1.47] ">
                  {t('favoriteMeterModel.mainHeader')}
                </h4>
                <button
                  className="p-[1.25rem] my-[-1.25rem] ml-auto mr-[-1.25rem]  text-[#000] leading-[1] opacity-50 font-bold text-[1.21875rem] "
                  onClick={() => setModelOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="relative flex-grow flex-shrink basis-auto p-[1.25rem] overflow-auto [&>div]:justify-between">
                <Table
                  columns={columns}
                  data={tableData ? tableData.content : []}
                  footer={{
                    currentPage: page,
                    totalCount: tableData ? tableData.totalElements : 0,
                    setCurrentPage: setPage,
                    setPageSize: setPageSize,
                    pageSize: pageSize,
                  }}
                  extraStyles="max-h-[600px]"
                  emptyText="No results"
                  onSortSelect={onSortClick}
                  onFilterChange={onFilterChange}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteMeter;
