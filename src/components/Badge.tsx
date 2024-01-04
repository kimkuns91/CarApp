import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from './Typography';

const styles = StyleSheet.create({
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
  },
});

const Badge: React.FC<{
  children: ReactElement;
  count?: number;
}> = props => {
  return (
    <View>
      {props.children}
      <View style={styles.badge}>
        {props.count && (
          <Typography fontSize={10} color="white">
            {props.count.toString()}
          </Typography>
        )}
      </View>
    </View>
  );
};

export default Badge;
