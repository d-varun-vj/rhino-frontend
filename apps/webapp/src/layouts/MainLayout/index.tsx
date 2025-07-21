import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SideBar from '../../components/layout/Sidebar';
import TopRibbon from '../../components/layout/TopRibbon';

type MainLayoutProps = {
  children: React.ReactNode;
  title: string;
  isFavoriteMeterShow?: boolean;
};

const MainLayout = ({
  children,
  title,
  isFavoriteMeterShow = true,
}: MainLayoutProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t(title); // Set the document title dynamically
  }, [title, t]);

  return (
    <>
      <div className="flex items-stretch flex-auto w-full min-h-screen">
        <ToastContainer />
        {/* Navigation */}
        <SideBar />
        {/* Main Panel */}
        <div className="bg-rhino-white flex overflow-hidden items-stretch flex-auto p-0 basis-full flex-col w-0 min-w-0 max-w-full min-h-[1px] relative">
          {/* Top Ribbon */}
          <TopRibbon showFavoriteMeterShow={isFavoriteMeterShow} />
          {/* Main Content */}
          <div className="py-[1.5rem] px-[2rem]">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
