import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import SideBar from '../../components/layout/Sidebar';
import TopRibbon, { TopRibbonProps } from '../../components/layout/TopRibbon';
import { useUser } from '../../context/user';
import { useUserFilter } from '../../context/userFilter';
import { shouldSetInitialClient } from '../../helpers/client';

type MainLayoutProps = {
  children: React.ReactNode;
  title: string;
  topRibbon?: TopRibbonProps;
  hideTopRibbon?: boolean;
};

const MainLayout = ({
  children,
  title,
  hideTopRibbon = false,
  topRibbon,
}: MainLayoutProps) => {
  const { user } = useUser();
  const { clients, setClients } = useUserFilter();

  useEffect(() => {
    if (!user || !shouldSetInitialClient(user)) return;

    const isClientAlreadySet = clients && clients.length > 0;
    if (isClientAlreadySet) return;

    setClients(
      user.clients
        ? [
            {
              name: user.clients[0].name,
              uuid: user.clients[0].uuid,
            },
          ]
        : []
    );
  }, [user, clients, setClients]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="flex items-stretch flex-auto w-full min-h-screen">
      <ToastContainer theme="colored" />
      <SideBar />
      <div className="bg-rhino-white flex items-stretch flex-auto p-0 basis-full flex-col w-0 max-w-full relative ">
        {!hideTopRibbon && <TopRibbon {...topRibbon} />}
        <div className="py-[1.5rem] px-[2rem]">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
