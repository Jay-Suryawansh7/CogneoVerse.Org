"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { fetchWithAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { MediaUpload } from "@/components/project/MediaUpload";
import { BlockEditor } from "@/components/project/BlockEditor";
import { FeatureEditor } from "@/components/project/FeatureEditor";
import { TechSpecsEditor } from "@/components/project/TechSpecsEditor";
import { UseCaseEditor } from "@/components/project/UseCaseEditor";
import { TeamEditor } from "@/components/project/TeamEditor";
import { RoadmapEditor } from "@/components/project/RoadmapEditor";

interface Department {
  id: number;
  title: string;
}

interface ContentBlock {
  type: 'text' | 'image' | 'video' | 'file';
  content?: string;
  url?: string;
  caption?: string;
  title?: string;
  name?: string;
  size?: string;
}

export default function ProjectEditPage() {
  const { getToken } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === "new";

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    status: "planned",
    tags: "",
    department_ids: [] as number[],
    images: [] as string[],
    blocks: [] as ContentBlock[],
    // New rich content fields
    tagline: "",
    primary_cta: { label: "", href: "", variant: "primary" as const, external: false, prefetch: false },
    secondary_cta: { label: "", href: "", variant: "secondary" as const, external: false, prefetch: false },
    about: { problem: "", solution: "", impact: "" },
    features: [] as any[],
    previews: [] as any[],
    technical_specs: [] as any[],
    use_cases: [] as any[],
    team: [] as any[],
    roadmap: [] as any[],
    related_projects_data: [] as number[],
    platform_metadata: { platforms: [] as string[], compatibility: [] as string[], license: "", repository: "" },
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);



  useEffect(() => {
    async function loadData() {
      try {
        const token = await getToken();
        
        // Parallel fetching of departments and project data
        const [deptData, projectData] = await Promise.all([
          fetchWithAuth("/departments/", token),
          isNew ? Promise.resolve(null) : fetchWithAuth(`/projects/${slug}/`, token)
        ]);

        if (deptData) {
          setDepartments(deptData.results || deptData);
        }

        if (projectData) {
          const data = projectData;
          setFormData({
            title: data.title,
            summary: data.summary,
            status: data.status,
            tags: (data.tags || []).join(", "),
            department_ids: (data.related_departments || []).map((d: any) => d.id),
            images: data.images || [],
            blocks: data.blocks || [],
            tagline: data.tagline || "",
            primary_cta: data.primary_cta || { label: "", href: "", variant: "primary", external: false, prefetch: false },
            secondary_cta: data.secondary_cta || { label: "", href: "", variant: "secondary", external: false, prefetch: false },
            about: data.about || { problem: "", solution: "", impact: "" },
            features: data.features || [],
            previews: data.previews || [],
            technical_specs: data.technical_specs || [],
            use_cases: data.use_cases || [],
            team: data.team || [],
            roadmap: data.roadmap || [],
            related_projects_data: data.related_projects_data || [],
            platform_metadata: {
              platforms: data.platform_metadata?.platforms || [],
              compatibility: data.platform_metadata?.compatibility || [],
              license: data.platform_metadata?.license || "",
              repository: data.platform_metadata?.repository || ""
            },
          });
        }
      } catch (error) {
        console.error("Failed to load project data", error);
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
      const url = isNew ? "/projects/" : `/projects/${slug}/`;
      
      const payload = {
        title: formData.title,
        summary: formData.summary,
        status: formData.status,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        department_ids: formData.department_ids,
        images: formData.images,
        blocks: formData.blocks,
        // New fields
        tagline: formData.tagline,
        primary_cta: formData.primary_cta,
        secondary_cta: formData.secondary_cta,
        about: formData.about,
        features: formData.features,
        previews: formData.previews,
        technical_specs: formData.technical_specs,
        use_cases: formData.use_cases,
        team: formData.team,
        roadmap: formData.roadmap,
        related_projects_data: formData.related_projects_data,
        platform_metadata: formData.platform_metadata,
      };

      await fetchWithAuth(url, token, {
        method,
        body: JSON.stringify(payload),
      });

      router.push("/content/projects");
    } catch (error) {
      console.error("Failed to save project", error);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const toggleDepartment = (deptId: number) => {
    setFormData((prev) => ({
      ...prev,
      department_ids: prev.department_ids.includes(deptId)
        ? prev.department_ids.filter((id) => id !== deptId)
        : [...prev.department_ids, deptId],
    }));
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = await getToken();
      await fetchWithAuth(`/projects/${slug}/`, token, {
        method: "DELETE",
      });
      router.push("/content/projects");
    } catch (error) {
      console.error("Failed to delete project", error);
      alert("Failed to delete project. Please try again.");
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{isNew ? "New Project" : "Edit Project"}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="technology, innovation, research"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign to Departments
              </label>
              <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto">
                {departments.map((dept) => (
                  <label key={dept.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={formData.department_ids.includes(dept.id)}
                      onChange={() => toggleDepartment(dept.id)}
                    />
                    <span className="text-gray-700">{dept.title}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Media Gallery Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Image Gallery</h2>
            <MediaUpload
              onUpload={(urls) => setFormData({ ...formData, images: urls })}
              existingMedia={formData.images}
              maxFiles={20}
            />
          </div>

          {/* Content Blocks Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Blocks</h2>
            <p className="text-sm text-gray-600 mb-4">
              Add text, images, videos, and files to build rich project content
            </p>
            <BlockEditor
              blocks={formData.blocks}
              onChange={(blocks) => setFormData({ ...formData, blocks })}
            />
          </div>

          {/* Tagline & CTAs Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Tagline & Call-to-Actions</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="A compelling tagline for the project..."
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Primary CTA</h3>
                <input
                  type="text"
                  placeholder="Button label"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.primary_cta.label}
                  onChange={(e) => setFormData({ ...formData, primary_cta: { ...formData.primary_cta, label: e.target.value }})}
                />
                <input
                  type="text"
                  placeholder="URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.primary_cta.href}
                  onChange={(e) => setFormData({ ...formData, primary_cta: { ...formData.primary_cta, href: e.target.value }})}
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={formData.primary_cta.external}
                    onChange={(e) => setFormData({ ...formData, primary_cta: { ...formData.primary_cta, external: e.target.checked }})}
                  />
                  <span className="text-sm text-gray-700">External link</span>
                </label>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Secondary CTA</h3>
                <input
                  type="text"
                  placeholder="Button label"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.secondary_cta.label}
                  onChange={(e) => setFormData({ ...formData, secondary_cta: { ...formData.secondary_cta, label: e.target.value }})}
                />
                <input
                  type="text"
                  placeholder="URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.secondary_cta.href}
                  onChange={(e) => setFormData({ ...formData, secondary_cta: { ...formData.secondary_cta, href: e.target.value }})}
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={formData.secondary_cta.external}
                    onChange={(e) => setFormData({ ...formData, secondary_cta: { ...formData.secondary_cta, external: e.target.checked }})}
                  />
                  <span className="text-sm text-gray-700">External link</span>
                </label>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">About Section</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Problem</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What problem does this project solve?"
                value={formData.about.problem}
                onChange={(e) => setFormData({ ...formData, about: { ...formData.about, problem: e.target.value }})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How does this project solve the problem?"
                value={formData.about.solution}
                onChange={(e) => setFormData({ ...formData, about: { ...formData.about, solution: e.target.value }})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What impact has this project had?"
                value={formData.about.impact}
                onChange={(e) => setFormData({ ...formData, about: { ...formData.about, impact: e.target.value }})}
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
            <FeatureEditor
              features={formData.features}
              onChange={(features) => setFormData({ ...formData, features })}
            />
          </div>

          {/* Technical Specs Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h2>
            <TechSpecsEditor
              technicalSpecs={formData.technical_specs}
              onChange={(technical_specs) => setFormData({ ...formData, technical_specs })}
            />
          </div>

          {/* Use Cases Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Use Cases</h2>
            <UseCaseEditor
              useCases={formData.use_cases}
              onChange={(use_cases) => setFormData({ ...formData, use_cases })}
            />
          </div>

          {/* Team Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Members</h2>
            <TeamEditor
              team={formData.team}
              onChange={(team) => setFormData({ ...formData, team })}
            />
          </div>

          {/* Roadmap Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Roadmap</h2>
            <RoadmapEditor
              roadmap={formData.roadmap}
              onChange={(roadmap) => setFormData({ ...formData, roadmap })}
            />
          </div>

          {/* Platform Metadata Section */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Platform Metadata</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platforms (comma-separated)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Web, iOS, Android, Desktop"
                value={formData.platform_metadata.platforms.join(", ")}
                onChange={(e) => setFormData({ ...formData, platform_metadata: { ...formData.platform_metadata, platforms: e.target.value.split(",").map(p => p.trim()).filter(Boolean) }})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compatibility (comma-separated)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Chrome 90+, Safari 14+, Firefox 88+"
                value={formData.platform_metadata.compatibility.join(", ")}
                onChange={(e) => setFormData({ ...formData, platform_metadata: { ...formData.platform_metadata, compatibility: e.target.value.split(",").map(c => c.trim()).filter(Boolean) }})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., MIT"
                  value={formData.platform_metadata.license}
                  onChange={(e) => setFormData({ ...formData, platform_metadata: { ...formData.platform_metadata, license: e.target.value }})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repository</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="GitHub URL"
                  value={formData.platform_metadata.repository}
                  onChange={(e) => setFormData({ ...formData, platform_metadata: { ...formData.platform_metadata, repository: e.target.value }})}
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex justify-between items-center pt-4">
            {/* Delete button - only show when editing existing project */}
            {!isNew && (
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete Project
              </button>
            )}
            
            {/* Right side actions */}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Project
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{formData.title}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
