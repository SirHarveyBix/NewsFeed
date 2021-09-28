import { useQuery } from '@apollo/client';
import { Layout } from '../../components/Layout';
import { NotifyError } from '../../components/NotifyError';
import { NotifyLoading } from '../../components/NotifyLoading';
import { OneListItem } from '../../components/OneListItem';
import { BUNDLE_QUERY } from '../../utils/api/graphql/queries';
import { FeedObject, ItemType } from '../../utils/types';

const Bundle = ({ id }) => {
  const { loading, error, data } = useQuery(BUNDLE_QUERY, {
    variables: { data: { id } },
  });

  if (loading) {
    return (
      <Layout>
        <NotifyLoading />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <NotifyError />
      </Layout>
    );
  }

  const { bundle } = data || {};

  return (
    <Layout>
      <h3 className="text-lg font-medium pt-4">{bundle.name}</h3>
      <p className="pb-4">{bundle.description}</p>
      <h3 className="pb-4 font-medium">Feeds</h3>
      <div className="grid grid-cols-3 gap-4">
        {bundle.feeds.length > 0 ? (
          bundle.feeds.map((item: FeedObject) => (
            <OneListItem item={item} type={ItemType.BundleType} key={item.id} />
          ))
        ) : (
          <p>None are present. Why not add one?</p>
        )}
      </div>
    </Layout>
  );
};

Bundle.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default Bundle;
