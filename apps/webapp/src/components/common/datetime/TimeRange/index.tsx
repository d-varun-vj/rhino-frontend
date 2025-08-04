import Label from '../../../typography/Label';
import QuestionCircle from '../../indicators/QuestionCircle';
import TimeField from '../TimeField';

interface TimeRangeProps {
  label?: string;
  guideContent?: string;
  onStartTimeChange: (val: string) => void;
  onEndTimeChange: (val: string) => void;
  selectedStartTime?: string;
  selectedEndTime?: string;
}

const TimeRange = ({
  label,
  guideContent,
  onStartTimeChange,
  onEndTimeChange,
  selectedStartTime,
  selectedEndTime,
}: TimeRangeProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label content={label} htmlFor={label.toLowerCase()} />}
      <div className="flex gap-3 items-center">
        <TimeField
          label="Start time"
          value={selectedStartTime}
          onChange={(val) => onStartTimeChange(val)}
        />
        <div>
          <Label content="to" />
        </div>
        <TimeField
          label="End time"
          value={selectedEndTime}
          onChange={(val) => onEndTimeChange(val)}
        />
        <QuestionCircle content={guideContent ?? ''} />
      </div>
    </div>
  );
};

export default TimeRange;
