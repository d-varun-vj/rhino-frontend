import CustomButton from 'apps/webapp/src/components/common/buttons/CustomButton';
import { SelectMeasurement } from 'apps/webapp/src/components/measurement/SelectMeasurement';
import { MeasurementWithConfig } from 'apps/webapp/src/components/measurement/SelectMeasurement/types';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
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
  isReadOnly?: boolean;
}

const FormFooter = ({
  isPending,
  initialMeasurements,
  isReadOnly = false,
}: FormFooterProps) => {
  const { watch, setValue } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');
  const navigate = useNavigate();
  const { clients, locations, groups } = useUserFilter();
  const selectedSortOder = watch('sortOrder');
  const enableCustomSort = selectedSortOder === MeasurementSortOrder.CUSTOM;

  return (
    <>
      <div id="select-measurement">
        <SelectMeasurement
          onMeasurementsChange={(measurements) =>
            setValue(
              'measurementUuids',
              measurements.map(
                (measurementWithConfig) =>
                  measurementWithConfig.measurement.uuid
              )
            )
          }
          minSelections={1}
          selectionMode="multiple"
          allowSameMeasurementMultipleTimes={false}
          initialMeasurements={initialMeasurements}
          isReadOnly={isReadOnly}
          enableCustomSort={enableCustomSort}
        />
      </div>

      <div className="flex gap-2 justify-end mt-10">
        <CustomButton
          text={t(tFormBase + 'action.cancel')}
          type="default"
          icon={<RxCross2 />}
          onClick={() =>
            navigate(
              paths.alarm.periodic.base +
                getRibbonParams({
                  clients,
                  locations,
                  groups,
                }),
              { replace: false }
            )
          }
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
