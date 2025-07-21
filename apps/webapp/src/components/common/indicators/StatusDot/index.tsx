import clsx from 'clsx';

interface Status {
  type: 'active' | 'inactive';
}

const StatusDot = ({ type }: Status) => {
  return (
    <span
      className={clsx('block w-3 h-3 rounded-full ', {
        'bg-green-600': type == 'active',
        'bg-yellow-500': type == 'inactive',
      })}
    ></span>
  );
};

export default StatusDot;
