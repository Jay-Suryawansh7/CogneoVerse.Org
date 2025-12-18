"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";

// Icon options for features
const ICON_OPTIONS = [
  "Zap", "Shield", "Users", "Sparkles", "Smartphone", "Puzzle",
  "Rocket", "Lock", "Globe", "Code", "Database", "Cloud"
];

interface Feature {
  icon: string;
  title: string;
  description: string;
  valueProposition: string;
}

interface FeatureEditorProps {
  features: Feature[];
  onChange: (features: Feature[]) => void;
}

export function FeatureEditor({ features, onChange }: FeatureEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addFeature = () => {
    const newFeature: Feature = {
      icon: "Zap",
      title: "",
      description: "",
      valueProposition: "",
    };
    onChange([...features, newFeature]);
    setEditingIndex(features.length);
  };

  const updateFeature = (index: number, updates: Partial<Feature>) => {
    const updated = features.map((feature, i) =>
      i === index ? { ...feature, ...updates } : feature
    );
    onChange(updated);
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= features.length) return;

    const updated = [...features];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {features.map((feature, index) => {
        const isEditing = editingIndex === index;

        return (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              <span className="font-medium text-gray-900">
                {feature.title || `Feature ${index + 1}`}
              </span>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => moveFeature(index, 'up')}
                  disabled={index === 0}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveFeature(index, 'down')}
                  disabled={index === features.length - 1}
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
                  onClick={() => removeFeature(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isEditing && (
              <div className="space-y-3 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    value={feature.icon}
                    onChange={(e) => updateFeature(index, { icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, { title: e.target.value })}
                    placeholder="Feature title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(index, { description: e.target.value })}
                    placeholder="Feature description..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value Proposition
                  </label>
                  <input
                    type="text"
                    value={feature.valueProposition}
                    onChange={(e) => updateFeature(index, { valueProposition: e.target.value })}
                    placeholder="e.g., 3x faster than competitors..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="text-sm text-gray-600 ml-8">
                <p className="line-clamp-2">{feature.description || 'No description'}</p>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addFeature}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Plus className="w-4 h-4" />
        Add Feature
      </button>
    </div>
  );
}
