import { useLocalStorage } from '@rhino/utils';
import { MeasurementWithConfig } from 'apps/webapp/src/components/measurement/SelectMeasurement/types';
import { LOCAL_STORAGE_KEYS } from 'apps/webapp/src/constant/local-storage-keys';
import { useState } from 'react';
import { isValidCreateMeasurementDraft } from '../helper/measurementDraft';

export type CreateMeasurementDraft = {
  clientUuid: string | null;
  measurements: MeasurementWithConfig[];
};

type UseRestoredMeasurementsArgs = {
  preferLocalStorage?: boolean;
  currentClientUuid: string | null;
};

export const useRestoredMeasurements = ({
  preferLocalStorage = false,
  currentClientUuid,
}: UseRestoredMeasurementsArgs) => {
  const { save, load, clear } = useLocalStorage<
    CreateMeasurementDraft | MeasurementWithConfig[]
  >(LOCAL_STORAGE_KEYS.PERIODIC_ALARM.CREATE_MEASUREMENTS);

  const [restoredMeasurements] = useState<MeasurementWithConfig[]>(() => {
    if (!preferLocalStorage) {
      return [];
    }

    try {
      const storedData = load();
      if (!storedData) {
        return [];
      }

      if (Array.isArray(storedData)) {
        return storedData;
      }

      if (!isValidCreateMeasurementDraft<MeasurementWithConfig>(storedData)) {
        clear();
        return [];
      }

      if (
        currentClientUuid &&
        storedData.clientUuid &&
        storedData.clientUuid !== currentClientUuid
      ) {
        clear();
        return [];
      }

      return storedData.measurements;
    } catch {
      clear();
      return [];
    }
  });

  const saveMeasurementsDraft = (draft: CreateMeasurementDraft) => {
    save(draft);
  };

  const clearMeasurementsDraft = () => {
    clear();
  };

  return {
    restoredMeasurements,
    saveMeasurementsDraft,
    clearMeasurementsDraft,
  };
};
