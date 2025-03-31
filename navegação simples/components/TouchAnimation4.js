import React from 'react';
import { Animated, StyleSheet } from 'react-native';

const TouchAnimation4 = ({ animation4 }) => {
  return (
    <Animated.View
      style={[
        styles.box,
        {
          backgroundColor: animation4.interpolate({
            inputRange: [0, 1],
            outputRange: ['blue', 'green'], // Muda a cor de azul para verde
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
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default TouchAnimation4;
