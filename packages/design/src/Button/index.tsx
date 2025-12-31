import React from 'react';
import './index.less';

export interface ButtonProps {
  type: 'primary' | 'dashed' | 'text' | 'link';
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type = 'primary', disabled = false, size = 'middle', children, onClick }) => {
  return (
    <button type="button" className={`hkx-btn hkx-btn-${type} hkx-btn-${size}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
