import { Anchor, Breadcrumbs, BreadcrumbsProps } from '@mantine/core';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';

export type BreadcrumbsItem = {
  key: string;
  icon?: IconType;
  title?: string;
  path?: string;
  disabled?: boolean;
};

export type CustomBreadcrumbsProps = {
  items: BreadcrumbsItem[];
  onItemClick?: (key: string) => void;
} & Omit<BreadcrumbsProps, 'children'>;

const CustomBreadcrumbs = ({
  items,
  onItemClick,
  ...props
}: CustomBreadcrumbsProps) => {
  return (
    <Breadcrumbs separator=">" {...props}>
      {items.map((item, index) => {
        const { disabled = true } = item;
        return (
          <Anchor
            href={item.path}
            key={index}
            className={clsx('!text-[14px]', {
              '!text-rhino-grey !cursor-not-allowed': disabled,
              '!text-rhino-indigo-blue': !disabled,
            })}
            underline="never"
            {...(!disabled &&
              onItemClick && {
                onClick: () => onItemClick(item.key),
              })}
          >
            {item.icon ? <item.icon className="w-4 h-3.5" /> : null}
            {item.title}
          </Anchor>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
