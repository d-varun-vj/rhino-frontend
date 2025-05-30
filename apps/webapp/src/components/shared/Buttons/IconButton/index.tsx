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
      >
        {children}
      </button>
      <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 -bottom-7 right-0 bg-black/90 text-white px-2 py-1 rounded shadow-lg text-xs lg:whitespace-nowrap ">
        {popupContent}
      </div>
    </div>
  );
};

export default IconButton;
