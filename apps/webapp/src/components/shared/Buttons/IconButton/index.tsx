import React from 'react';

const IconButton = ({
  children,
  style,
  popupContent,
  action,
}: {
  children: React.ReactNode;
  style?: string;
  action: () => void;
  popupContent?: string;
}) => {
  return (
    <div className="relative group inline-block">
      <button
        className={`font-bold px-4 py-2 rounded bg-rhino-energy-green text-white ${style}`}
        onClick={action}
        title={popupContent}
      >
        {children}
      </button>
    </div>
  );
};

export default IconButton;
