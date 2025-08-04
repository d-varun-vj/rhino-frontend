import CustomButton from 'apps/webapp/src/components/common/buttons/CustomButton';
import { SelectMeasurement } from 'apps/webapp/src/components/measurement/SelectMeasurement';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { getRibbonParams } from 'apps/webapp/src/helpers/topribbon';
import { locations } from 'apps/webapp/src/routes/locations';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { RHFInputProps } from '../../../types';
import { tFormBase } from '../../config';

const FormFooter = ({
  setValue,
  selectedMediumType,
  isPending,
}: RHFInputProps & {
  selectedMediumType: string | null;
  isPending: boolean;
}) => {
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
          disabled={!selectedMediumType}
          disabledTitle={
            !selectedMediumType ? t(tFormBase + 'emptyMediumType') : null
          }
          customFilter={{ mediumType: selectedMediumType ?? '' }}
        />
      </div>

      <div className="flex gap-2 justify-end mt-10">
        <CustomButton
          text={t(tFormBase + 'action.cancel')}
          type="default"
          icon={<RxCross2 />}
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
    </>
  );
};

export default FormFooter;
