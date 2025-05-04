
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Component Imports
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import LoadingProfile from "@/components/profile/LoadingProfile";
import OverviewTab from "@/components/profile/tabs/OverviewTab";
import AddressesTab from "@/components/profile/tabs/AddressesTab";
import OrdersTab from "@/components/profile/tabs/OrdersTab";
import NotificationsTab from "@/components/profile/tabs/NotificationsTab";
import { Address } from "@/types/address";

// Mock Data
import { mockOrders, mockNotifications } from "@/data/mockData";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, signOut, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/signin');
      toast.error("Please sign in to view your profile");
      return;
    }

    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
        
        // Fetch addresses
        const { data: addressData, error: addressError } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false });
          
        if (addressError) throw addressError;
        setAddresses(addressData || []);
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, authLoading, navigate]);

  // Refresh profile when user changes
  useEffect(() => {
    if (user) {
      setLoading(true);
      supabase.auth.refreshSession().then(() => {
        setLoading(false);
      });
    }
  }, [user?.user_metadata, user?.email]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out. Please try again.");
    }
  };

  // Show loading state
  if (authLoading || loading) {
    return <LoadingProfile />;
  }

  // If user is not authenticated, this should redirect via the useEffect
  if (!user) return null;

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar */}
        <ProfileSidebar 
          user={user} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onSignOut={handleSignOut} 
        />

        {/* Main content */}
        <div className="w-full md:w-3/4">
          {activeTab === "overview" && (
            <OverviewTab 
              user={user}
              recentOrders={mockOrders}
              defaultAddress={addresses.find(addr => addr.is_default)}
              onViewAllOrders={() => setActiveTab("orders")}
              onManageAddresses={() => setActiveTab("addresses")}
            />
          )}

          {activeTab === "addresses" && <AddressesTab />}

          {activeTab === "orders" && <OrdersTab orders={mockOrders} />}

          {activeTab === "notifications" && <NotificationsTab notifications={mockNotifications} />}
        </div>
      </div>
    </div>
  );
}
