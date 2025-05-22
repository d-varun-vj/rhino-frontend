import Title from '../../components/shared/Title';
import { useFilter } from '../../context/useFilter';
import MainLayout from '../../layouts/MainLayout';

const Balance = () => {
  const { client, group, location } = useFilter();
  // const col = [
  //   { id: 1, data: 'test1' },
  //   { id: 1, data: 'test1' },
  //   { id: 2, data: 'tes2' },
  // ];

  return (
    <MainLayout title="Balance Module">
      <Title title="Balance Module" />
      <p>Client: {client ? client.name : ''}</p>
      <p>Location: {location ? location.name : ''}</p>
      <p>Group: {group ? group.name : ''}</p>
    </MainLayout>
  );
};

export default Balance;
