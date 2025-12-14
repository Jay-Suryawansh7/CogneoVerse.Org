"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  bio: string;
}

interface TeamEditorProps {
  team: TeamMember[];
  onChange: (team: TeamMember[]) => void;
}

export function TeamEditor({ team, onChange }: TeamEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addMember = () => {
    const newId = team.length > 0 ? Math.max(...team.map(m => m.id)) + 1 : 1;
    const newMember: TeamMember = {
      id: newId,
      name: "",
      role: "",
      department: "",
      bio: "",
    };
    onChange([...team, newMember]);
    setEditingIndex(team.length);
  };

  const updateMember = (index: number, updates: Partial<TeamMember>) => {
    const updated = team.map((member, i) =>
      i === index ? { ...member, ...updates } : member
    );
    onChange(updated);
  };

  const removeMember = (index: number) => {
    onChange(team.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const moveMember = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= team.length) return;

    const updated = [...team];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {team.map((member, index) => {
        const isEditing = editingIndex === index;

        return (
          <div key={member.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              <div className="flex-1">
                <span className="font-medium text-gray-900">
                  {member.name || `Team Member ${index + 1}`}
                </span>
                {member.role && (
                  <span className="ml-2 text-sm text-gray-500">• {member.role}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveMember(index, 'up')}
                  disabled={index === 0}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveMember(index, 'down')}
                  disabled={index === team.length - 1}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setEditingIndex(isEditing ? null : index)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {isEditing ? 'Done' : 'Edit'}
                </button>
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isEditing && (
              <div className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(index, { name: e.target.value })}
                      placeholder="Full name..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => updateMember(index, { role: e.target.value })}
                      placeholder="e.g., Lead Engineer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={member.department}
                    onChange={(e) => updateMember(index, { department: e.target.value })}
                    placeholder="e.g., Engineering"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={member.bio}
                    onChange={(e) => updateMember(index, { bio: e.target.value })}
                    placeholder="Brief bio..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {!isEditing && member.bio && (
              <div className="text-sm text-gray-600 ml-8">
                <p className="line-clamp-1">{member.bio}</p>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addMember}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Plus className="w-4 h-4" />
        Add Team Member
      </button>
    </div>
  );
}
