import Heading from 'apps/webapp/src/components/typography/Heading';
import clsx from 'clsx';
import { ReactNode } from 'react';

const SectionWrapper = ({
  title,
  children,
  className,
  id,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  id: string;
}) => {
  return (
    <div
      className={clsx('flex gap-5 flex-col', className)}
      id={id}
      data-testid={id}
    >
      <Heading content={title} />
      {children}
    </div>
  );
};

export default SectionWrapper;
