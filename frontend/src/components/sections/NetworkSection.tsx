import { Users, Globe, Building2, Award } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollAnimation } from "../ui/scroll-animation";

export function NetworkSection() {
  return (
    <section id="network" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollAnimation direction="up" delay={0.2}>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Network & Community
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with our community, partners, and stakeholders
          </p>
        </div>
      </ScrollAnimation>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Community Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Connect with fellow members and collaborate on initiatives.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              View Members
            </button>
          </CardFooter>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Building2 className="w-8 h-8 text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Explore our network of organizational partners and collaborators.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
              View Partners
            </button>
          </CardFooter>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Globe className="w-8 h-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Global Network</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Access our international network and global connections.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Explore Network
            </button>
          </CardFooter>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Award className="w-8 h-8 text-orange-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Alumni</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Stay connected with our alumni network and former members.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
              Alumni Portal
            </button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
