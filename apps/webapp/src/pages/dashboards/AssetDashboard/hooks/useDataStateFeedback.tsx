import CustomLoader from 'apps/webapp/src/components/common/Loader';
import SubTitle from 'apps/webapp/src/components/typography/SubTitle';
import React from 'react';

export interface UseDataStateFeedbackProps {
  isPending?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  loaderType?: 'bars' | 'dots' | 'oval';
}

const useDataStateFeedback = ({
  isPending,
  isError,
  isEmpty,
  emptyMessage,
  errorMessage,
  loaderType = 'bars',
}: UseDataStateFeedbackProps): React.ReactNode | null => {
  if (isPending) {
    return <CustomLoader type={loaderType} />;
  }

  if (isError) {
    return <SubTitle content={errorMessage || ''} className="ml-5 mt-10" />;
  }

  if (isEmpty) {
    return <SubTitle content={emptyMessage ?? ''} className="ml-5 mt-10" />;
  }

  return null;
};

export default useDataStateFeedback;
