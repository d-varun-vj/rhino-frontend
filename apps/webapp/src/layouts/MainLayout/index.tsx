import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import SideBar from '../../components/layout/Sidebar';
import TopRibbon from '../../components/layout/TopRibbon';
import { useUser } from '../../context/user';
import { useUserFilter } from '../../context/userFilter';
import { shouldSetInitialClient } from '../../helpers/client';

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
  const { user } = useUser();
  const { setClient, location, group } = useUserFilter();

  useEffect(() => {
    if (user && shouldSetInitialClient(user)) {
      setClient({
        name: user.clients ? user.clients[0].name : '',
        uuid: user.clients ? user.clients[0].uuid : '',
      });
    }
  }, [user, location, group, setClient]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="flex items-stretch flex-auto w-full min-h-screen">
      <ToastContainer theme="colored" />
      <SideBar />
      <div className="bg-rhino-white flex items-stretch flex-auto p-0 basis-full flex-col w-0 min-w-0 max-w-full min-h-[1px] relative">
        <TopRibbon showFavoriteMeterShow={isFavoriteMeterShow} />
        <div className="py-[1.5rem] px-[2rem]">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
