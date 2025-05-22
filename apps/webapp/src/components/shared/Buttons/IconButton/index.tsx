import React, { useState } from 'react';

const IconButton = ({
  children,
  action,
  style,
  popupContent,
}: {
  children: React.ReactNode;
  action: () => void;
  style?: string;
  popupContent?: string;
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <button
        onClick={action}
        style={{ cursor: 'pointer' }}
        className={`font-bold px-[1.125rem] py-[0.5rem] rounded ${style}`}
      >
        {children}
      </button>
      {popupContent && showPopup && (
        <div
          className="absolute -bottom-7 mt-2 px-2 py-1 right-0   bg-gray-700 text-white rounded shadow-lg  text-[12px]"
          style={{ whiteSpace: 'nowrap' }}
        >
          {popupContent}
        </div>
      )}
    </div>
  );
};

export default IconButton;
