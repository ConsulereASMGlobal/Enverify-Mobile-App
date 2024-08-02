import React, { useEffect, useState } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { TextField } from "../TextField/TextField";
import { colors } from "../../globals/colors";

type PropsType = {
  percentage: number;
  animate: boolean;
  showValue: boolean;
  animationDuration: number;
  label: string;
  size: number;
};

const ProgressDoughnutChart = ({
  percentage,
  animate,
  showValue,
  animationDuration,
  label,
  size = 150,
}: PropsType) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = new Animated.Value(0);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [
      circumference,
      circumference - (percentage / 100) * circumference,
    ],
  });

  useEffect(() => {
    if (animate) {
      Animated.timing(animatedValue, {
        toValue: 100,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      // Reset the animation value when not animating
      animatedValue.setValue(0);
    }
  }, [animate, animationDuration]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: size,
      }}
    >
      <View>
        <Svg height={size} width={size}>
          <G>
            <Circle
              r={radius}
              cx={size / 2}
              cy={size / 2}
              fill="transparent"
              stroke={colors.chartInactive}
              strokeWidth="25"
            />
            <AnimatedCircle
              r={radius}
              cx={size / 2}
              cy={size / 2}
              fill="transparent"
              stroke={colors.chartActive}
              strokeWidth="25"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
            {showValue && (
              <TextField
                style={{
                  position: "absolute",
                  top: size / 2 - 11,
                  left: size / 2 - 13,
                  fontWeight: "bold",
                }}
              >
                {Math.floor(percentage)}%
              </TextField>
            )}
          </G>
        </Svg>
      </View>
      <TextField
        style={{
          fontWeight: "bold",
          // top: -size / 10,
          fontSize: 14,
          width: 150,
          textAlign: "center",
        }}
      >
        {label}
      </TextField>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default ProgressDoughnutChart;
