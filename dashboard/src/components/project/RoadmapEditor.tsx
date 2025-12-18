"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";

interface RoadmapMilestone {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  date: string;
  description: string;
}

interface RoadmapEditorProps {
  roadmap: RoadmapMilestone[];
  onChange: (roadmap: RoadmapMilestone[]) => void;
}

export function RoadmapEditor({ roadmap, onChange }: RoadmapEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addMilestone = () => {
    const newId = roadmap.length > 0 ? Math.max(...roadmap.map(m => m.id)) + 1 : 1;
    const newMilestone: RoadmapMilestone = {
      id: newId,
      title: "",
      status: "planned",
      date: "",
      description: "",
    };
    onChange([...roadmap, newMilestone]);
    setEditingIndex(roadmap.length);
  };

  const updateMilestone = (index: number, updates: Partial<RoadmapMilestone>) => {
    const updated = roadmap.map((milestone, i) =>
      i === index ? { ...milestone, ...updates } : milestone
    );
    onChange(updated);
  };

  const removeMilestone = (index: number) => {
    onChange(roadmap.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const moveMilestone = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= roadmap.length) return;

    const updated = [...roadmap];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'planned': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {roadmap.map((milestone, index) => {
        const isEditing = editingIndex === index;

        return (
          <div key={milestone.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              <div className="flex-1 flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  {milestone.title || `Milestone ${index + 1}`}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                  {milestone.status}
                </span>
                {milestone.date && (
                  <span className="text-sm text-gray-500">• {milestone.date}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveMilestone(index, 'up')}
                  disabled={index === 0}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveMilestone(index, 'down')}
                  disabled={index === roadmap.length - 1}
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
                  onClick={() => removeMilestone(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isEditing && (
              <div className="space-y-3 mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) => updateMilestone(index, { title: e.target.value })}
                      placeholder="Milestone title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={milestone.status}
                      onChange={(e) => updateMilestone(index, { status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      value={milestone.date}
                      onChange={(e) => updateMilestone(index, { date: e.target.value })}
                      placeholder="e.g., Q1 2025"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={milestone.description}
                    onChange={(e) => updateMilestone(index, { description: e.target.value })}
                    placeholder="Describe this milestone..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {!isEditing && milestone.description && (
              <div className="text-sm text-gray-600 ml-8">
                <p className="line-clamp-1">{milestone.description}</p>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addMilestone}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Plus className="w-4 h-4" />
        Add Milestone
      </button>
    </div>
  );
}
