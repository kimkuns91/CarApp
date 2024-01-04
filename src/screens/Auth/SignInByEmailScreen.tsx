import React, {useCallback, useContext, useMemo, useState} from 'react';
import Screen from '../../components/Screen';
import validator from 'validator';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../modules/Color';
import AuthContext from '../../providers/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    fontSize: 16,
  },
  errorText: {
    fontSize: 15,
    color: Colors.RED,
    marginTop: 4,
  },
  signInButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  signInButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledSignInButton: {
    backgroundColor: Colors.GRAY,
  },
  signingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SignInByEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, processingSignIn} = useContext(AuthContext);

  const onChangeEmailText = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePasswordText = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const emailErrorText = useMemo(() => {
    if (email.length === 0) {
      return '이메일을 입력해주세요.';
    }
    if (!validator.isEmail(email)) {
      return '올바른 이메일이 아닙니다.';
    }
    return null;
  }, [email]);

  const passwordErrorText = useMemo(() => {
    if (password.length === 0) {
      return '비밀번호를 입력해주세요.';
    }
    if (password.length < 6) {
      return '비밀번호는 6자리 이상이여야합니다';
    }
    return null;
  }, [password]);

  const signInButtonEnabled = useMemo(() => {
    return emailErrorText == null && passwordErrorText == null;
  }, [emailErrorText, passwordErrorText]);

  const signInButtonStyle = useMemo(() => {
    if (signInButtonEnabled) {
      return styles.signInButton;
    }
    return [styles.signInButton, styles.disabledSignInButton];
  }, [signInButtonEnabled]);

  const onPressSignInButton = useCallback(async () => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, [email, password, signIn]);

  return (
    <Screen title="로그인">
      <View style={styles.container}>
        {processingSignIn ? (
          <View style={styles.signingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.title}>이메일</Text>
              <TextInput
                value={email}
                style={styles.input}
                onChangeText={onChangeEmailText}
              />
              {emailErrorText && (
                <Text style={styles.errorText}>{emailErrorText}</Text>
              )}
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>비밀번호</Text>
              <TextInput
                value={password}
                style={styles.input}
                secureTextEntry
                onChangeText={onChangePasswordText}
              />
              {passwordErrorText && (
                <Text style={styles.errorText}>{passwordErrorText}</Text>
              )}
            </View>
            <View>
              <TouchableOpacity
                style={signInButtonStyle}
                onPress={onPressSignInButton}
                disabled={!signInButtonEnabled}>
                <Text style={styles.signInButtonText}>로그인</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Screen>
  );
};

export default SignInByEmailScreen;
