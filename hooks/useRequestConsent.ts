import { useEffect } from 'react';
import {
  AdsConsent,
  AdsConsentDebugGeography,
  AdsConsentStatus,
} from 'react-native-google-mobile-ads';

const useRequestConsent = () => {
  const requestConsent = async () => {
    try {
      const consentInfo = await AdsConsent.requestInfoUpdate({
        debugGeography: AdsConsentDebugGeography.EEA,
      });

      const status = consentInfo.status;
      if (
        (consentInfo.isConsentFormAvailable && status === AdsConsentStatus.UNKNOWN) ||
        (consentInfo.isConsentFormAvailable && status === AdsConsentStatus.REQUIRED)
      ) {
        await AdsConsent.showForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestConsent();
  }, []);
};

export { useRequestConsent };
