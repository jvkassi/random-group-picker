import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { getRandomItem } from './lib/random';
import { Group } from './types';
import { GroupList } from './components/GroupList';
import { AddGroupForm } from './components/AddGroupForm';
import { WinnerDisplay } from './components/WinnerDisplay';
import { AuthForm } from './components/AuthForm';
import { Trophy } from 'lucide-react';

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [winner, setWinner] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchGroups();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchGroups() {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching groups:', error);
    } else {
      setGroups(data || []);
    }
    setLoading(false);
  }

  async function addGroup(name: string, emoji: string, color: string) {
    const { error } = await supabase
      .from('groups')
      .insert([{ name, emoji, color, user_id: user?.id }]);

    if (error) {
      console.error('Error adding group:', error);
    } else {
      fetchGroups();
    }
  }

  async function toggleInhibit(id: string) {
    const group = groups.find(g => g.id === id);
    if (!group) return;

    const { error } = await supabase
      .from('groups')
      .update({ inhibited: !group.inhibited })
      .eq('id', id);

    if (error) {
      console.error('Error updating group:', error);
    } else {
      fetchGroups();
    }
  }

  async function deleteGroup(id: string) {
    const { error } = await supabase
      .from('groups')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting group:', error);
    } else {
      fetchGroups();
    }
  }

  function pickWinner() {
    const activeGroups = groups.filter(group => !group.inhibited);
    const selected = getRandomItem(activeGroups);
    if (selected) {
      setWinner(selected);
      setTimeout(() => setWinner(null), 3000);
    }
  }

  if (!user) {
    return <AuthForm onAuthSuccess={() => fetchGroups()} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Random Group Picker</h1>
          <button
            onClick={pickWinner}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Pick Winner
          </button>
        </div>

        <AddGroupForm onAdd={addGroup} />
        
        <GroupList
          groups={groups}
          onToggleInhibit={toggleInhibit}
          onDelete={deleteGroup}
        />

        <WinnerDisplay winner={winner} />
      </div>
    </div>
  );
}

export default App;