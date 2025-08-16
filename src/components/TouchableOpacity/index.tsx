import React from 'react';
import {TouchableOpacity as Touch, TouchableOpacityProps} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const TouchableOpacity: React.FC<TouchableOpacityProps & Props> = props => {
  return (
    <Touch activeOpacity={0.6} {...props}>
      {props.children}
    </Touch>
  );
};

export default TouchableOpacity;
