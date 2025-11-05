import { Accordion, AccordionItemProps } from '@mantine/core';
import { ReactElement, ReactNode } from 'react';

type CustomAccordionProps = {
  header: ReactElement;
  itemProps: AccordionItemProps;
  children: ReactNode;
  chevronIconSize?: number;
};

const CustomAccordion = ({
  header,
  itemProps,
  children,
  chevronIconSize,
}: CustomAccordionProps) => {
  return (
    <Accordion
      styles={{
        control: {
          paddingInline: 0,
        },
        content: {
          padding: 0,
        },
        chevron: {
          color: 'var(--color-rhino-indigo-blue)',
        },
      }}
      variant="unstyled"
      radius="xs"
      chevronIconSize={chevronIconSize ?? 20}
    >
      <Accordion.Item {...itemProps}>
        <Accordion.Control>{header}</Accordion.Control>
        <Accordion.Panel>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default CustomAccordion;
