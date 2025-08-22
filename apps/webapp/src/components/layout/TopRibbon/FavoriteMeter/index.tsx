import {
  FavoriteMeterFilter,
  FavoriteMeterType,
  useGetAllFavoriteMeters,
} from '@rhino/apis';
import { Sort } from '@rhino/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useFavoriteMeter } from 'apps/webapp/src/context/favoriteMeter';
import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import { RiCloseCircleFill } from 'react-icons/ri';
import IconButton from '../../../common/buttons/IconButton';
import CustomModal from '../../../common/modals/CustomModal';
import Table from '../../../common/Table';
import ActionCell from '../../../common/Table/ActionCell';
import { FilterVariant } from '../../../common/Table/types';

type FavoriteMeterProps = {
  selectedFavoriteMeter?: string;
  removeSelectedFavoriteMeter: () => void;
  selectedClientUuid?: string | null;
};

const FavoriteMeter = ({
  selectedFavoriteMeter,
  removeSelectedFavoriteMeter,
  selectedClientUuid,
}: FavoriteMeterProps) => {
  const { t } = useTranslation('components');
  const { t: tLayout } = useTranslation('layout');
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
  const [modelOpen, setModelOpen] = useState(false);

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
          selectionOptions: [
            {
              label: 'Yes',
              value: 'Yes',
            },
            {
              label: 'No',
              value: 'No',
            },
          ],
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
                setFavoriteMeter({
                  uuid: info.row.original.uuid,
                  name: info.row.original.name,
                });
              }}
              popupContent={t(translationBaseRoute + 'popup')}
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
    clientUuid: selectedClientUuid || client?.uuid || '',
    filters: filters,
    sort: sort,
    userId: user ? user?.uuid : null,
  });
  const onSortClick = (field: string, direction: string) => {
    setSort({ field, direction });
  };

  const onFilterChange = (
    val: string | null,
    field: string,
    variant: FilterVariant | null
  ) => {
    switch (variant) {
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

  const resetModal = () => {
    setFilters({
      name: '',
      authorEmail: '',
      shared: '',
    });
    setSort({
      direction: '',
      field: '',
    });
    setPage(0);
    setPageSize(5);
  };

  return (
    <div>
      <div
        className={`cursor-pointer min-w-[14rem]  flex items-center justify-center gap-[0.5rem] leading-[1rem] h-[2.5rem] text-rhino-white font-bold  rounded-[4px] text-[13px] ${favoriteMeter?.uuid || selectedFavoriteMeter?.length ? 'bg-rhino-indigo-blue border-rhino-indigo-blue-light' : 'bg-rhino-energy-green border-rhino-energy-green-light'}`}
        onClick={() => {
          if (favoriteMeter?.uuid || selectedFavoriteMeter?.length) {
            setModelOpen(false);
            setFavoriteMeter(null);
            removeSelectedFavoriteMeter();
            return;
          }
          setModelOpen(true);
        }}
        data-testid="ribbon-favorite-meter-model-button"
      >
        {selectedFavoriteMeter ||
          favoriteMeter?.name ||
          tLayout('topRibbon.favoriteMeterButton')}
        {favoriteMeter?.uuid || selectedFavoriteMeter?.length ? (
          <RiCloseCircleFill className="font-bold text-[16px]" />
        ) : (
          <FaArrowRight />
        )}
      </div>

      <CustomModal
        title={
          <span
            className="text-[2rem] font-bold text-rhino-indigo-blue my-0 leading-[1.47]"
            data-testid="ribbon-favorite-meter-header"
          >
            {t('favoriteMeterModel.mainHeader')}
          </span>
        }
        opened={modelOpen}
        onClose={() => {
          setModelOpen(!modelOpen);
          resetModal();
        }}
        size={'75%'}
      >
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
          emptyText="No results"
          onSortSelect={onSortClick}
          onFilterChange={onFilterChange}
          isLoading={isLoading}
        />
      </CustomModal>
    </div>
  );
};

export default FavoriteMeter;
