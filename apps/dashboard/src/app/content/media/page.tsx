"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { fetchWithAuth } from "@/lib/api";
import { FileText, Video, FileImage, Plus } from "lucide-react";

interface MediaItem {
  id: number;
  title: string;
  type: string;
  created_at: string;
}

export default function MediaPage() {
  const { getToken } = useAuth();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const token = await getToken();
        const data = await fetchWithAuth("/media/", token);
        setMediaItems(data.results || data);
      } catch (error) {
        console.error("Failed to load media", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [getToken]);

  const getIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "image": return FileImage;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-purple-100 text-purple-700";
      case "image": return "bg-green-100 text-green-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Upload Media
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item) => {
            const Icon = getIcon(item.type);
            return (
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 shadow border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {mediaItems.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No media items found. Upload some to get started.
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
