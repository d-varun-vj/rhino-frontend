import React, { useEffect, useRef, useState } from 'react';
import TextField from '..';

const DebouncedTextField = ({
  value: initialValue,
  onChange,
  debounce = 700,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.ComponentProps<typeof TextField>, 'value' | 'onChange'>) => {
  const [value, setValue] = useState(initialValue);
  const onChangeRef = useRef(onChange);
  const shouldEmitRef = useRef(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    shouldEmitRef.current = false;
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!shouldEmitRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      onChangeRef.current(value);
      shouldEmitRef.current = false;
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce]);

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => {
        shouldEmitRef.current = true;
        setValue(e.target.value);
      }}
    />
  );
};

export default DebouncedTextField;
