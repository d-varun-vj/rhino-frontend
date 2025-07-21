import React from 'react';

const ActionCell = ({ children }: { children: React.ReactNode }) => {
  // In most cases, the children will be IconButtons.
  return <div className="flex gap-2 ">{children}</div>;
};

export default ActionCell;
