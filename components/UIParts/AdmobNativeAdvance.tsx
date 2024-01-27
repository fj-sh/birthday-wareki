import { BannerAdSize, GAMBannerAd, TestIds } from 'react-native-google-mobile-ads';

const iosAdUnitId = 'ca-app-pub-6608697068906117/4057639475';
const adUnitId = __DEV__ ? TestIds.GAM_NATIVE : iosAdUnitId;

const AdmobNativeAdvance = () => {
  return <GAMBannerAd unitId={adUnitId} sizes={[BannerAdSize.FULL_BANNER]} />;
};

export { AdmobNativeAdvance };
