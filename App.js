import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Linking, Animated, ImageBackground } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import InstagramIcon from 'react-native-vector-icons/FontAwesome';
import SnapchatIcon from 'react-native-vector-icons/FontAwesome';
import TikTokIcon from 'react-native-vector-icons/FontAwesome';
import MenuIcon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); 

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
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  if (isSplashVisible) {
    return <SplashScreen onAnimationEnd={handleSplashAnimationEnd} />;
  }

  return (
    <PaperProvider>
      <ImageBackground source={require('./assets/back1.png')} style={styles.background}>
        <Image source={require('./assets/logoToast.png')} style={styles.logo} />
        <Animated.View style={[styles.buttonsContainer, { opacity: fadeAnim }]}>
          <Button
            icon={() => <MenuIcon name="bars" size={20} color="white" />}
            mode="contained"
            labelStyle={styles.buttonText}
            style={styles.button}
            onPress={() => openLink('https://www.paperturn-view.com/?pid=ODg8826897')}
          >
            Menu
          </Button>
          <Button
            icon={() => <InstagramIcon name="instagram" size={20} color="white" />}
            mode="contained"
            labelStyle={styles.buttonText}
            style={styles.button}
            onPress={() => openLink('https://www.instagram.com/mr.toast_marrakech/')}
          >
            Instagram
          </Button>
          <Button
            icon={() => <SnapchatIcon name="snapchat-ghost" size={20} color="white" />}
            mode="contained"
            labelStyle={styles.buttonText}
            style={styles.button}
            onPress={() => openLink('https://www.snapchat.com/add/mrtoast_kech')}
          >
            Snapchat
          </Button>
          <Button
            icon={() => <TikTokIcon name="music" size={20} color="white" />}
            mode="contained"
            labelStyle={styles.buttonText}
            style={styles.button}
            onPress={() => openLink('https://www.tiktok.com/@user1391269107390')}
          >
            TikTok
          </Button>
        </Animated.View>
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#edab6f',
    borderColor: '#8b5717',
    borderWidth: 2, 
    marginBottom: 30,
    width: 280,
    height: 50
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});
