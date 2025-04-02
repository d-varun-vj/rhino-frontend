import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import Table from '../../Table';
import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FavType } from './types';
import ActionCell from '../../Table/ActionCell';
import IconButton from '../../Buttons/IconButton';
import { useQuery } from '@tanstack/react-query';
import { getAllFavoriteMeters } from './api';
import { DATA_QUERY_KEYS } from '../../../../api/data-query-keys';
import { useUser } from '../../../../context/useUser';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useFavoriteMeter } from '../../../../context/useFavoriteMeter';
import { useFilter } from '../../../../context/useFilter';

const FavoriteMeter = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [isModelOpen, setModelOpen] = useState(false);
  const { favoriteMeter, setFavoriteMeter } = useFavoriteMeter();
  const { client } = useFilter();
  const translationBaseRoute = 'favoriteMeterModel.table.';
  const columns = React.useMemo<ColumnDef<FavType, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        header: t(translationBaseRoute + 'header.name'),
        cell: (info) => info.getValue(),
        meta: {
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.authorEmail,
        header: t(translationBaseRoute + 'header.author'),
        cell: (info) => info.getValue(),
        meta: {
          isSortable: true,
        },
      },
      {
        accessorFn: (row) => row.createdAt,
        header: t(translationBaseRoute + 'header.createdDate'),
        cell: (info) => info.getValue(),
        meta: {
          isSortable: true,
          filterVariant: null,
        },
      },
      {
        accessorFn: (row) => row.updatedAt,
        header: t(translationBaseRoute + 'header.updatedDate'),
        cell: (info) => info.getValue(),
        meta: {
          isSortable: true,
          filterVariant: null,
        },
      },
      {
        id: 'action',
        accessorFn: (row) => row.action,
        header: t(translationBaseRoute + 'header.actions'),
        meta: {
          filterVariant: null,
          isSortable: false,
        },
        cell: (info) => (
          <ActionCell>
            <IconButton
              action={() => {
                setModelOpen(false);
                setFavoriteMeter(info.row.original);
              }}
              popupContent={t(translationBaseRoute + 'popup')}
              style="bg-rhino-energy-green text-white"
            >
              <FaArrowRight />
            </IconButton>
          </ActionCell>
        ),
      },
    ],
    [setFavoriteMeter, t]
  );

  const { data: tableData } = useQuery({
    queryKey: [...DATA_QUERY_KEYS.getFavoriteMeters(), client],
    queryFn: () =>
      getAllFavoriteMeters({
        userUuid: user ? user?.uuid : '',
        clientUuid: client ? client.uuid : '',
      }),
    enabled: user?.uuid ? true : false,
  });

  return (
    <div>
      <div
        className={`cursor-pointer min-w-[14rem] max-w-[14rem] flex items-center justify-center gap-[0.5rem] leading-[1rem] h-[2.5rem] text-white font-bold  rounded-[4px] text-[13px] ${favoriteMeter ? 'bg-rhino-indigo-blue border-rhino-indigo-blue-light' : 'bg-rhino-energy-green border-rhino-energy-green-light'}`}
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
        <div className=" w-full h-full fixed top-0 left-0 z-50 transition-opacity bg-black/15 ">
          <div className="w-fit  my-[1.75rem] mx-auto flex items-center relative z-50 h-[-webkit-fill-available]">
            <div className="border-t-[.5rem] border-t-rhino-energy-green shadow-xl relative flex flex-col w-full bg-[#fff] border-transparent border-[1px] rounded ">
              <div className="flex items-start justify-between p-[1.25rem] ">
                <h4 className="text-[2rem] font-bold text-rhino-indigo-blue my-0 leading-[1.47] ">
                  {t('favoriteMeterModel.mainHeader')}
                </h4>
                <button
                  className="p-[1.25rem] my-[-1.25rem] ml-auto mr-[-1.25rem] cursor-pointer text-[#000] leading-[1] opacity-50 font-bold text-[1.21875rem] "
                  onClick={() => setModelOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="relative flex-grow flex-shrink basis-auto p-[1.25rem] overflow-auto ">
                <Table
                  columns={columns}
                  data={tableData ? tableData : []}
                  footer={{
                    currentPage: page,
                    totalCount: tableData ? tableData.length : 0,
                    setCurrentPage: setPage,
                    setPageSize: setPageSize,
                    pageSize: pageSize,
                  }}
                  extraStyles="max-h-[500px]"
                  emptyText="No results"
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
