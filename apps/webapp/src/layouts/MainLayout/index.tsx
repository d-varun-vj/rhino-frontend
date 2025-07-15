import { useEffect } from 'react';
import SideBar from '../../components/Sidebar';
import TopRibbon from '../../components/TopRibbon';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user';
import { User, UserType, UserViewPermission } from '@rhino/apis';

type MainLayoutProps = {
  children: React.ReactNode;
  title: string;
  isFavoriteMeterShow?: boolean;
  pageUserPermission?: UserViewPermission[];
};

const MainLayout = ({
  children,
  title,
  isFavoriteMeterShow = true,
  pageUserPermission: pagePermission,
}: MainLayoutProps) => {
  const { t } = useTranslation();
  const { user } = useUser();

  useEffect(() => {
    document.title = t(title); // Set the document title dynamically
  }, [title, t]);

  const hasAnyValidPermissionForViewPage = (user: User | null): boolean => {
    if (user?.userType === UserType.SuperAdmin) return true;

    if (!user || !user.permissions || user.permissions.length === 0)
      return false;

    return pagePermission
      ? user.permissions.some((p) => pagePermission.includes(p))
      : true;
  };

  if (user && !hasAnyValidPermissionForViewPage(user)) {
    return <div>You don’t have permission to view this page.</div>;
  }

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
