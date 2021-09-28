import React, { Dispatch, SetStateAction } from 'react';
import { BundleObject, FeedObject, ItemType, SelectedFeedState } from '../utils/types';
import { DoubleArrowDown, DoubleArrowRight } from './svg';
import Link from 'next/link';
export const OneListItem = ({
  item,
  type,
  selected,
  setSelected,
  useSelected = false,
  allowEdits = false,
}: {
  item: FeedObject | BundleObject;
  type: ItemType;
  selected?: SelectedFeedState;
  setSelected?: Dispatch<SetStateAction<SelectedFeedState>>;
  useSelected: boolean;
  allowEdits: boolean;
}) => {
  const isFeed = type === ItemType.FeedType;
  const isSelected = useSelected && selected && selected.id === item.id;

  return (
    <Link href={`/${isFeed ? 'feed' : 'bundle'}/${item.id}`}>
      <div>
        <div
          className={`
      cursor-pointer grid grid-cols-6 p-4 rounded-lg
      ${useSelected ? 'rounded-b-none' : 'border-b-4'}
      border-t-4 border-l-4 border-r-4
      ${isSelected ? `border-${isFeed ? 'green' : ' purple'}-400` : 'border-gray-300'}
      `}
        >
          <div className="col-span-4">
            <h4 className="font-bold">{item.name}</h4>
            {!isFeed ? <p>{item['description']}</p> : null}
          </div>
          <div className="col-span-2 flex justify-end">
            <p>action</p>
          </div>
          <div className="flex col-span-4 py-0 space-x-2">
            {item.author ? <p>profile pic</p> : null}
          </div>
          <div className="col-span-6 py-2">
            <h3>Tags</h3>
            <div className="grid grid-col-3 gap-2">
              <p>tags ... </p>
            </div>
            <div className="col-span-6 py-2">
              <h3>{isFeed ? 'Bundle' : 'Feeds'}</h3>
              <div className="grid grid-cols-3 gap-2">
                <p>child Item..</p>
              </div>
            </div>
          </div>
        </div>
        {useSelected ? (
          <>
            {isSelected ? (
              <p
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={`flex rounded-lg rounded-t-none align-middle
       ${isSelected ? `bg-${isFeed ? 'green' : 'purple'}-400` : `bg-gray-300`}
       p-4 z-10 text-white cursor-pointer
       `}
              >
                <DoubleArrowDown className="h-5 w-5 text-white-500 mr-2 mt-1" />
                {` Hide ${isFeed ? `Feed` : `Bundle`} Articles`}
              </p>
            ) : (
              <p
                onClick={(e) => {
                  e.preventDefault();
                  setSelected({
                    id: item.id,
                    feeds: isFeed ? [item] : item['feeds'],
                    editMode: false,
                    newMode: false,
                  });
                }}
                className={`flex rounded-lg rounded-t-none align-middle
     ${isSelected ? `bg-${isFeed ? 'green' : 'purple'}-400` : `bg-gray-300`}
     p-4 z-10 text-white cursor-pointer
     `}
              >
                <DoubleArrowRight className="h-5 w-5 text-white-500 mr-2 mt-1" />
                {` Show ${isFeed ? `Feed` : `Bundle`} Articles`}
              </p>
            )}
          </>
        ) : null}
      </div>
    </Link>
  );
};
