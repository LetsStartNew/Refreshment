
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Address } from "@/types/address";
import AddressCard from "../AddressCard";
import AddressForm from "../AddressForm";

const AddressesTab: React.FC = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });

      if (error) throw error;

      setAddresses(data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (formData: Omit<Address, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .insert([
          {
            ...formData,
            user_id: user?.id,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success("Address added successfully");
      setAddresses([...addresses, data]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error("Failed to add address");
      throw error;
    }
  };

  const handleEditAddress = async (formData: Omit<Address, 'id'>) => {
    if (!currentAddress) return;

    try {
      const { error } = await supabase
        .from('addresses')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentAddress.id);

      if (error) throw error;

      toast.success("Address updated successfully");
      fetchAddresses(); // Refresh the list
      setIsEditDialogOpen(false);
      setCurrentAddress(null);
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error("Failed to update address");
      throw error;
    }
  };

  const handleDeleteAddress = async () => {
    if (!currentAddress) return;

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', currentAddress.id);

      if (error) throw error;

      toast.success("Address deleted successfully");
      setAddresses(addresses.filter(addr => addr.id !== currentAddress.id));
      setIsDeleteDialogOpen(false);
      setCurrentAddress(null);
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast.success("Default address updated");
      fetchAddresses(); // Refresh to get updated default statuses
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error("Failed to update default address");
    }
  };

  const openEditDialog = (address: Address) => {
    setCurrentAddress(address);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    const address = addresses.find(addr => addr.id === id);
    if (address) {
      setCurrentAddress(address);
      setIsDeleteDialogOpen(true);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Addresses</CardTitle>
            <CardDescription>Manage delivery locations</CardDescription>
          </div>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Address
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
              <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
            </div>
          ) : addresses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {addresses.map(address => (
                <AddressCard 
                  key={address.id} 
                  address={address} 
                  onEdit={openEditDialog}
                  onDelete={openDeleteDialog}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No addresses added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  Add Your First Address
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <AddressForm 
            onSubmit={handleAddAddress}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          {currentAddress && (
            <AddressForm 
              address={currentAddress}
              onSubmit={handleEditAddress}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setCurrentAddress(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this address. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCurrentAddress(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAddress}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddressesTab;
