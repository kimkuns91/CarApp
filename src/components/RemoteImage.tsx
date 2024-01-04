import React from 'react';
import {Image as RNImage, ImageProps, StyleProp} from 'react-native';

const RemoteImage: React.FC<{
  url: string;
  style?: StyleProp<ImageProps>;
  width: number;
  height: number;
}> = props => {
  return (
    <RNImage
      source={{uri: props.url}}
      style={[props.style, {width: props.width, height: props.height}]}
    />
  );
};

export default RemoteImage;
