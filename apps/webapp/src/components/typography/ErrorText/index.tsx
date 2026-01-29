const ErrorText = ({
  content,
  dataTestIdPrefix,
}: {
  content: string;
  dataTestIdPrefix?: string;
}) => {
  return (
    <span
      className="text-xs text-red-500"
      data-testid={`${dataTestIdPrefix}-error`}
    >
      {content}
    </span>
  );
};

export default ErrorText;
