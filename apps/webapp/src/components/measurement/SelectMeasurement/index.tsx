import { Accordion, Button } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';

import { swapArrayElements } from '@rhino/utils/common';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaPlusCircle } from 'react-icons/fa';
import CustomModal from '../../common/modals/CustomModal';
import message from '../../notifier';
import MeasurementsWithActionsTable from '../MeasurementsWithActionsTable';
import SelectMeasurementModal from '../SelectMeasurementModal';
import { CustomFilter, MeasurementWithConfig, SortArrow } from './types';

interface SelectMeasurementProps {
  onMeasurementsChange?: (measurements: MeasurementWithConfig[]) => void;
  minSelections?: number;
  selectionMode?: 'single' | 'multiple';
  showGlobalSettings?: boolean;
  defaultExpanded?: boolean;
  allowSameMeasurementMultipleTimes?: boolean;
  disabled?: boolean;
  disabledTitle?: string | null;
  customFilter?: CustomFilter;
  initialMeasurements?: MeasurementWithConfig[];
  isReadOnly?: boolean;
  enableCustomSort?: boolean;
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
  enableCustomSort = false,
}: SelectMeasurementProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedMeasurements, setSelectedMeasurements] = useState<
    MeasurementWithConfig[]
  >([]);

  const currentSelectedMeasurements = selectedMeasurements.map(
    (m) => m.measurement
  );

  const { clients } = useUserFilter();
  const prevClientRef = useRef(clients);
  const prevCustomFilterRef = useRef(customFilter);
  const hasInitialMeasurementsBeenSet = useRef(false);
  const isInitializingRef = useRef(false);
  const filterJustChangedRef = useRef(false);
  const prevInitialMeasurementsRef = useRef(initialMeasurements);

  const { t } = useTranslation('components');
  const baseRoute = 'measurement.selectMeasurement.';

  const handleClearAll = useCallback(() => {
    if (isInitializingRef.current) return;

    setSelectedMeasurements([]);
    onMeasurementsChange?.([]);
  }, [onMeasurementsChange]);

  useEffect(() => {
    const filterChanged =
      prevCustomFilterRef.current?.mediumMappId !== customFilter?.mediumMappId;

    if (filterChanged && prevCustomFilterRef.current !== undefined) {
      setSelectedMeasurements([]);
      onMeasurementsChange?.([]);
      hasInitialMeasurementsBeenSet.current = false;
      filterJustChangedRef.current = true;

      setTimeout(() => {
        filterJustChangedRef.current = false;
      }, 0);
    }

    prevCustomFilterRef.current = customFilter;
  }, [customFilter, onMeasurementsChange]);

  useEffect(() => {
    const clientChanged = prevClientRef.current !== clients;

    if ((clientChanged || disabled) && !isInitializingRef.current) {
      handleClearAll();
      hasInitialMeasurementsBeenSet.current = false;
    }

    prevClientRef.current = clients;
  }, [clients, disabled, handleClearAll]);

  useEffect(() => {
    const measurementsChanged =
      prevInitialMeasurementsRef.current !== initialMeasurements ||
      prevInitialMeasurementsRef.current.length !==
        initialMeasurements.length ||
      prevInitialMeasurementsRef.current.some(
        (prev, index) =>
          prev.measurement.uuid !== initialMeasurements[index]?.measurement.uuid
      );

    if (
      initialMeasurements.length > 0 &&
      (!hasInitialMeasurementsBeenSet.current || measurementsChanged) &&
      !isInitializingRef.current &&
      !filterJustChangedRef.current
    ) {
      isInitializingRef.current = true;

      requestAnimationFrame(() => {
        setSelectedMeasurements(initialMeasurements);
        onMeasurementsChange?.(initialMeasurements);
        hasInitialMeasurementsBeenSet.current = true;
        prevInitialMeasurementsRef.current = initialMeasurements;
        isInitializingRef.current = false;
      });
    }
  }, [initialMeasurements, onMeasurementsChange]);

  const handleMeasurementSelect = (measurements: MeasurementWithConfig[]) => {
    if (isInitializingRef.current) return;

    if (allowSameMeasurementMultipleTimes) {
      const newMeasurements = [...selectedMeasurements, ...measurements];
      setSelectedMeasurements(newMeasurements);
      onMeasurementsChange?.(newMeasurements);
      return;
    }

    const existingMeasurements = new Map(
      selectedMeasurements.map((m) => [m.measurement.uuid, m] as const)
    );

    const updatedMeasurements = measurements.map(
      (m) => existingMeasurements.get(m.measurement.uuid) ?? m
    );

    setSelectedMeasurements(updatedMeasurements);
    onMeasurementsChange?.(updatedMeasurements);
  };

  const handleRemoveMeasurement = (measurement: MeasurementWithConfig) => {
    if (isInitializingRef.current) return;

    const updatedMeasurements = selectedMeasurements.filter(
      (m) => m.config.selectionId !== measurement.config.selectionId
    );

    setSelectedMeasurements(updatedMeasurements);
    onMeasurementsChange?.(updatedMeasurements);
  };

  const handleCustomSortMove = useCallback(
    (rowIndex: number, direction: SortArrow) => {
      const swapIndex = direction === 'up' ? rowIndex - 1 : rowIndex + 1;
      const isInvalidMove =
        swapIndex < 0 || swapIndex >= selectedMeasurements.length;

      if (isInvalidMove) {
        return;
      }

      const newMeasurements = [...selectedMeasurements];

      swapArrayElements(newMeasurements, rowIndex, swapIndex);

      setSelectedMeasurements(newMeasurements);
      onMeasurementsChange?.(newMeasurements);
    },
    [selectedMeasurements, onMeasurementsChange]
  );

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
              enableCustomSort={enableCustomSort}
              onCustomSortMove={handleCustomSortMove}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {!isReadOnly && (
        <Button
          className={clsx(
            'w-full h-10 !bg-rhino-energy-green text-white !rounded-tl-none !rounded-tr-none rounded-br-md rounded-bl-none transition-all',
            {
              '!bg-rhino-grey/30 !text-white/80': disabled,
            }
          )}
          onClick={() => {
            if (!clients) {
              message.warn(t(baseRoute + 'selectClient'));
              return;
            }

            setModalOpened(true);
          }}
          leftSection={<FaPlusCircle className="mr-1" />}
          disabled={disabled}
          title={disabledTitle || t(baseRoute + 'title')}
          data-testid="add-measurement-btn"
        >
          {getButtonText()}
        </Button>
      )}

      <CustomModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={t(baseRoute + 'title')}
        size="80vw"
      >
        <SelectMeasurementModal
          onClose={() => setModalOpened(false)}
          onSelect={handleMeasurementSelect}
          minSelections={minSelections}
          selectionMode={selectionMode}
          showGlobalSettings={showGlobalSettings}
          customFilter={customFilter}
          initialSelectedMeasurements={currentSelectedMeasurements}
          dataTestid="select-measurement-modal"
        />
      </CustomModal>
    </div>
  );
};
