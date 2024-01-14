import { type LayoutRectangle } from 'react-native';
import { Extrapolation } from 'react-native-reanimated';
import { type SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface UseHeaderStyleParams {
  contentOffsetY: SharedValue<number>;
  headersLayoutX: Readonly<
    SharedValue<
      Array<{
        header: string;
        value: LayoutRectangle | undefined;
      }>
    >
  >;
  headersLayoutY: Array<{
    header: string;
    value: number;
  }>;
  colorSchemeName: string | null | undefined;
}

const useHeaderStyle = ({
  contentOffsetY,
  headersLayoutX,
  headersLayoutY,
  colorSchemeName,
}: UseHeaderStyleParams) => {
  const rIndicatorStyle = useAnimatedStyle(() => {
    const headersData = headersLayoutX.value;

    // 確認 headersLayoutY と headersData が少なくとも2つの要素を持っている
    if (headersLayoutY.length < 2 || headersData.length < 2) {
      return {
        width: 0,
        height: 3,
        backgroundColor: colorSchemeName === 'dark' ? '#757575' : 'black',
      };
    }

    const width = interpolate(
      contentOffsetY.value,
      headersLayoutY.map(({ value }) => value),
      headersData.map(({ value }) => value?.width ?? 0),
      Extrapolation.CLAMP
    );

    return {
      width,
      height: 3,
      backgroundColor: colorSchemeName === 'dark' ? '#757575' : 'black',
    };
  }, [headersLayoutY]);

  const rHeaderListStyle = useAnimatedStyle(() => {
    const headersData = headersLayoutX.value;

    // 確認 headersLayoutY と headersData が少なくとも2つの要素を持っている
    if (headersLayoutY.length < 2 || headersData.length < 2) {
      return { transform: [{ translateX: 0 }] };
    }

    const translateX = interpolate(
      contentOffsetY.value,
      headersLayoutY.map(({ value }) => value),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      headersData.map(({ value }) => value!.x),
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX: -translateX }],
    };
  }, [headersLayoutY]);

  return {
    rIndicatorStyle,
    rHeaderListStyle,
  };
};

export { useHeaderStyle };
