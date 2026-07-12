import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
  size?: 'sm' | 'md';
}
