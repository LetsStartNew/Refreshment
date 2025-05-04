
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Package, MapPin } from "lucide-react";
import { User } from "@supabase/supabase-js";
import EditProfileForm from "../EditProfileForm";
import { Address } from "@/types/address";

interface OrderPreview {
  id: string;
  date: string;
  total: number;
  status: string;
}

interface OverviewTabProps {
  user: User;
  recentOrders: OrderPreview[];
  defaultAddress?: Address;
  onViewAllOrders: () => void;
  onManageAddresses: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  user, 
  recentOrders, 
  defaultAddress,
  onViewAllOrders, 
  onManageAddresses 
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Full Name</p>
              <p>{user.user_metadata.name || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
              <p>{user.phone || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Member Since</p>
              <p>{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Update Information
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Information</DialogTitle>
          </DialogHeader>
          <EditProfileForm 
            user={user} 
            onSuccess={() => setEditDialogOpen(false)} 
            onCancel={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.slice(0, 2).map((order) => (
              <div key={order.id} className="border rounded-md p-3">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{order.id}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{order.date}</p>
                <p className="text-sm font-medium mt-1">₹{order.total}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" onClick={onViewAllOrders}>
              View All Orders
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Default Address</CardTitle>
          </CardHeader>
          <CardContent>
            {defaultAddress ? (
              <div className="border rounded-md p-3">
                <p className="font-medium">{defaultAddress.name}</p>
                <p className="text-sm mt-1">{defaultAddress.street}</p>
                <p className="text-sm">{defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}</p>
                {defaultAddress.landmark && <p className="text-sm text-muted-foreground">{defaultAddress.landmark}</p>}
                <p className="text-sm mt-1">Phone: {defaultAddress.phone}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 border border-dashed rounded-md">
                <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-sm">No default address set</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" onClick={onManageAddresses}>
              Manage Addresses
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
