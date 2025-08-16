import React from 'react';

import {BaseToastProps} from '../types';
import {BaseToast} from './BaseToast';
import TickIcon from '@icons/tick.svg';

export function SuccessToast(props: BaseToastProps) {
  return (
    <BaseToast
      style={{borderLeftColor: '#69C779'}}
      {...props}
      renderLeadingIcon={() => <TickIcon />}
    />
  );
}
