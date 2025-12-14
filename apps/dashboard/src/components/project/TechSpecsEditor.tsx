"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";

interface Spec {
  label: string;
  value: string;
  tooltip?: string;
}

interface TechSpecCategory {
  category: string;
  specs: Spec[];
}

interface TechSpecsEditorProps {
  technicalSpecs: TechSpecCategory[];
  onChange: (specs: TechSpecCategory[]) => void;
}

export function TechSpecsEditor({ technicalSpecs, onChange }: TechSpecsEditorProps) {
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [editingSpecIndex, setEditingSpecIndex] = useState<number | null>(null);

  const addCategory = () => {
    const newCategory: TechSpecCategory = {
      category: "",
      specs: [],
    };
    onChange([...technicalSpecs, newCategory]);
    setEditingCategoryIndex(technicalSpecs.length);
  };

  const updateCategory = (index: number, category: string) => {
    const updated = technicalSpecs.map((cat, i) =>
      i === index ? { ...cat, category } : cat
    );
    onChange(updated);
  };

  const removeCategory = (index: number) => {
    onChange(technicalSpecs.filter((_, i) => i !== index));
    if (editingCategoryIndex === index) setEditingCategoryIndex(null);
  };

  const addSpec = (categoryIndex: number) => {
    const updated = [...technicalSpecs];
    updated[categoryIndex].specs.push({ label: "", value: "", tooltip: "" });
    onChange(updated);
  };

  const updateSpec = (categoryIndex: number, specIndex: number, updates: Partial<Spec>) => {
    const updated = [...technicalSpecs];
    updated[categoryIndex].specs[specIndex] = {
      ...updated[categoryIndex].specs[specIndex],
      ...updates,
    };
    onChange(updated);
  };

  const removeSpec = (categoryIndex: number, specIndex: number) => {
    const updated = [...technicalSpecs];
    updated[categoryIndex].specs = updated[categoryIndex].specs.filter((_, i) => i !== specIndex);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {technicalSpecs.map((category, catIndex) => {
        const isEditingCategory = editingCategoryIndex === catIndex;

        return (
          <div key={catIndex} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              {isEditingCategory ? (
                <input
                  type="text"
                  value={category.category}
                  onChange={(e) => updateCategory(catIndex, e.target.value)}
                  placeholder="Category name..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="flex-1 font-medium text-gray-900">
                  {category.category || `Category ${catIndex + 1}`}
                </span>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategoryIndex(isEditingCategory ? null : catIndex)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {isEditingCategory ? 'Done' : 'Edit'}
                </button>
                <button
                  type="button"
                  onClick={() => removeCategory(catIndex)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Specs within category */}
            <div className="ml-8 space-y-3">
              {category.specs.map((spec, specIndex) => (
                <div key={specIndex} className="bg-white rounded p-3 border border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => updateSpec(catIndex, specIndex, { label: e.target.value })}
                        placeholder="e.g., Response Time"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateSpec(catIndex, specIndex, { value: e.target.value })}
                        placeholder="e.g., < 100ms"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tooltip (optional)
                      </label>
                      <input
                        type="text"
                        value={spec.tooltip || ""}
                        onChange={(e) => updateSpec(catIndex, specIndex, { tooltip: e.target.value })}
                        placeholder="Additional info..."
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeSpec(catIndex, specIndex)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove Spec
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addSpec(catIndex)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Spec
              </button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addCategory}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Plus className="w-4 h-4" />
        Add Category
      </button>
    </div>
  );
}
