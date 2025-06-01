import React, { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

type FadeViewProps = {
  children: React.ReactNode;
  duration?: number;
  animationKey?: string | number;
} & ViewProps;

const FadeView = ({
  children,
  duration = 300,
  style,
  animationKey,
  ...rest
}: FadeViewProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    };
  }, [animationKey]);

  return (
    <Animated.View style={[{ opacity }, style]} {...rest}>
      {children}
    </Animated.View>
  );
};

export default FadeView;
