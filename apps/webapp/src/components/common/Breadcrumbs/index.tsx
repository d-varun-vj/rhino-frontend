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

const LONG_TITLE_THRESHOLD = 24;

const CustomBreadcrumbs = ({
  items,
  onItemClick,
  ...props
}: CustomBreadcrumbsProps) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <Breadcrumbs
      separator=">"
      classNames={{
        root: 'min-w-0 overflow-hidden',
      }}
      {...props}
    >
      {items.map((item, index) => {
        const { disabled = true } = item;
        const popoverItems =
          item.popoverData && item.popoverData.length > 0
            ? item.popoverData
            : item.title
              ? [item.title]
              : [];
        const isLongTitle = (item.title?.length ?? 0) > LONG_TITLE_THRESHOLD;
        const shouldShowPopover = popoverItems.length > 1 || isLongTitle;

        return (
          <Popover
            key={index}
            position="bottom-start"
            withArrow
            shadow="md"
            withinPortal
            opened={hoveredKey === item.key && shouldShowPopover}
          >
            <Popover.Target>
              <Anchor
                href={item.path}
                className={clsx(
                  '!text-[14px] inline-flex items-center gap-1 min-w-0 max-w-[140px] md:max-w-[200px] lg:max-w-[260px] overflow-hidden',
                  {
                    '!text-rhino-grey !cursor-not-allowed': disabled,
                    '!text-rhino-indigo-blue': !disabled,
                  }
                )}
                underline="never"
                {...(!disabled &&
                  onItemClick && {
                    onClick: () => onItemClick(item.key),
                  })}
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {item.icon ? (
                  <item.icon className="w-4 h-3.5 shrink-0" />
                ) : null}
                {item.title ? (
                  <span className="min-w-0 block flex-1 truncate">
                    {item.title}
                  </span>
                ) : null}
              </Anchor>
            </Popover.Target>
            {shouldShowPopover && (
              <Popover.Dropdown
                className="max-w-[650px] break-words whitespace-normal"
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="max-h-64 overflow-y-auto custom-thin-scrollbar pr-3 cursor-pointer">
                  <div
                    className={`grid ${popoverItems.length > 10 ? 'grid-cols-4' : 'grid-cols-2'} gap-x-3 gap-y-2`}
                  >
                    {popoverItems.map((data) => (
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
