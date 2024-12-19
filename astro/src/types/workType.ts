export interface Work {
    _type?: string;
    title: string;
    slug: {
      current: string;
    };
    thumbnail?: {
      // Sanity image asset type properties
      asset?: {
        _ref: string;
      };
    };
    categories?: {
      title: string;
      slug: {
        current: string;
      }
    }[];
  }