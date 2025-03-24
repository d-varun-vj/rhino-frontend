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
    <MainLayout>
      <Title title="Balance Module" />
      <p>Client: {client ? client.name : ''}</p>
      <p>Location: {location ? location.name : ''}</p>
      <p>Group: {group ? group.name : ''}</p>

      {/* {Array.from({ length: 1 }, (_, i) => (
        <tr key={`${i}`}>
          {col.map((cell) => (
            <td key={`${i}-${cell.id}`}>{cell.data}</td>
          ))}
        </tr>
      ))} */}
    </MainLayout>
  );
};

export default Balance;
