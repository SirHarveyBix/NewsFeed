import { ItemList } from '../components/ItemList';
import { Layout } from '../components/Layout';
import { ItemType } from '../utils/types';

const Index = () => {
  return (
    <Layout>
      <h3 className="justify-start flex text-lg font-medium py-4">Home Page</h3>
      <ItemList type={ItemType.BundleType} />
    </Layout>
  );
};

export default Index;
