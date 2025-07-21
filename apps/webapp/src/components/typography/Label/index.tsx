type LabelProps = React.ComponentProps<'label'> & {
  content: string;
  required?: boolean;
};
const Label = ({ content: label, required = false, ...props }: LabelProps) => {
  return (
    <label className="text-[.9rem] font-bold text-[#91A0B1] " {...props}>
      {label} <span className="text-red-600">{required && '*'}</span>
    </label>
  );
};

export default Label;
