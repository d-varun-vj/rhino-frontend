import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import { useEffect, useState } from 'react';

import ErrorText from '../../../typography/ErrorText';
import Label from '../../../typography/Label';
import classes from './floatingSelector.module.css';

export type Item = {
  label: string;
  id: string | number; // Should be unique
  disabled?: boolean;
};

type FloatingSelectorProps<TMultiple extends boolean = false> = {
  label?: string;
  error?: string;
  data: Item[];
  multipleSelect?: TMultiple;
  required?: boolean;
  isReadOnly?: boolean;
} & (TMultiple extends true
  ? {
      onSelect: (val: string[]) => void;
      selectedValue?: Item[];
    }
  : {
      onSelect: (val: string) => void;
      selectedValue?: Item;
    });

const FloatingSelector = <T extends boolean = false>({
  label,
  error,
  data,
  selectedValue,
  onSelect,
  required,
  multipleSelect,
  isReadOnly = false,
}: FloatingSelectorProps<T>) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(0);
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  useEffect(() => {
    if (multipleSelect) {
      if (Array.isArray(selectedValue)) {
        setSelectedItems(selectedValue.map((item: Item) => item.id));
        return;
      }

      if (selectedValue) {
        setSelectedItems([selectedValue.id]);
        return;
      }

      setSelectedItems([]);
      return;
    }

    if (selectedValue && !Array.isArray(selectedValue)) {
      const selectedIndex = data.findIndex(
        (val) => selectedValue.id === val.id
      );
      setActive(selectedIndex !== -1 ? selectedIndex : 0);
      return;
    }

    const firstEnabledIndex = data.findIndex(
      (item) => !(item.disabled ?? false)
    );
    setActive(firstEnabledIndex !== -1 ? firstEnabledIndex : 0);
  }, [data, selectedValue, multipleSelect]);

  const handleItemClick = (item: Item, index: number) => {
    if (multipleSelect) {
      const newSelectedItems = selectedItems.includes(item.id)
        ? selectedItems.filter((label) => label !== item.id)
        : [...selectedItems, item.id];

      setSelectedItems(newSelectedItems);
      (onSelect as (val: (string | number)[]) => void)(newSelectedItems);
      return;
    }

    setActive(index);
    (onSelect as (val: string | number) => void)(item.id);
  };

  const isItemSelected = (item: Item, index: number) => {
    if (multipleSelect) {
      return selectedItems.includes(item.id);
    }
    return active === index;
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={`${item.id} + ${index}`}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => handleItemClick(item, index)}
      mod={{ active: isItemSelected(item, index) }}
      disabled={(item.disabled ?? false) || isReadOnly}
    >
      <span className={classes.controlLabel}>{item.label}</span>
    </UnstyledButton>
  ));

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label
          content={label}
          htmlFor={label.toLowerCase()}
          required={required ?? false}
        />
      )}
      <div className={classes.root} ref={setRootRef}>
        <div>{controls}</div>

        {!multipleSelect && (
          <FloatingIndicator
            target={controlsRefs[active]}
            parent={rootRef}
            className={classes.indicator}
          />
        )}
        {error && <ErrorText content={error} />}
      </div>
    </div>
  );
};

export default FloatingSelector;
