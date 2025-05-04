
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Edit, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import EditProfileForm from "./EditProfileForm";

interface ProfileHeaderProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onSignOut }) => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const userInitials = user.email ? user.email.substring(0, 2).toUpperCase() : "U";
  const displayName = user.user_metadata.name || user.email;

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{displayName}</h2>
            <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
            <Button variant="outline" size="sm" className="w-full mb-2" onClick={() => setEditProfileOpen(true)}>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={onSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Sheet open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <EditProfileForm 
              user={user} 
              onSuccess={() => setEditProfileOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileHeader;
