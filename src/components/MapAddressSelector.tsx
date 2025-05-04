
import React, { useState } from 'react';
import { Address } from './AddressSelection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface MapAddressSelectorProps {
  onAddressSelect: (address: Address) => void;
}

const MapAddressSelector = ({ onAddressSelect }: MapAddressSelectorProps) => {
  // In a real implementation, this would use the Google Maps JavaScript API
  // For now, we'll simulate with a placeholder and form
  const [mapAddress, setMapAddress] = useState<Partial<Address>>({
    name: '',
    phone: '',
    street: '',
    city: 'Chennai', // Default city
    pincode: '',
    landmark: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapAddress({
      ...mapAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapAddress.name || !mapAddress.phone || !mapAddress.street || !mapAddress.pincode) {
      return;
    }
    
    onAddressSelect(mapAddress as Address);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin size={32} className="mx-auto text-gray-500 mb-2" />
          <p className="text-gray-700">Google Maps integration will appear here</p>
          <p className="text-sm text-gray-500">Click on the map to select your delivery location</p>
        </div>
        {/* Mock pin that would normally be positioned by map click */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin size={32} className="text-brand-blue" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-brand-blue"></div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium mb-3">Address Details from Map</h4>
        <p className="text-sm text-gray-600 mb-4">Please complete the details below based on your map selection</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name"
                value={mapAddress.name} 
                onChange={handleChange} 
                placeholder="Name for this location" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                value={mapAddress.phone} 
                onChange={handleChange} 
                placeholder="Contact number" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input 
              id="street" 
              name="street"
              value={mapAddress.street} 
              onChange={handleChange} 
              placeholder="Street address" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city"
                value={mapAddress.city} 
                onChange={handleChange} 
                placeholder="City" 
                required 
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input 
                id="pincode" 
                name="pincode"
                value={mapAddress.pincode} 
                onChange={handleChange} 
                placeholder="Pincode" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="landmark">Landmark (Optional)</Label>
            <Input 
              id="landmark" 
              name="landmark"
              value={mapAddress.landmark} 
              onChange={handleChange} 
              placeholder="Nearby landmark for easier navigation" 
            />
          </div>
          
          <Button type="submit" className="w-full">Confirm This Location</Button>
        </form>
      </div>
    </div>
  );
};

export default MapAddressSelector;
