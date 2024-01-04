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
      // We can only use the measure function in the worklet.
      // This check is totally useless in this example, but I wanted to show you how to use the _WORKLET variable.
      if (!_WORKLET) return null;
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
