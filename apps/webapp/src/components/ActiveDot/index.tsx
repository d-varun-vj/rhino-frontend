import clsx from 'clsx';

interface Active {
  type: 'active' | 'inactive';
}

const ActiveDot = ({ type }: Active) => {
  return (
    <span
      className={clsx('block w-3 h-3 rounded-full ', {
        'bg-green-600': type == 'active',
        'bg-yellow-500': type == 'inactive',
      })}
    ></span>
  );
};

export default ActiveDot;
