import React, { useEffect, useState, useRef } from 'react';
import TextField from '..';

const DebouncedTextField = ({
  value: initialValue,
  onChange,
  debounce = 500,
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeRef.current(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce]);

  return <TextField value={value} onChange={(e) => setValue(e.target.value)} />;
};

export default DebouncedTextField;
