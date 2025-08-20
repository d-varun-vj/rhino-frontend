import CustomButton from 'apps/webapp/src/components/common/buttons/CustomButton';
import { SelectMeasurement } from 'apps/webapp/src/components/measurement/SelectMeasurement';
import { MeasurementWithConfig } from 'apps/webapp/src/components/measurement/SelectMeasurement/types';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import { locations } from 'apps/webapp/src/routes/locations';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { tFormBase } from '../../config';
import { PeriodicAlarmSchema } from '../../validation';

interface FormFooterProps {
  selectedMediumTypeMappId: number | null;
  isPending: boolean;
  initialMeasurements?: MeasurementWithConfig[];
  isReadOnly?: boolean;
}

const FormFooter = ({
  selectedMediumTypeMappId,
  isPending,
  initialMeasurements,
  isReadOnly = false,
}: FormFooterProps) => {
  const { setValue } = useFormContext<PeriodicAlarmSchema>();
  const { t } = useTranslation('periodicAlarm');
  const navigate = useNavigate();
  const { client, location, group } = useUserFilter();

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
          disabled={!selectedMediumTypeMappId}
          disabledTitle={
            !selectedMediumTypeMappId ? t(tFormBase + 'emptyMediumType') : null
          }
          customFilter={{
            mediumMappId: selectedMediumTypeMappId,
          }}
          initialMeasurements={initialMeasurements}
          isReadOnly={isReadOnly}
        />
      </div>

      {!isReadOnly && (
        <div className="flex gap-2 justify-end mt-10">
          <CustomButton
            text={t(tFormBase + 'action.cancel')}
            type="default"
            icon={<RxCross2 />}
            disabled={isReadOnly}
            onClick={() =>
              navigate(
                locations.alarm.periodic.base +
                  getRibbonParams({
                    client: client,
                    location: location,
                    group: group,
                  }),
                { replace: false }
              )
            }
          />
          <CustomButton
            text={t(tFormBase + 'action.save')}
            btnType="submit"
            icon={<FaPlus />}
            loading={isPending}
          />
        </div>
      )}
    </>
  );
};

export default FormFooter;
