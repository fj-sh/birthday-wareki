import React, { useCallback, useImperativeHandle } from 'react';
import { measure, type MeasuredDimensions } from 'react-native-reanimated';
import Animated, { useAnimatedRef } from 'react-native-reanimated';

import { type ViewProps } from 'react-native';

type MeasureFunction = () => MeasuredDimensions | null;

interface MeasureableAnimatedViewRef {
  reanimatedMeasure: MeasureFunction;
}

const MeasureableAnimatedView = React.forwardRef<MeasureableAnimatedViewRef, ViewProps>(
  (props, ref) => {
    const animatedRef = useAnimatedRef<Animated.View>();

    const rMeasure: MeasureFunction = useCallback(() => {
      'worklet';
      return measure(animatedRef);
    }, [animatedRef]);

    useImperativeHandle(
      ref,
      () => ({
        reanimatedMeasure: rMeasure,
      }),
      [rMeasure]
    );

    return <Animated.View {...props} ref={animatedRef} />;
  }
);

export { MeasureableAnimatedView };
export type { MeasureableAnimatedViewRef };
