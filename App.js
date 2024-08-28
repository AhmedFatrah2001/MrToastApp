import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Linking, Animated, ImageBackground, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from './components/SplashScreen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [areFlagsVisible, setAreFlagsVisible] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().then(() => {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    });
  }, []);

  useEffect(() => {
    if (!isSplashVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSplashVisible, fadeAnim]);

  const handleSplashAnimationEnd = () => {
    setIsSplashVisible(false);
  };

  const openLink = (url) => {
    Linking.openURL(url)
      .then(() => setAreFlagsVisible(false))
      .catch((err) => console.error('Failed to open URL:', err));
  };

  const dialNumber = (number) => {
    Linking.openURL(`tel:${number}`).catch((err) => console.error('Failed to dial number:', err));
  };

  const toggleFlags = () => {
    setAreFlagsVisible(!areFlagsVisible);
  };

  if (isSplashVisible) {
    return <SplashScreenComponent onAnimationEnd={handleSplashAnimationEnd} />;
  }

  return (
    <PaperProvider>
      <ImageBackground source={require('./assets/back1.png')} style={styles.background} resizeMode="cover">
        <Image source={require('./assets/logoToast.png')} style={styles.logo} />
        <Animated.View style={[styles.buttonsContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={toggleFlags}>
            <Image source={require('./assets/button-menu.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.instagram.com/mr.toast_marrakech/')}>
            <Image source={require('./assets/button-insta.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.snapchat.com/add/mrtoast_kech')}>
            <Image source={require('./assets/button-snap.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.tiktok.com/@user1391269107390')}>
            <Image source={require('./assets/button-tik.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dialNumber('0777-549597')}>
            <Image source={require('./assets/button-dial.png')} style={styles.buttonImage} />
          </TouchableOpacity>
        </Animated.View>

        {/* Darkened Background */}
        {areFlagsVisible && <View style={styles.overlay} />}

        {/* Pop-up Flags */}
        {areFlagsVisible && (
          <View style={styles.flagsContainer}>
            <TouchableOpacity onPress={() => openLink('https://mrtoast.kabomedias.com/mr-toast-menu-fr/')} style={styles.flagWrapper}>
              <Image source={require('./assets/flag-fr.png')} style={styles.flagButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://mrtoast.kabomedias.com/mr-toast-menu-eng/')} style={styles.flagWrapper}>
              <Image source={require('./assets/flag-eng.png')} style={styles.flagButton} />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonImage: {
    width: 240,
    height: 90,
    marginBottom: 14,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  flagsContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    flexDirection: 'row',
    transform: [{ translateX: -140 }, { translateY: -50 }],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, 
  },
  flagWrapper: {
    marginHorizontal: 4,
  },
  flagButton: {
    width: 140,
    height: 140,
  },
});
