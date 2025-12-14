import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // I need to create this or use a placeholder
// Since I haven't installed shadcn/ui components yet, I'll use simple divs for now or create a basic Card component.
// I'll create a basic Card component in `src/components/ui/card.tsx` quickly to avoid errors.

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Departments</h3>
          <div className="mt-2 text-3xl font-bold text-gray-900">12</div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <div className="mt-2 text-3xl font-bold text-gray-900">24</div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Media Items</h3>
          <div className="mt-2 text-3xl font-bold text-gray-900">1,234</div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Users</h3>
          <div className="mt-2 text-3xl font-bold text-gray-900">5</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
