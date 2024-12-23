import React from 'react';
import { motion } from 'framer-motion';
import type { Group } from '../types';

interface WinnerDisplayProps {
  winner: Group | null;
}

export function WinnerDisplay({ winner }: WinnerDisplayProps) {
  if (!winner) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-8 rounded-lg shadow-xl text-center"
        style={{ backgroundColor: winner.color }}
      >
        <div className="text-6xl mb-4">{winner.emoji}</div>
        <h2 className="text-3xl font-bold text-white mb-2">Winner!</h2>
        <p className="text-xl text-white">{winner.name}</p>
      </motion.div>
    </motion.div>
  );
}