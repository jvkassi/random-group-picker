import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const EMOJIS = ['🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎫', '🎬', '🎤', '🎧'];
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B6B9B', '#77A6F7', '#FFBE0B', '#3A86FF'
];

interface AddGroupFormProps {
  onAdd: (name: string, emoji: string, color: string) => void;
}

export function AddGroupForm({ onAdd }: AddGroupFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      onAdd(name.trim(), randomEmoji, randomColor);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter group name"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Group
      </button>
    </form>
  );
}