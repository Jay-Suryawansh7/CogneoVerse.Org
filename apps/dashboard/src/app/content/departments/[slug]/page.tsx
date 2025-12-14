"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { fetchWithAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function DepartmentEditPage() {
  const { getToken } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === "new";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    published: false,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;

    async function loadData() {
      try {
        const token = await getToken();
        const data = await fetchWithAuth(`/departments/${slug}/`, token);
        setFormData({
          title: data.title,
          description: data.description,
          published: data.published,
        });
      } catch (error) {
        console.error("Failed to load department", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug, isNew, getToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = await getToken();
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/departments/" : `/departments/${slug}/`;
      
      await fetchWithAuth(url, token, {
        method,
        body: JSON.stringify(formData),
      });

      router.push("/content/departments");
    } catch (error) {
      console.error("Failed to save department", error);
      alert("Failed to save department");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{isNew ? "New Department" : "Edit Department"}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">Published</label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
