import { useQuery } from '@apollo/client';
import { BUNDLES_QUERY, FEEDS_QUERY } from '../utils/api/graphql/queries';
import { BundleObject, FeedObject, ItemType } from '../utils/types';
import { NotifyError } from './NotifyError';
import { NotifyLoading } from './NotifyLoading';

export const ItemList = ({ type }: { type: ItemType }) => {
  const isFeed = type === ItemType.FeedType;
  const { loading, error, data } = useQuery(isFeed ? FEEDS_QUERY : BUNDLES_QUERY);
  console.log(loading, error, data);

  const { feeds, bundles } = data || {};

  const itemList = isFeed ? feeds : bundles;
  console.log(itemList);

  if (loading) return <NotifyLoading />;
  if (error) return <NotifyError />;

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid:cols-2 gap-4">
        {itemList.length > 0 ? (
          itemList.map((item: FeedObject | BundleObject) => <p key={item.id}>{item.id}</p>)
        ) : (
          <p>None ar Present. why just not add one ?</p>
        )}
      </div>
    </>
  );
};
