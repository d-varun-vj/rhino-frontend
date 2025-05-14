import React from 'react';
import SideBar from '../../components/shared/Sidebar';
import TopRibbon from '../../components/shared/TopRibbon';
import { ToastContainer } from 'react-toastify';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex items-stretch flex-auto w-full min-h-screen">
        <ToastContainer />
        {/* Navigation */}
        <SideBar />
        {/* Main Panel */}
        <div className="bg-[#fff] flex items-stretch flex-auto p-0 basis-full flex-col w-0 min-w-0 max-w-full min-h-[1px] relative">
          {/* Top Ribbon */}
          <TopRibbon />
          {/* Main Content */}
          <div className="py-[1.5rem] px-[2rem]">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
