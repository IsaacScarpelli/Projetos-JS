import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const TouchAnimation3 = ({ animation3 }) => {
  return (
    <Animated.View
      style={[
        styles.box,
        {
          transform: [
            {
              rotate: animation3.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default TouchAnimation3;
