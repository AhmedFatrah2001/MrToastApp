import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';

export default function SplashScreen({ onAnimationEnd }) {
  const [animation] = useState(new Animated.Value(1)); 

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationEnd());
  }, [animation, onAnimationEnd]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logoToast.png')}
        style={[styles.logo, { transform: [{ scale: animation }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF00F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});
