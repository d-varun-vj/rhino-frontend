import { Anchor, Breadcrumbs, BreadcrumbsProps, Popover } from '@mantine/core';
import clsx from 'clsx';
import { useState } from 'react';
import { IconType } from 'react-icons/lib';

export type BreadcrumbsItem = {
  key: string;
  icon?: IconType;
  title?: string;
  path?: string;
  disabled?: boolean;
  popoverData?: string[];
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
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <Breadcrumbs separator=">" {...props}>
      {items.map((item, index) => {
        const { disabled = true } = item;
        return (
          <Popover
            key={index}
            position="bottom-start"
            withArrow
            shadow="md"
            withinPortal
            opened={hoveredKey === item.key}
          >
            <Popover.Target>
              <Anchor
                href={item.path}
                className={clsx('!text-[14px]', {
                  '!text-rhino-grey !cursor-not-allowed': disabled,
                  '!text-rhino-indigo-blue': !disabled,
                })}
                underline="never"
                {...(!disabled &&
                  onItemClick && {
                    onClick: () => onItemClick(item.key),
                  })}
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {item.icon ? <item.icon className="w-4 h-3.5" /> : null}
                {item.title}
              </Anchor>
            </Popover.Target>
            {item.popoverData && item.popoverData.length > 1 && (
              <Popover.Dropdown
                className="max-w-[650px] break-words whitespace-normal"
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="max-h-64 overflow-y-auto custom-thin-scrollbar pr-3 cursor-pointer">
                  <div
                    className={`grid ${item.popoverData.length > 10 ? 'grid-cols-4' : 'grid-cols-2'} gap-x-3 gap-y-2`}
                  >
                    {item.popoverData.map((data) => (
                      <p key={data} className="text-rhino-grey text-xs">
                        {data}
                      </p>
                    ))}
                  </div>
                </div>
              </Popover.Dropdown>
            )}
          </Popover>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
