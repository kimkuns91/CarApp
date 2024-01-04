import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootApp} from './src/RootApp';
import AuthProvider from './src/providers/AuthProvider';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootApp />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
