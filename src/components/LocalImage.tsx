import React from 'react';
import {Image as RNImage, ImageProps, StyleProp} from 'react-native';

const LocalImage: React.FC<{
  localAsset: number;
  width: number;
  height: number;
  style?: StyleProp<ImageProps>;
}> = props => {
  return (
    <RNImage
      source={props.localAsset}
      style={[
        props.style,
        {
          width: props.width,
          height: props.height,
        },
      ]}
    />
  );
};

export default LocalImage;
