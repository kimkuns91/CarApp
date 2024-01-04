import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type IconName = string;

const Icon: React.FC<{
  name: IconName;
  size: number;
  color: string;
}> = props => {
  return <Ionicons name={props.name} size={props.size} color={props.color} />;
};

export default Icon;
