import { useQuery } from '@apollo/client';
import React from 'react';
import { Layout } from '../../components/Layout';
import { NotifyError } from '../../components/NotifyError';
import { NotifyLoading } from '../../components/NotifyLoading';
import { OneListItem } from '../../components/OneListItem';
import { FEED_QUERY } from '../../utils/api/graphql/queries';
import { FeedObject, ItemType } from '../../utils/types';

const Bundle = ({ id }) => {
  const { loading, error, data } = useQuery(FEED_QUERY, { variables: { data: { id } } });

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

  const { feed } = data || {};

  return (
    <Layout>
      <h3 className="text-lg font-medium pt-4">{feed.name}</h3>
      <p className="pb-4">{feed.url}</p>
      <h3 className="pb-4 font-medium">Bundles</h3>
      <div className="grid grid-cols-3 gap-4">
        {feed.bundles.length > 0 ? (
          feed.bundles.map((item: FeedObject) => (
            <OneListItem item={item} type={ItemType.FeedType} />
          ))
        ) : (
          <p>'None are present'</p>
        )}
        )
      </div>
    </Layout>
  );
};
Bundle.getInitialProps = ({ query }) => {
  const { id } = query;

  return { id };
};

export default Bundle;
