import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import TouchAnimation1 from './components/TouchAnimation1';
import TouchAnimation2 from './components/TouchAnimation2';
import TouchAnimation3 from './components/TouchAnimation3';
import TouchAnimation4 from './components/TouchAnimation4';

export default function App() {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animation2, setAnimation2] = useState(new Animated.Value(0));
  const [animation3, setAnimation3] = useState(new Animated.Value(0));
  const [animation4, setAnimation4] = useState(new Animated.Value(0));
  const [touchCount, setTouchCount] = useState(0);

  // Funções de animação
  const animate1 = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const animate2 = () => {
    Animated.timing(animation2, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      animation2.setValue(0);
    });
  };

  const animate3 = () => {
    Animated.loop(
      Animated.timing(animation3, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const animate4 = () => {
    Animated.timing(animation4, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      animation4.setValue(0);
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onStartShouldSetPanResponderCapture: (e) => {
      const touchCount = e.nativeEvent.touches.length;
      setTouchCount(touchCount);

      // Detectar número de toques e disparar animações correspondentes
      if (touchCount === 1) {
        animate1();
      } else if (touchCount === 2) {
        animate2();
      } else if (touchCount === 3) {
        animate3();
      }

      return true;
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.longPress) {
        animate4();
      }
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.title}>Toque na tela</Text>
      <Text style={styles.instructions}>Número de toques: {touchCount}</Text>

      {/* Exibindo animações */}
      <TouchAnimation1 animation={animation} />
      <TouchAnimation2 animation2={animation2} />
      <TouchAnimation3 animation3={animation3} />
      <TouchAnimation4 animation4={animation4} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
});
