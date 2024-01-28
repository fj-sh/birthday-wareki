import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { View, StyleSheet } from 'react-native';

const iosAdUnitId = 'ca-app-pub-6608697068906117/3467227828';
const adUnitId = __DEV__ ? TestIds.BANNER : iosAdUnitId;

const EmptyBannerAd = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bannerAd}></View>
    </View>
  );
};
const AdmobBanner = () => {
  if (__DEV__) {
    return <></>;
  }
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: false,
      }}
    />
  );
};

const BANNER_SIZE = {
  width: 320,
  height: 50,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerAd: {
    ...BANNER_SIZE,
    backgroundColor: '#424242',
  },
});

export { AdmobBanner, EmptyBannerAd };
