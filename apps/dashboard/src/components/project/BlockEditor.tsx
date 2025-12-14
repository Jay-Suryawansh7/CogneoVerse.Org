"use client";

import { useState } from "react";
import { Plus, X, GripVertical, FileText, Image, Video, File } from "lucide-react";

interface ContentBlock {
  type: 'text' | 'image' | 'video' | 'file';
  content?: string;
  url?: string;
  caption?: string;
  title?: string;
  name?: string;
  size?: string;
}

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = { type };
    onChange([...blocks, newBlock]);
    setEditingIndex(blocks.length);
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const updated = blocks.map((block, i) =>
      i === index ? { ...block, ...updates } : block
    );
    onChange(updated);
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const updated = [...blocks];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'text': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'file': return File;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-4">
      {/* Block List */}
      {blocks.map((block, index) => {
        const Icon = getBlockIcon(block.type);
        const isEditing = editingIndex === index;

        return (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              <Icon className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900 capitalize">{block.type} Block</span>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === blocks.length - 1}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => setEditingIndex(isEditing ? null : index)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {isEditing ? 'Done' : 'Edit'}
                </button>
                <button
                  onClick={() => removeBlock(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isEditing && (
              <div className="space-y-3 mt-4">
                {block.type === 'text' && (
                  <textarea
                    value={block.content || ''}
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    placeholder="Enter text content..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {(block.type === 'image' || block.type === 'video' || block.type === 'file') && (
                  <>
                    <input
                      type="text"
                      value={block.url || ''}
                      onChange={(e) => updateBlock(index, { url: e.target.value })}
                      placeholder="Enter URL..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={block.title || ''}
                      onChange={(e) => updateBlock(index, { title: e.target.value })}
                      placeholder="Title (optional)..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {block.type === 'image' && (
                      <input
                        type="text"
                        value={block.caption || ''}
                        onChange={(e) => updateBlock(index, { caption: e.target.value })}
                        placeholder="Caption (optional)..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                    {block.type === 'file' && (
                      <>
                        <input
                          type="text"
                          value={block.name || ''}
                          onChange={(e) => updateBlock(index, { name: e.target.value })}
                          placeholder="File name..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={block.size || ''}
                          onChange={(e) => updateBlock(index, { size: e.target.value })}
                          placeholder="File size (e.g., 2.5 MB)..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {!isEditing && (
              <div className="text-sm text-gray-600 ml-8">
                {block.type === 'text' && (
                  <p className="line-clamp-2">{block.content || 'No content'}</p>
                )}
                {(block.type === 'image' || block.type === 'video' || block.type === 'file') && (
                  <p className="truncate">{block.url || 'No URL set'}</p>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Add Block Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addBlock('text')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Plus className="w-4 h-4" />
          Text Block
        </button>
        <button
          onClick={() => addBlock('image')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Plus className="w-4 h-4" />
          Image Block
        </button>
        <button
          onClick={() => addBlock('video')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Plus className="w-4 h-4" />
          Video Block
        </button>
        <button
          onClick={() => addBlock('file')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Plus className="w-4 h-4" />
          File Block
        </button>
      </div>
    </div>
  );
}
