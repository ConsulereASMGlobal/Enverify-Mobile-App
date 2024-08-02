import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { HorizontalLine } from '../HorizontalLine';

type PropsType = {
  data: { label: string; value: number }[];
  height: number;
  barWidth: number;
  animate: boolean;
};

const BarChart = ({ data, height, barWidth, animate }: PropsType) => {
  const values = data.map(each => each.value || 0.001);

  const maxValue = values.length > 0 ? Math.max(...values) : 1000;
  const animationValues = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (animate) {
      animateBars();
    } else {
      animationValues.forEach(animatedValue => animatedValue.setValue(0));
    }
  }, [data, animate]);

  const animateBars = () => {
    const animations = data.map((each, index) => {
      return Animated.timing(animationValues[index], {
        toValue: (each.value / maxValue) * height,
        duration: 1000,
        useNativeDriver: false
      });
    });

    Animated.parallel(animations).start();
  };

  const yAxisLabels = Array.from({ length: 6 }, (_, index) => {
    const labelValue = ((maxValue / 5) * (5 - index)).toFixed(0);
    return (
      <Text key={index} style={styles.yAxisLabel}>
        {Number(labelValue) > 1000
          ? `${Number(labelValue) / 1000}K`
          : labelValue}
      </Text>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={[styles.yAxisContainer, { height }]}>{yAxisLabels}</View>

        <View style={styles.barsContainer}>
          {data.map((each, index) => (
            <View key={index} style={styles.barContainer}>
              <Animated.View
                style={[
                  styles.bar,
                  { height: animationValues[index], width: barWidth || 20 }
                ]}
              />
              <HorizontalLine color={'#d2d2d2'} />
              <Text style={styles.label}>{each.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 20,
    borderRadius: 8
  },
  yAxisContainer: {
    justifyContent: 'space-between',
    paddingRight: 10,
    marginBottom: 21
  },
  yAxisLabel: {
    fontSize: 12,
    lineHeight: 12,
    color: 'black',
    textAlign: 'right',
    textAlignVertical: 'bottom'
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 0
  },
  bar: {
    width: 20,
    backgroundColor: '#496994',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 12,
    color: 'black'
  }
});

export default BarChart;
