import { Loader } from '@mantine/core';

const CustomLoader = () => {
  return (
    <div className="min-h-[300px] flex justify-center items-center">
      <div className="text-[13px] text-rhino-indigo-blue">
        <Loader color="var(--color-rhino-indigo-blue)" size={'sm'} />
      </div>
    </div>
  );
};

export default CustomLoader;
