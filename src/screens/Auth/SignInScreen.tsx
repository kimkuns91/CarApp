import React, {useCallback} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../modules/Color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.BLACK,
  },

  emailButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  emailButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInTextButton: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  signInText: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  signInButton: {
    marginLeft: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 3,
    alignSelf: 'flex-start',
  },
  signInButtonText: {
    fontSize: 16,
    color: Colors.BLACK,
    // textDecorationLine: 'underline',
  },
});

const SignInScreen = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateEmailButton = useCallback(() => {
    navigate('SignUp');
  }, [navigate]);

  const navigateSignInButton = useCallback(() => {
    navigate('SignInByEmail');
  }, [navigate]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>내 차와 함께 더 편안한 일상을</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>차량 아이콘</Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.emailButton}
          onPress={navigateEmailButton}>
          <Text style={styles.emailButtonText}>이메일 회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signInTextButton}>
        <Text style={styles.signInText}>이미 계정이 있으신가요?</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={navigateSignInButton}>
          <Text style={styles.signInButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
