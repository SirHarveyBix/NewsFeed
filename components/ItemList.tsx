import { useQuery } from '@apollo/client';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { BUNDLES_QUERY, FEEDS_QUERY } from '../utils/api/graphql/queries';
import { BundleObject, FeedObject, ItemType, SelectedFeedState } from '../utils/types';
import { NotifyError } from './NotifyError';
import { NotifyLoading } from './NotifyLoading';
import { OneListItem } from './OneListItem';

export const ItemList = ({
  type,
  selected,
  setSelected,
  useSelected = false,
  allowEdits = false,
}: {
  type: ItemType;
  selected?: SelectedFeedState;
  setSelected?: Dispatch<SetStateAction<SelectedFeedState>>;
  useSelected: boolean;
  allowEdits: boolean;
}) => {
  const isFeed = type === ItemType.FeedType;
  const { loading, error, data } = useQuery(isFeed ? FEEDS_QUERY : BUNDLES_QUERY);
  const { feeds, bundles } = data || {};
  const itemList = isFeed ? feeds : bundles;
  console.log(itemList);

  useEffect(() => {
    (async () => {
      console.log(itemList);
      if (useSelected && itemList.lenght > 0 && selected.id == null) {
        const firstItem = itemList[0];
        await setSelected({
          id: firstItem.id,
          feeds: isFeed ? [firstItem] : firstItem['feeds'],
          editMode: false,
          newMode: false,
        });
      }
    })();
  }, []);

  if (loading) return <NotifyLoading />;
  if (error) return <NotifyError />;
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid:cols-2 gap-4">
        {itemList.length > 0 ? (
          itemList.map((item: FeedObject | BundleObject) => (
            <OneListItem
              key={item.id}
              type={type}
              item={item}
              useSelected={useSelected}
              allowEdits={allowEdits}
              selected={selected}
              setSelected={setSelected}
            />
          ))
        ) : (
          <p>None ar Present. why just not add one ?</p>
        )}
      </div>
    </>
  );
};
