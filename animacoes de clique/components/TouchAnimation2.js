import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const TouchAnimation2 = ({ animation2 }) => {
  return (
    <Animated.View
      style={[
        styles.box,
        {
          opacity: animation2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
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

export default TouchAnimation2;
