import React, {useCallback, useMemo, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useEffect} from 'react';
import {Collections, User} from '../types/types';
import _ from 'lodash';
import AuthContext from './AuthContext';

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [processingSignUp, setProcessingSignUp] = useState(false);
  const [processingSignIn, setProcessingSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(async fbUser => {
      console.log('fbUser', fbUser);
      if (fbUser != null) {
        // login
        setUser({
          userId: fbUser.uid,
          email: fbUser.email ?? '',
          name: fbUser.displayName ?? '',
          profileUrl: fbUser.photoURL ?? '',
        });
      } else {
        // logout
        setUser(null);
      }
      setInitialized(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      setProcessingSignUp(true);
      try {
        const {user: currentUser} = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        await currentUser.updateProfile({
          displayName: name,
          photoURL:
            'https://lawline-bucket.s3.ap-northeast-2.amazonaws.com/NoUser.png',
        });
        await firestore()
          .collection(Collections.USERS)
          .doc(currentUser.uid)
          .set({
            userId: currentUser.uid,
            email,
            name,
            profileUrl:
              'https://lawline-bucket.s3.ap-northeast-2.amazonaws.com/NoUser.png',
          });
      } finally {
        setProcessingSignUp(false);
      }
    },
    [],
  );

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setProcessingSignIn(true);
      await auth().signInWithEmailAndPassword(email, password);
    } finally {
      setProcessingSignIn(false);
    }
  }, []);

  const updateProfileImage = useCallback(
    async (filepath: string) => {
      if (user == null) {
        throw new Error('User is undefined');
      }
      const filename = _.last(filepath.split('/'));

      if (filename == null) {
        throw new Error('filename is undefined');
      }

      const storageFilepath = `users/${user.userId}/${filename}`;
      await storage().ref(storageFilepath).putFile(filepath);
      const url = await storage().ref(storageFilepath).getDownloadURL();
      await auth().currentUser?.updateProfile({photoURL: url});
      await firestore().collection(Collections.USERS).doc(user.userId).update({
        profileUrl: url,
      });
    },
    [user],
  );

  const addFcmToken = useCallback(
    async (token: string) => {
      if (user != null) {
        await firestore()
          .collection(Collections.USERS)
          .doc(user.userId)
          .update({
            fcmTokens: firestore.FieldValue.arrayUnion(token),
          });
      }
    },
    [user],
  );

  const value = useMemo(() => {
    return {
      initialized,
      user,
      signUp,
      processingSignUp,
      signIn,
      processingSignIn,
      updateProfileImage,
      addFcmToken,
    };
  }, [
    initialized,
    user,
    signUp,
    processingSignUp,
    signIn,
    processingSignIn,
    updateProfileImage,
    addFcmToken,
  ]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
