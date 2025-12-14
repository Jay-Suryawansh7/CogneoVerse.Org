"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";

const ICON_OPTIONS = [
  "Building2", "Rocket", "Code2", "GraduationCap", "Users", "Globe",
  "Sparkles", "Target", "Briefcase", "Heart"
];

interface UseCase {
  id: number;
  title: string;
  description: string;
  icon: string;
  audience: string;
}

interface UseCaseEditorProps {
  useCases: UseCase[];
  onChange: (useCases: UseCase[]) => void;
}

export function UseCaseEditor({ useCases, onChange }: UseCaseEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addUseCase = () => {
    const newId = useCases.length > 0 ? Math.max(...useCases.map(u => u.id)) + 1 : 1;
    const newUseCase: UseCase = {
      id: newId,
      title: "",
      description: "",
      icon: "Building2",
      audience: "",
    };
    onChange([...useCases, newUseCase]);
    setEditingIndex(useCases.length);
  };

  const updateUseCase = (index: number, updates: Partial<UseCase>) => {
    const updated = useCases.map((useCase, i) =>
      i === index ? { ...useCase, ...updates } : useCase
    );
    onChange(updated);
  };

  const removeUseCase = (index: number) => {
    onChange(useCases.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const moveUseCase = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= useCases.length) return;

    const updated = [...useCases];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {useCases.map((useCase, index) => {
        const isEditing = editingIndex === index;

        return (
          <div key={useCase.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              <span className="font-medium text-gray-900">
                {useCase.title || `Use Case ${index + 1}`}
              </span>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => moveUseCase(index, 'up')}
                  disabled={index === 0}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveUseCase(index, 'down')}
                  disabled={index === useCases.length - 1}
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
                  onClick={() => removeUseCase(index)}
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
                      Icon
                    </label>
                    <select
                      value={useCase.icon}
                      onChange={(e) => updateUseCase(index, { icon: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Audience
                    </label>
                    <input
                      type="text"
                      value={useCase.audience}
                      onChange={(e) => updateUseCase(index, { audience: e.target.value })}
                      placeholder="e.g., 500+ employee companies"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={useCase.title}
                    onChange={(e) => updateUseCase(index, { title: e.target.value })}
                    placeholder="Use case title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={useCase.description}
                    onChange={(e) => updateUseCase(index, { description: e.target.value })}
                    placeholder="Describe how this audience uses the project..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="text-sm text-gray-600 ml-8">
                <p className="line-clamp-2">{useCase.description || 'No description'}</p>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addUseCase}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Plus className="w-4 h-4" />
        Add Use Case
      </button>
    </div>
  );
}
