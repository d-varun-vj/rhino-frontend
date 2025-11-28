import { ModalProps } from '@mantine/core';
import { SelectInput, useGetMeasurementInfo } from '@rhino/apis';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomLoader from '../../../common/Loader';
import CustomModal from '../../../common/modals/CustomModal';
import Table from '../../../common/Table';
import message from '../../../notifier';
import Heading from '../../../typography/Heading';
import SubTitle from '../../../typography/SubTitle';
import { getSign } from '../../helper';
import { MeasurementInfoActionProps } from '../types';

interface MeasurementInfoModalProps {
  modalProps: ModalProps;
  measurementUuid: string;
  dispatch: React.Dispatch<MeasurementInfoActionProps>;
}

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <Heading variant="xl" content={label + ':'} className="!py-0.5" />
    <SubTitle content={value} />
  </div>
);

const MeasurementInfoModal = ({
  modalProps,
  measurementUuid,
  dispatch,
}: MeasurementInfoModalProps) => {
  const { t } = useTranslation('components');
  const { t: tCommon } = useTranslation('common');
  const translationBaseRoute =
    'measurement.measurementsWithActionsTable.actions.info.modal.';

  const {
    data: measurementInfo,
    isError,
    isLoading,
  } = useGetMeasurementInfo({
    measurementUuid: measurementUuid,
  });

  const inputTableData = React.useMemo(
    () => measurementInfo?.inputs || [],
    [measurementInfo?.inputs]
  );

  const columns = React.useMemo<ColumnDef<SelectInput, unknown>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        header: t(translationBaseRoute + 'table.name'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.locationName,
        header: t(translationBaseRoute + 'table.location'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.groupName,
        header: t(translationBaseRoute + 'table.group'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.translatedMedium,
        header: t(translationBaseRoute + 'table.medium'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.serialNumber,
        header: t(translationBaseRoute + 'table.serialNumber'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.sign,
        header: t(translationBaseRoute + 'table.sign'),
        cell: (info) => getSign(info.getValue() as string),
      },
      {
        accessorFn: (row) => row.factor,
        header: t(translationBaseRoute + 'table.factor'),
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.client,
        header: t(translationBaseRoute + 'table.client'),
        cell: (info) => info.getValue(),
      },
    ],
    [t]
  );

  useEffect(() => {
    if (isError) {
      message.error(tCommon('toast.somethingWentWrong'));
      dispatch({ type: 'RESET' });
    }
  }, [isError, dispatch, tCommon]);

  return (
    <CustomModal
      {...modalProps}
      size={'75%'}
      title={t(translationBaseRoute + 'title')}
    >
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <div className="pl-2 flex flex-col gap-2">
            <InfoBlock
              label={t(translationBaseRoute + 'measurementName')}
              value={measurementInfo?.name || ''}
            />
            <InfoBlock
              label={t(translationBaseRoute + 'uuid')}
              value={measurementInfo?.uuid || ''}
            />
            <InfoBlock
              label={t(translationBaseRoute + 'comment')}
              value={measurementInfo?.comment || ''}
            />
          </div>
          <div className="my-5">
            <Table columns={columns} data={inputTableData} variant="minimal" />
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default MeasurementInfoModal;
