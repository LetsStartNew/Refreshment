
import React from "react";
import { Button } from "@/components/ui/button";
import { User, MapPin, Package, Bell, Settings } from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfileSidebarProps {
  user: SupabaseUser;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => Promise<void>;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ 
  user, 
  activeTab, 
  onTabChange, 
  onSignOut 
}) => {
  return (
    <div className="w-full md:w-1/4">
      <ProfileHeader user={user} onSignOut={onSignOut} />
      <div className="mt-6 space-y-2">
        <Button 
          variant={activeTab === "overview" ? "default" : "ghost"} 
          className="w-full justify-start" 
          onClick={() => onTabChange("overview")}
        >
          <User className="mr-2 h-4 w-4" /> Overview
        </Button>
        <Button 
          variant={activeTab === "addresses" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => onTabChange("addresses")}
        >
          <MapPin className="mr-2 h-4 w-4" /> Addresses
        </Button>
        <Button 
          variant={activeTab === "orders" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => onTabChange("orders")}
        >
          <Package className="mr-2 h-4 w-4" /> Orders
        </Button>
        <Button 
          variant={activeTab === "notifications" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => onTabChange("notifications")}
        >
          <Bell className="mr-2 h-4 w-4" /> Notifications
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground"
        >
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
