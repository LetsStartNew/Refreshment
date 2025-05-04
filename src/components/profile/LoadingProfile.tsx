
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingProfile: React.FC = () => {
  return (
    <div className="container-custom py-16 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-brand-blue" />
        <p className="text-xl">Loading your profile...</p>
      </div>
    </div>
  );
};

export default LoadingProfile;
