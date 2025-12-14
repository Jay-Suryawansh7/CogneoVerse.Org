import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollAnimation } from "../ui/scroll-animation";

export function AcademySection() {
  return (
    <section id="academy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollAnimation direction="up" delay={0.2}>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Cogneoverse Academy
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Access training programs, courses, and learning resources
          </p>
        </div>
      </ScrollAnimation>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Training Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Structured learning paths designed to enhance your skills and knowledge.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              View Programs
            </button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Online Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Self-paced courses covering various topics and disciplines.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Browse Courses
            </button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Earn certifications to validate your expertise and achievements.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              View Certifications
            </button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Resource Library</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Access a comprehensive collection of documents and materials.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Explore Library
            </button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
