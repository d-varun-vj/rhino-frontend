import { useLocalStorage } from '@rhino/utils';
import { MeasurementWithConfig } from 'apps/webapp/src/components/measurement/SelectMeasurement/types';
import { LOCAL_STORAGE_KEYS } from 'apps/webapp/src/constant/local-storage-keys';
import { useEffect, useState } from 'react';
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

  const [restoredMeasurements, setRestoredMeasurements] = useState<
    MeasurementWithConfig[]
  >([]);

  useEffect(() => {
    if (!preferLocalStorage) {
      setRestoredMeasurements([]);
      return;
    }

    try {
      const storedData = load();
      if (!storedData) {
        setRestoredMeasurements([]);
        return;
      }

      if (Array.isArray(storedData)) {
        setRestoredMeasurements(storedData);
        return;
      }

      if (!isValidCreateMeasurementDraft<MeasurementWithConfig>(storedData)) {
        clear();
        setRestoredMeasurements([]);
        return;
      }

      const storedClientUuid = storedData.clientUuid;
      const isDifferentClient =
        !!currentClientUuid && storedClientUuid !== currentClientUuid;

      if (isDifferentClient) {
        clear();
        setRestoredMeasurements([]);
        return;
      }

      setRestoredMeasurements(storedData.measurements);
    } catch {
      clear();
      setRestoredMeasurements([]);
    }
  }, [preferLocalStorage, currentClientUuid, load, clear]);

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
