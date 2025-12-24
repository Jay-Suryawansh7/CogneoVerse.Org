"use client";

import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignInPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect admins to dashboard after sign-in
    if (isSignedIn && user?.publicMetadata?.role === "admin") {
      window.location.href = "http://localhost:3000";
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 relative">
      <style jsx global>{`
        .cl-socialButtonsIconButton__discord,
        .cl-socialButtonsIconButton__github,
        .cl-socialButtonsIconButton__google {
          filter: brightness(0) invert(1) !important;
        }
        .cl-internal-icon {
          color: white !important;
          filter: brightness(0) invert(1) !important;
        }
        .cl-socialButtonsProviderIcon__discord,
        .cl-socialButtonsProviderIcon__github, 
        .cl-socialButtonsProviderIcon__google {
          filter: brightness(0) invert(1) !important;
        }
      `}</style>
      
      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <MagicCard 
        className="p-8 md:p-12 flex flex-col items-center justify-center shadow-2xl rounded-3xl"
        gradientColor="#9E7AFF"
        gradientOpacity={0.2}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 font-planetary-contact">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue your journey</p>
        </div>
        <SignIn 
          appearance={{
            layout: {
              socialButtonsPlacement: "top",
              socialButtonsVariant: "blockButton",
            },
            variables: {
              colorPrimary: "#9333ea",
              colorText: "#ffffff",
              colorBackground: "transparent",
              colorInputBackground: "rgba(255, 255, 255, 0.05)",
              colorInputText: "#ffffff",
              colorTextSecondary: "#e5e7eb",
              colorDanger: "#ef4444",
              fontSize: "14px",
              colorNeutral: "#ffffff",
              colorShimmer: "#ffffff",
            },
            elements: {
              rootBox: "mx-auto w-full",
              card: "bg-transparent shadow-none p-0 w-full",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              main: "gap-4",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white !shadow-none font-medium",
              formFieldInput: "bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500",
              formFieldLabel: "text-gray-200 font-medium mb-2",
              footer: "hidden",
              footerActionLink: "text-purple-400 hover:text-purple-300",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-purple-400 hover:text-purple-300",
              socialButtonsBlockButton: "bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all [&_svg]:text-white [&_svg]:fill-white",
              socialButtonsBlockButtonText: "!text-white !font-medium",
              socialButtonsIconButton: "bg-white/10 border border-white/20 hover:bg-white/20 [&_svg]:text-white",
              socialButtonsProviderIcon: "brightness-0 invert",
              providerIcon: "brightness-0 invert",
              dividerLine: "bg-white/20",
              dividerText: "text-gray-300",
              formFieldAction: "text-purple-400 hover:text-purple-300",
              formFieldInputShowPasswordButton: "text-gray-300 hover:text-white",
              otpCodeFieldInput: "border-white/20 text-white",
              formResendCodeLink: "text-purple-400 hover:text-purple-300",
              alertText: "text-white",
            },
          }}
          fallbackRedirectUrl="/"
          signUpUrl="/sign-up"
          forceRedirectUrl="/"
        />
        <div className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign up
          </Link>
        </div>
      </MagicCard>
    </div>
  );
}
