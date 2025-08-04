import { useState } from 'react';
import { SelectMeasurement } from '../../components/measurement/SelectMeasurement';
import { MeasurementWithConfig } from '../../components/measurement/SelectMeasurement/types';
import PageTitle from '../../components/typography/PageTitle';
import MainLayout from '../../layouts/MainLayout';

const Consumption = () => {
  const [selectedMeasurements, setSelectedMeasurements] = useState<
    MeasurementWithConfig[]
  >([]);

  const handleMeasurementsChange = (measurements: MeasurementWithConfig[]) => {
    setSelectedMeasurements(measurements);
    // Future: Update charts, perform calculations, etc.
    console.log('Selected measurements updated:', measurements);
  };

  return (
    <MainLayout title="Consumption">
      <PageTitle title="Consumption" />
      <div className="space-y-6 mt-5">
        <SelectMeasurement
          onMeasurementsChange={handleMeasurementsChange}
          minSelections={1}
          selectionMode="multiple"
          allowSameMeasurementMultipleTimes={true}
        />

        {/* Future: Charts and other consumption-related components */}
        {selectedMeasurements.length > 0 && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Selected Measurements Summary
            </h3>
            <p className="text-blue-700">
              {selectedMeasurements.length} measurement(s) selected for
              consumption analysis.
            </p>
            <div className="mt-4 space-y-2">
              {selectedMeasurements.map((measurementConfig) => (
                <div
                  key={measurementConfig.measurement.uuid}
                  className="text-sm text-blue-600 bg-white px-3 py-2 rounded border"
                >
                  <strong>{measurementConfig.measurement.displayName}</strong>
                  {measurementConfig.measurement.locationName && (
                    <span className="ml-2 text-gray-500">
                      ({measurementConfig.measurement.locationName})
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Future: Add charts, consumption analysis, etc. */}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Consumption;
