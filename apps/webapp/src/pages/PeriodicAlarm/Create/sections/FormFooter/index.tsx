import CustomButton from 'apps/webapp/src/components/common/buttons/CustomButton';
import { SelectMeasurement } from 'apps/webapp/src/components/measurement/SelectMeasurement';
import { MeasurementWithConfig } from 'apps/webapp/src/components/measurement/SelectMeasurement/types';
import message from 'apps/webapp/src/components/notifier';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import {
  CreateMeasurementDraft,
  useRestoredMeasurements,
} from 'apps/webapp/src/pages/PeriodicAlarm/hooks';
import { paths } from 'apps/webapp/src/routes/paths';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { MeasurementSortOrder } from '../../../types';
import { tFormBase } from '../../config';
import { PeriodicAlarmSchema } from '../../validation';

interface FormFooterProps {
  isPending: boolean;
  initialMeasurements?: MeasurementWithConfig[];
  rawMeasurements?: MeasurementWithConfig[];
  isReadOnly?: boolean;
  preferLocalStorage?: boolean;
  onReset?: () => void;
  resetMeasurements?: MeasurementWithConfig[] | null;
  onMeasurementsChange?: (measurements: MeasurementWithConfig[]) => void;
  onCancel?: () => void;
}

const FormFooter = ({
  isPending,
  initialMeasurements,
  rawMeasurements,
  isReadOnly = false,
  preferLocalStorage = false,
  onReset,
  resetMeasurements,
  onMeasurementsChange,
  onCancel,
}: FormFooterProps) => {
  const { watch, setValue } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const { clients, locations, groups } = useUserFilter();
  const selectedSortOder = watch('sortOrder');
  const enableCustomSort = selectedSortOder === MeasurementSortOrder.CUSTOM;
  const currentClientUuid = clients?.[0]?.uuid ?? null;
  const {
    restoredMeasurements,
    saveMeasurementsDraft,
    clearMeasurementsDraft,
  } = useRestoredMeasurements({
    preferLocalStorage,
    currentClientUuid,
  });

  const effectiveMeasurements =
    resetMeasurements ??
    (preferLocalStorage && restoredMeasurements.length > 0
      ? restoredMeasurements
      : initialMeasurements ?? restoredMeasurements);

  const handleNavigateAway = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    clearMeasurementsDraft();
    navigate(
      paths.alarm.periodic.base +
        getRibbonParams({ clients, locations, groups }),
      { replace: false }
    );
  };

  const handleMeasurementsChange = (measurements: MeasurementWithConfig[]) => {
    const uuids = measurements.map((m) => m.measurement.uuid);
    setValue('measurementUuids', uuids);

    if (onMeasurementsChange) {
      onMeasurementsChange(measurements);
      return;
    }

    try {
      if (measurements.length > 0) {
        const draft: CreateMeasurementDraft = {
          clientUuid: currentClientUuid,
          measurements,
        };
        saveMeasurementsDraft(draft);
      } else {
        clearMeasurementsDraft();
      }
    } catch (error) {
      console.error(
        '[PeriodicAlarm/FormFooter] Failed to save measurement draft to local storage',
        error
      );
      message.error(tCommon('toast.somethingWentWrong'));
    }
  };

  return (
    <>
      <div id="select-measurement">
        <SelectMeasurement
          onMeasurementsChange={handleMeasurementsChange}
          minSelections={1}
          selectionMode="multiple"
          allowSameMeasurementMultipleTimes={false}
          initialMeasurements={effectiveMeasurements}
          rawMeasurements={rawMeasurements ?? initialMeasurements ?? []}
          isReadOnly={isReadOnly}
          enableCustomSort={enableCustomSort}
          onReset={onReset}
        />
      </div>

      <div className="flex gap-2 justify-end mt-10">
        <CustomButton
          text={t(tFormBase + 'action.cancel')}
          type="default"
          icon={<RxCross2 />}
          onClick={handleNavigateAway}
          data-testid="cancel-btn"
        />
        <CustomButton
          text={t(tFormBase + 'action.save')}
          btnType="submit"
          icon={<FaPlus />}
          disabled={isReadOnly}
          loading={isPending}
          data-testid="save-btn"
        />
      </div>
    </>
  );
};

export default FormFooter;
