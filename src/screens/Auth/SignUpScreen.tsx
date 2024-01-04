import React, {useCallback, useContext, useMemo, useState} from 'react';
import Screen from '../../components/Screen';
import validator from 'validator';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../modules/Color';
import AuthContext from '../../providers/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';

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
  signUpButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  signUpButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledSignUpButton: {
    backgroundColor: Colors.GRAY,
  },
  signInTextButton: {
    marginTop: 5,
    alignItems: 'center',
    padding: 10,
  },
  signInButtonText: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  signingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');
  const {processingSignUp, signUp} = useContext(AuthContext);
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      return '비밀번호를 입력해주세요';
    }
    if (password.length < 6) {
      return '비밀번호는 6자리 이상이어야합니다.';
    }
    if (password !== confirmedPassword) {
      return '비밀번호를 확인해주세요.';
    }
    return null;
  }, [password, confirmedPassword]);

  const confirmedPasswordErrorText = useMemo(() => {
    if (confirmedPassword.length === 0) {
      return '비밀번호를 입력해주세요';
    }
    if (confirmedPassword.length < 6) {
      return '비밀번호는 6자리 이상이어야합니다.';
    }
    if (password !== confirmedPassword) {
      return '비밀번호를 확인해주세요.';
    }
    return null;
  }, [password, confirmedPassword]);

  const nameErrorText = useMemo(() => {
    if (name.length === 0) {
      return '이름을 입력해주세요.';
    }
    return null;
  }, [name.length]);

  const onChangeEmailText = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePasswordText = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangeConfirmedPasswordText = useCallback((text: string) => {
    setConfirmedPassword(text);
  }, []);

  const onChangeNameText = useCallback((text: string) => {
    setName(text);
  }, []);

  const signUpButtonEnabled = useMemo(() => {
    return (
      emailErrorText == null &&
      passwordErrorText == null &&
      confirmedPasswordErrorText == null &&
      nameErrorText == null
    );
  }, [
    emailErrorText,
    passwordErrorText,
    confirmedPasswordErrorText,
    nameErrorText,
  ]);

  const signUpButtonStyle = useMemo(() => {
    if (signUpButtonEnabled) {
      return styles.signUpButton;
    }
    return [styles.signUpButton, styles.disabledSignUpButton];
  }, [signUpButtonEnabled]);

  const onPressSignUpButton = useCallback(async () => {
    try {
      await signUp(email, password, name);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, [signUp, email, password, name]);

  const onPressSignInButton = useCallback(async () => {
    navigate('SignIn');
  }, [navigate]);

  return (
    <Screen title="회원가입">
      {processingSignUp ? (
        <View style={styles.signingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={styles.container}>
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
          <View style={styles.section}>
            <Text style={styles.title}>비밀번호 확인</Text>
            <TextInput
              value={confirmedPassword}
              style={styles.input}
              secureTextEntry
              onChangeText={onChangeConfirmedPasswordText}
            />
            {confirmedPasswordErrorText && (
              <Text style={styles.errorText}>{confirmedPasswordErrorText}</Text>
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>이름</Text>
            <TextInput
              value={name}
              style={styles.input}
              onChangeText={onChangeNameText}
            />
            {nameErrorText && (
              <Text style={styles.errorText}>{nameErrorText}</Text>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={signUpButtonStyle}
              onPress={onPressSignUpButton}
              disabled={!signUpButtonEnabled}>
              <Text style={styles.signUpButtonText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInTextButton}
              onPress={onPressSignInButton}>
              <Text style={styles.signInButtonText}>
                이미 계정이 있으신가요?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};
export default SignUpScreen;
