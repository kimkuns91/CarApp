import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // Default
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AlertScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AlertScreen</Text>
    </View>
  );
};

export default AlertScreen;
