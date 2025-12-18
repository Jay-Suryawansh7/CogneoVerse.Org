"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Settings as SettingsIcon, Bell, Lock, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your application settings and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">General Settings</h2>
              <p className="text-gray-600 text-sm">Configure basic application settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input 
                type="text" 
                defaultValue="Cogneoverse"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
              <textarea 
                rows={3}
                defaultValue="Enterprise-grade organizational platform"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="text-gray-600 text-sm">Manage notification preferences</p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-gray-700">Content updates</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-700">Marketing emails</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Security</h2>
              <p className="text-gray-600 text-sm">Manage security and authentication</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Security settings are managed through Clerk. Visit the Clerk dashboard to configure authentication methods, MFA, and security policies.
          </p>
          <a 
            href="https://dashboard.clerk.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Clerk Security Settings
          </a>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
