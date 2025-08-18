import { Accordion, Button, Modal } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaPlusCircle } from 'react-icons/fa';
import MeasurementsWithActionsTable from '../MeasurementsWithActionsTable';
import SelectMeasurementModal from '../SelectMeasurementModal';
import { MeasurementWithConfig } from './types';

interface SelectMeasurementProps {
  onMeasurementsChange?: (measurements: MeasurementWithConfig[]) => void;
  minSelections?: number;
  selectionMode?: 'single' | 'multiple';
  showGlobalSettings?: boolean;
  defaultExpanded?: boolean;
  allowSameMeasurementMultipleTimes?: boolean;
  disabled?: boolean;
  disabledTitle?: string | null;
  customFilter?: {
    mediumType?: string;
  };
  initialMeasurements?: MeasurementWithConfig[];
  isReadOnly?: boolean;
}

export const SelectMeasurement = ({
  onMeasurementsChange,
  minSelections = 1,
  selectionMode = 'multiple',
  showGlobalSettings = false,
  defaultExpanded = true,
  allowSameMeasurementMultipleTimes = false,
  disabled = false,
  disabledTitle,
  customFilter,
  initialMeasurements = [],
  isReadOnly = false,
}: SelectMeasurementProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedMeasurements, setSelectedMeasurements] =
    useState<MeasurementWithConfig[]>(initialMeasurements);

  const { client } = useUserFilter();
  const prevClientRef = useRef(client);
  const prevCustomFilterRef = useRef(customFilter);
  const isInitialMount = useRef(true);
  const hasInitialMeasurementsBeenSet = useRef(false);

  const { t } = useTranslation('components');
  const baseRoute = 'measurement.selectMeasurement.';

  const handleClearAll = useCallback(() => {
    setSelectedMeasurements([]);
    onMeasurementsChange?.([]);
  }, [onMeasurementsChange]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevClientRef.current = client;
      prevCustomFilterRef.current = customFilter;
      return;
    }

    if (
      prevClientRef.current !== client ||
      prevCustomFilterRef.current?.mediumType !== customFilter?.mediumType ||
      disabled
    ) {
      handleClearAll();
    }
    prevClientRef.current = client;
    prevCustomFilterRef.current = customFilter;
  }, [
    client,
    customFilter?.mediumType,
    disabled,
    handleClearAll,
    customFilter,
  ]);

  useEffect(() => {
    if (
      initialMeasurements.length > 0 &&
      !hasInitialMeasurementsBeenSet.current
    ) {
      setSelectedMeasurements(initialMeasurements);
      onMeasurementsChange?.(initialMeasurements);
      hasInitialMeasurementsBeenSet.current = true;
    }
  }, [initialMeasurements, onMeasurementsChange]);

  const handleMeasurementSelect = (measurements: MeasurementWithConfig[]) => {
    if (allowSameMeasurementMultipleTimes) {
      const newMeasurements = [...selectedMeasurements, ...measurements];
      setSelectedMeasurements(newMeasurements);
      onMeasurementsChange?.(newMeasurements);
      return;
    }

    // if not allow same measurement multiple times, we need to check if the measurement is already selected
    // if it is, we need to remove it from the selected measurements and add the new measurement
    // if it is not, we need to add the new measurement to the selected measurements
    const currentSelectedMeasurementsMap = measurements.reduce(
      (acc, measurement) => {
        acc[measurement.measurement.uuid] = measurement;
        return acc;
      },
      {} as Record<string, MeasurementWithConfig>
    );
    const modifiedMeasurements = selectedMeasurements.map((measurement) => {
      const existingMeasurement =
        currentSelectedMeasurementsMap[measurement.measurement.uuid];
      if (existingMeasurement) {
        delete currentSelectedMeasurementsMap[measurement.measurement.uuid];
        return existingMeasurement;
      }
      return measurement;
    });
    const newMeasurements = [
      ...modifiedMeasurements,
      ...Object.values(currentSelectedMeasurementsMap),
    ];
    setSelectedMeasurements(newMeasurements);
    onMeasurementsChange?.(newMeasurements);
  };

  const handleRemoveMeasurement = (measurement: MeasurementWithConfig) => {
    const updatedMeasurements = selectedMeasurements.filter(
      (m) => m.config.selectionId !== measurement.config.selectionId
    );
    setSelectedMeasurements(updatedMeasurements);
    onMeasurementsChange?.(updatedMeasurements);
  };

  const getButtonText = () => {
    if (selectedMeasurements.length === 0) {
      return t(baseRoute + 'add');
    }
    return t(baseRoute + 'addMore');
  };

  return (
    <div className="flex flex-col">
      <Accordion
        defaultValue={defaultExpanded ? '1' : undefined}
        classNames={{
          control:
            'h-10 px-4 !border-t !border-l !border-r !border-black/[0.08] rounded-t-md rhino-text',
          item: 'border-none',
          content:
            '!border-l !border-r !border-l-black/[0.08] !border-r-black/[0.08]',
          panel: 'border-none',
        }}
      >
        <Accordion.Item value="1">
          <Accordion.Control>
            <div className="flex w-full justify-center items-center">
              <span>
                {t(baseRoute + 'title')} ( {selectedMeasurements.length} )
              </span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <MeasurementsWithActionsTable
              selectedMeasurements={selectedMeasurements}
              onRemoveMeasurement={handleRemoveMeasurement}
              onClearAll={
                selectedMeasurements.length > 1 ? handleClearAll : undefined
              }
              isReadOnly={isReadOnly}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {!isReadOnly && (
        <Button
          className={clsx(
            'w-full h-10 !bg-rhino-energy-green text-white !rounded-tl-none !rounded-tr-none rounded-br-md rounded-bl-none transition-all',
            {
              '!bg-rhino-grey/30 !text-white/80': disabled || !client,
            }
          )}
          onClick={() => setModalOpened(true)}
          leftSection={<FaPlusCircle className="mr-1" />}
          disabled={!client || disabled}
          title={
            !client
              ? t(baseRoute + 'selectClient')
              : disabledTitle || t(baseRoute + 'title')
          }
        >
          {getButtonText()}
        </Button>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={t(baseRoute + 'title')}
        size="80vw"
        classNames={{
          title: 'modal-title-custom',
          header: 'modal-header-custom',
        }}
      >
        <SelectMeasurementModal
          onClose={() => setModalOpened(false)}
          onSelect={handleMeasurementSelect}
          minSelections={minSelections}
          selectionMode={selectionMode}
          showGlobalSettings={showGlobalSettings}
          customFilter={customFilter}
        />
      </Modal>
    </div>
  );
};
