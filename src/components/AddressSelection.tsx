
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MapAddressSelector from './MapAddressSelector';
import ManualAddressForm from './ManualAddressForm';
import SavedAddressList from './SavedAddressList';
import { Check, MapPin, PenLine, BookmarkPlus } from 'lucide-react';
import { toast } from 'sonner';

export type Address = {
  id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
};

// Mock saved addresses
const mockSavedAddresses: Address[] = [
  {
    id: '1',
    name: 'Office',
    phone: '9876543210',
    street: '123 Tech Park, Anna Salai',
    city: 'Chennai',
    pincode: '600001',
    landmark: 'Near Central Station',
    isDefault: true
  },
  {
    id: '2',
    name: 'Conference Center',
    phone: '9876543211',
    street: '45 Convention Ave, T Nagar',
    city: 'Chennai',
    pincode: '600017',
    landmark: 'Opposite to City Mall'
  }
];

interface AddressSelectionProps {
  onAddressSelected: (address: Address) => void;
}

const AddressSelection = ({ onAddressSelected }: AddressSelectionProps) => {
  const [savedAddresses] = useState<Address[]>(mockSavedAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressSource, setAddressSource] = useState<'saved' | 'map' | 'manual'>('saved');

  const handleSavedAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    onAddressSelected(address);
    toast.success("Address selected", { description: `${address.street}, ${address.city}` });
  };

  const handleMapAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    onAddressSelected(address);
    toast.success("Address selected from map", { description: `${address.street}, ${address.city}` });
  };

  const handleManualAddressSubmit = (address: Address) => {
    setSelectedAddress(address);
    onAddressSelected(address);
    toast.success("Address added", { description: `${address.street}, ${address.city}` });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-poppins font-semibold text-2xl">Delivery Address</h2>
      
      <RadioGroup 
        defaultValue="saved" 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        onValueChange={(val: 'saved' | 'map' | 'manual') => setAddressSource(val)}
      >
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="saved" id="saved" />
          <Label htmlFor="saved" className="cursor-pointer flex items-center gap-2">
            <BookmarkPlus size={18} />
            <span>Saved Addresses</span>
          </Label>
        </div>
        
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="map" id="map" />
          <Label htmlFor="map" className="cursor-pointer flex items-center gap-2">
            <MapPin size={18} />
            <span>Select on Map</span>
          </Label>
        </div>
        
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="manual" id="manual" />
          <Label htmlFor="manual" className="cursor-pointer flex items-center gap-2">
            <PenLine size={18} />
            <span>Manual Entry</span>
          </Label>
        </div>
      </RadioGroup>

      <div className="mt-6 border rounded-lg p-4">
        {addressSource === 'saved' && (
          <SavedAddressList 
            addresses={savedAddresses} 
            onSelect={handleSavedAddressSelect}
            selectedAddressId={selectedAddress?.id}
          />
        )}
        
        {addressSource === 'map' && (
          <MapAddressSelector onAddressSelect={handleMapAddressSelect} />
        )}
        
        {addressSource === 'manual' && (
          <ManualAddressForm onSubmit={handleManualAddressSubmit} />
        )}
      </div>

      {selectedAddress && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <div className="rounded-full bg-green-100 p-1 mr-3">
            <Check className="text-green-600 h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-green-800">Delivery Address Selected</h4>
            <p className="text-green-700 text-sm mt-1">{selectedAddress.name} • {selectedAddress.phone}</p>
            <p className="text-green-700 text-sm">{selectedAddress.street}, {selectedAddress.city} - {selectedAddress.pincode}</p>
            {selectedAddress.landmark && <p className="text-green-700 text-xs mt-1">Landmark: {selectedAddress.landmark}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelection;
