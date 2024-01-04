import type { LayoutRectangle } from 'react-native';
import Animated, { Extrapolation } from 'react-native-reanimated';
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
}

const useHeaderStyle = ({
  contentOffsetY,
  headersLayoutX,
  headersLayoutY,
}: UseHeaderStyleParams) => {
  const rIndicatorStyle = useAnimatedStyle(() => {
    const headersData = headersLayoutX.value;

    const width = interpolate(
      contentOffsetY.value,
      headersLayoutY.map(({ value }) => value),
      headersData.map(({ value }) => value?.width ?? 0),
      Extrapolation.CLAMP
    );

    return {
      width,
      height: 3,
      backgroundColor: 'black',
    };
  }, [headersLayoutY]);

  const rHeaderListStyle = useAnimatedStyle(() => {
    const headersData = headersLayoutX.value;

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
