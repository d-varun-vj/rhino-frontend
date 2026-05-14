import ProgressBar, { ProgressBarProps } from '@ramonak/react-progress-bar';

const CustomProgressBar = (props: ProgressBarProps) => {
  const completed = Number(props.completed ?? 0);

  const safeCompleted = Number.isFinite(completed) ? completed : 0;

  return (
    <div className="relative w-full">
      <ProgressBar
        baseBgColor="var(--color-grey-light)"
        isLabelVisible={false}
        height="24px"
        {...props}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-end px-2">
          <span
            className="text-xs font-bold text-white tracking-wider whitespace-nowrap "
            style={{ textShadow: '0px 1px 3px rgba(0,0,0,1)' }}
          >
            {safeCompleted.toLocaleString().replace(/,/g, '.')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomProgressBar;
