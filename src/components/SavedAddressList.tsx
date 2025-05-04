
import React from 'react';
import { Address } from './AddressSelection';
import { Button } from '@/components/ui/button';
import { MapPin, PenLine, Plus } from 'lucide-react';

interface SavedAddressListProps {
  addresses: Address[];
  onSelect: (address: Address) => void;
  selectedAddressId?: string;
}

const SavedAddressList = ({ addresses, onSelect, selectedAddressId }: SavedAddressListProps) => {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          <MapPin className="text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No saved addresses</h3>
        <p className="mt-1 text-gray-500">You don't have any saved addresses yet.</p>
        <Button className="mt-4" size="sm">
          <Plus size={18} className="mr-2" /> Add New Address
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Saved Addresses</h3>
        <Button variant="outline" size="sm">
          <Plus size={16} className="mr-2" /> Add New
        </Button>
      </div>
      
      <div className="space-y-4">
        {addresses.map((address) => (
          <div 
            key={address.id} 
            className={`border rounded-md p-4 cursor-pointer transition-all hover:border-brand-blue ${
              selectedAddressId === address.id ? 'border-brand-blue bg-brand-blue/5 shadow-sm' : ''
            }`}
            onClick={() => onSelect(address)}
          >
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <h4 className="font-medium">{address.name}</h4>
                {address.isDefault && (
                  <span className="bg-brand-blue/10 text-brand-blue text-xs px-2 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <PenLine size={16} />
              </Button>
            </div>
            
            <p className="text-gray-700 text-sm mt-1">{address.phone}</p>
            <p className="text-gray-700 text-sm">{address.street}, {address.city} - {address.pincode}</p>
            {address.landmark && <p className="text-gray-500 text-xs mt-1">Landmark: {address.landmark}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAddressList;
