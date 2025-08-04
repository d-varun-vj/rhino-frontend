import clsx from 'clsx';

export type LabelProps = React.ComponentProps<'label'> & {
  content: string;
  required?: boolean;
};
const Label = ({
  content: label,
  className,
  required = false,
  ...props
}: LabelProps) => {
  return (
    <label
      className={clsx('text-[.9rem] font-bold text-[#91A0B1] w-fit', className)}
      {...props}
    >
      {label} <span className="text-red-600">{required && '*'}</span>
    </label>
  );
};

export default Label;
