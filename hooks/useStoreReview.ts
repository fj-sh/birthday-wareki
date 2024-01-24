import * as StoreReview from 'expo-store-review';
export const useStoreReview = () => {
  const requestReview = async () => {
    try {
      const isReviewAvailable = await StoreReview.isAvailableAsync();
      if (!isReviewAvailable) return;

      await StoreReview.requestReview();
    } catch (error) {
      console.log(error);
    }
  };

  return { requestReview };
};
