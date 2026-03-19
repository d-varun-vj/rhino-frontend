import { Flag } from '@rhino/apis';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import FlashScreen from '../../components/common/FlashScreen';
import SideBar from '../../components/layout/Sidebar';
import TopRibbon, { TopRibbonOptions } from '../../components/layout/TopRibbon';
import { useFeatureFlags } from '../../context/featureFlag';
import { useUser } from '../../context/user';
import { useUserFilter } from '../../context/userFilter';
import { shouldSetInitialClient } from '../../helpers/client';
import { getFeature } from '../../helpers/featureFlag';
import { paths } from '../../routes/paths';

export type PageOptions = {
  hideTopRibbon?: boolean;
  featureFlag?: keyof typeof Flag;
  dynamicSideBarLabel?: string;
};

type MainLayoutProps = {
  children: React.ReactNode;
  title: string;
  topRibbonOptions?: TopRibbonOptions;
  pageOptions?: PageOptions;
};

const MainLayout = ({
  children,
  title,
  topRibbonOptions,
  pageOptions: pageOptions = { hideTopRibbon: false },
}: MainLayoutProps) => {
  const { user } = useUser();
  const { clients, setClients } = useUserFilter();
  const { features } = useFeatureFlags();
  const navigate = useNavigate();

  const isFeatureEnabled = pageOptions?.featureFlag
    ? features
      ? getFeature(features, pageOptions.featureFlag)
      : null
    : true;

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

  useEffect(() => {
    if (isFeatureEnabled === false) {
      navigate(paths.notFound, { replace: true });
    }
  }, [isFeatureEnabled, navigate]);

  if (isFeatureEnabled === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <FlashScreen />
      </div>
    );
  }

  if (isFeatureEnabled === false) return null;

  return (
    <div className="flex items-stretch flex-auto w-full min-h-screen">
      <ToastContainer theme="colored" />
      <SideBar
        options={{
          customLabel: pageOptions.dynamicSideBarLabel,
        }}
      />
      <div className="bg-rhino-white flex items-stretch flex-auto p-0 basis-full flex-col w-0 max-w-full relative ">
        {!pageOptions?.hideTopRibbon && <TopRibbon {...topRibbonOptions} />}
        <div className="py-[1.5rem] px-[2rem]">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
