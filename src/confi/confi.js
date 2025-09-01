const confi = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  appwriteAddressCollectionId: import.meta.env.VITE_APPWRITE_AddressCollection_ID,
  appwriteCartCollectionId: import.meta.env.VITE_APPWRITE_CartCollection_ID,
  appwriteOrderedCollectionId: import.meta.env.VITE_APPWRITE_OrderedCollection_ID,
  appwriteWishlistCollectionId: import.meta.env.VITE_APPWRITE_WishlistCollection_ID,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

export default confi;

