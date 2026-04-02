import { Loader, LoaderProps } from '@mantine/core';

const CustomLoader = (props: LoaderProps) => {
  return (
    <div className="min-h-[300px] flex justify-center items-center">
      <div className="text-[13px] text-rhino-indigo-blue">
        <Loader color="var(--color-rhino-indigo-blue)" size={'sm'} {...props} />
      </div>
    </div>
  );
};

export default CustomLoader;
