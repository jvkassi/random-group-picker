import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Switch } from './ui/Switch';
import type { Group } from '../types';

interface GroupListProps {
  groups: Group[];
  onToggleInhibit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function GroupList({ groups, onToggleInhibit, onDelete }: GroupListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            backgroundColor: group.inhibited ? '#9CA3AF' : group.color,
            transition: 'background-color 0.2s ease-in-out'
          }}
          className="p-4 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{group.emoji}</span>
              <h3 className="text-lg font-semibold text-white">{group.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={!group.inhibited}
                onChange={() => onToggleInhibit(group.id)}
                size="sm"
              />
              <button
                onClick={() => onDelete(group.id)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Delete group"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}