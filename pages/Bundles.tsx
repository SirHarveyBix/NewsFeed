import React, { useState } from 'react';
import { ItemList } from '../components/ItemList';
import { Layout } from '../components/Layout';
import { ItemType, SelectedFeedState } from '../utils/types';
import { useUser } from '@auth0/nextjs-auth0';
import { Minus, Plus } from '../components/svg';
import { NewEditItem } from '../components/NewEditItem';

const BundlesPage = () => {
  const initialSelected: SelectedFeedState = {
    id: null,
    feeds: [],
    editMode: false,
    newMode: false,
  };
  const [selected, setSelected] = useState(initialSelected);
  const { user, error, isLoading } = useUser();

  return (
    <Layout>
      <div className="grid grid-cols-2">
        <h3 className="grid-cols-1 justify-start flex text-lr font-medium py-4">Bundles Page</h3>
        {user ? (
          <div
            onClick={(e) => {
              e.persist();
              setSelected((currState) => ({
                ...currState,
                newMode: !currState.newMode,
                editMode: false,
              }));
            }}
            className="flex grid-cols-1 justify-end cursor-pointer"
          >
            {selected.newMode ? (
              <Minus className={`h-6 w-6 text-${selected.newMode ? 'gray' : 'blue'}-500 mt-4`} />
            ) : (
              <Plus className={`h-6 w-6 text-${selected.newMode ? 'gray' : 'blue'}-500 mt-4`} />
            )}
            <h3
              className={`grid-cols-1 justify-start flex text-lg font-medium py-4 text-${
                selected.newMode ? `gray` : `blue`
              }`}
            >
              New Bundle
            </h3>
          </div>
        ) : null}
      </div>
      {(selected.editMode || selected.newMode) && user ? (
        <NewEditItem type={ItemType.BundleType} />
      ) : null}
      <ItemList
        type={ItemType.BundleType}
        useSelected={true}
        allowEdits={true}
        selected={selected}
        setSelected={setSelected}
      />
    </Layout>
  );
};

export default BundlesPage;
