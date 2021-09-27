import { BundleTag, FeedTag, User } from '.prisma/client';

export enum ItemType {
  BundleType = 'BundleType',
  FeedType = 'FeedType',
}

export type FeedObject = {
  id?: string;
  name: string;
  url: string;
  tags: FeedTag[];
  bundles?: BundleObject[];
  athor?: User;
  likes?: User[];
};

export type BundleObject = {
  id?: string;
  name: string;
  description: string;
  tags: BundleTag[];
  feeds: FeedObject[];
  athor?: User;
  likes?: User[];
};
