import { fetchAPI } from "@/lib/api";
import { FileText, Video, FileImage } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface MediaItem {
  id: number;
  title: string;
  type: string;
  body: string;
  author: string;
  created_at: string;
}

export async function MediaSection() {
  let mediaItems: MediaItem[] = [];

  try {
    const data = await fetchAPI("/media/");
    mediaItems = data.results || data;
  } catch (error) {
    console.error("Failed to load media", error);
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "image": return FileImage;
      default: return FileText;
    }
  };

  return (
    <section id="media" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Media Library
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Browse our collection of images, videos, and documents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map((item) => {
          const Icon = getIcon(item.type);
          return (
            <Card key={item.id} className="hover:shadow-md transition-all bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Icon className="w-6 h-6 text-gray-300" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </CardTitle>
                  <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                    {item.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 line-clamp-3">{item.body}</p>
              </CardContent>
              {item.author && (
                <CardFooter>
                  <p className="text-sm text-gray-400">By {item.author}</p>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>

      {mediaItems.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No media items available at the moment.
        </div>
      )}
    </section>
  );
}
