import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useMemo} from 'react';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import {RootStackParamList} from '../types/types';
import SignInScreen from '../screens/Auth/SignInScreen';
import AuthContext from '../providers/AuthContext';
import LoadingScreen from '../screens/Loading/LoadingScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import BottomTabNavigation from './BottomTabNavigation';
import SignInByEmailScreen from '../screens/Auth/SignInByEmailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation: React.FC = () => {
  const {user, processingSignIn, processingSignUp, initialized} =
    useContext(AuthContext);

  const renderRootStack = useMemo(() => {
    if (!initialized) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    }

    if (user && !processingSignIn && !processingSignUp) {
      return (
        <>
          <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      );
    }

    return (
      <>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignInByEmail" component={SignInByEmailScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </>
    );
  }, [user, processingSignIn, processingSignUp, initialized]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}>
      {renderRootStack}
    </Stack.Navigator>
  );
};
