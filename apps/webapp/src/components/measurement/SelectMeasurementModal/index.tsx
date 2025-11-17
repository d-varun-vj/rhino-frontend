import {
  CustomFilter,
  MeasurementConfig,
  MeasurementWithConfig,
} from '../SelectMeasurement/types';

import { MeasurementType } from '@rhino/apis';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '../../common/buttons/IconButton';
import MeasurementsWithPaginationTable from '../MeasurementsWithPaginationTable';

interface SelectMeasurementModalProps {
  onClose: () => void;
  onSelect: (measurements: MeasurementWithConfig[]) => void;
  minSelections?: number;
  selectionMode?: 'single' | 'multiple';
  showGlobalSettings?: boolean;
  customFilter?: CustomFilter;
  initialSelectedMeasurements?: MeasurementType[];
}

const SelectMeasurementModal = ({
  onClose,
  onSelect,
  minSelections = 1,
  selectionMode = 'multiple',
  showGlobalSettings = true,
  customFilter,
  initialSelectedMeasurements = [],
}: SelectMeasurementModalProps) => {
  const [selectedMeasurements, setSelectedMeasurements] = useState<
    MeasurementType[]
  >(initialSelectedMeasurements);
  const [selectionError, setSelectionError] = useState<string>('');
  const { t } = useTranslation('components');
  const translationBaseRoute = 'measurement.selectMeasurementModal.';

  useEffect(() => {
    setSelectedMeasurements(initialSelectedMeasurements);
    setSelectionError('');
  }, [initialSelectedMeasurements]);

  const handleSelectionChange = (measurements: MeasurementType[]) => {
    setSelectedMeasurements(measurements);
    setSelectionError('');
  };

  const handleChoose = () => {
    // Validate minimum selections
    if (selectedMeasurements.length < minSelections) {
      setSelectionError(
        `Please select at least ${minSelections} measurement(s)`
      );
      return;
    }

    onSelect(
      selectedMeasurements.map(
        (m) =>
          ({
            measurement: m,
            config: {
              startDate: null,
              endDate: null,
              selectionId: new Date().toISOString() + m.uuid,
            } as MeasurementConfig,
          }) as MeasurementWithConfig
      )
    );
    onClose();
  };

  const isChooseDisabled = () => {
    return selectedMeasurements.length < minSelections;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-hidden">
          <MeasurementsWithPaginationTable
            selectionMode={selectionMode}
            onSelectionChange={handleSelectionChange}
            customFilter={customFilter}
            selectedMeasurements={selectedMeasurements}
          />
        </div>

        {/* Future: Global Settings Section */}
        {showGlobalSettings && (
          <div className="p-5 border-t border-gray-200 flex-shrink-0">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Global Settings
            </h3>
            {/* Future: Date range picker, other global settings */}
            <div className="text-sm text-gray-500">
              Date range and other settings will be implemented here
            </div>
          </div>
        )}

        {selectionError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 mx-5 flex-shrink-0">
            {selectionError}
          </div>
        )}
      </div>

      <div className="flex justify-end items-center p-5 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="flex gap-3">
          <IconButton action={onClose} type="secondary">
            <p className="text-sm font-semibold">
              {t(translationBaseRoute + 'cancel')}
            </p>
          </IconButton>
          <IconButton
            action={handleChoose}
            disabled={Boolean(isChooseDisabled())}
            type="primary"
          >
            <p className="text-sm font-semibold">
              {t(translationBaseRoute + 'choose', {
                count: selectedMeasurements.length,
              })}
            </p>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SelectMeasurementModal;
