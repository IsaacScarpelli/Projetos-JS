import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const TouchAnimation1 = ({ animation }) => {
  return (
    <Animated.View
      style={[
        styles.box,
        {
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2], // Aumenta o tamanho para 2x
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

export default TouchAnimation1;
