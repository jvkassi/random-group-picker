import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  size?: 'sm' | 'md';
}

export function Switch({ checked, onChange, size = 'md' }: SwitchProps) {
  const sizes = {
    sm: { width: 'w-8', height: 'h-4', circle: 'w-3 h-3' },
    md: { width: 'w-11', height: 'h-6', circle: 'w-5 h-5' },
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`
        ${sizes[size].width} ${sizes[size].height}
        flex items-center rounded-full p-0.5
        ${checked ? 'bg-green-500' : 'bg-gray-400'}
        transition-colors duration-200 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      `}
    >
      <motion.div
        className={`${sizes[size].circle} bg-white rounded-full shadow-sm`}
        animate={{ x: checked ? '100%' : '0%' }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}