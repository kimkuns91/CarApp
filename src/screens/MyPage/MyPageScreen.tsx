import React, {useCallback, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AuthContext from '../../providers/AuthContext';
import Profile from '../../components/Profile';
import ImageCropPicker from 'react-native-image-crop-picker';
import Colors from '../../modules/Color';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  profile: {
    marginBottom: 10,
  },
  myProfile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myNameText: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  myEmailText: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logOutButton: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.BLUE,
  },
  logOutText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
});

const MyPageScreen = () => {
  const {user: me, updateProfileImage} = useContext(AuthContext);

  const onPressProfile = useCallback(async () => {
    const image = await ImageCropPicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
    });
    console.log('image', image);
    await updateProfileImage(image.path);
  }, [updateProfileImage]);

  const onPressLogout = useCallback(() => {
    auth().signOut();
  }, []);

  if (me == null) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.myProfile}>
        <Profile
          style={styles.profile}
          onPress={onPressProfile}
          imageUrl={me.profileUrl}
        />
        <Text style={styles.myNameText}>{me.name}</Text>
        <Text style={styles.myEmailText}>{me.email}</Text>
      </View>
      <TouchableOpacity style={styles.logOutButton} onPress={onPressLogout}>
        <Text style={styles.logOutText}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyPageScreen;
