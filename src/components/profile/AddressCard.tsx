
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, PenLine, Trash2, CheckCircle } from "lucide-react";
import { Address } from "@/types/address";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  return (
    <Card className={`dark-card ${address.is_default ? 'border-brand-gold border-2' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <h3 className="font-semibold text-base text-brand-gold">{address.name}</h3>
            {address.is_default && (
              <span className="ml-2 bg-brand-gold/20 text-brand-gold text-xs px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-brand-amber hover:text-brand-gold hover:bg-brand-amber/10" 
              onClick={() => onEdit(address)}
            >
              <PenLine className="h-4 w-4" />
              <span className="sr-only">Edit address</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10" 
              onClick={() => onDelete(address.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete address</span>
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-brand-pale/90 space-y-1">
          <p>{address.street}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>
          {address.landmark && <p>Landmark: {address.landmark}</p>}
          <p className="mt-2">Phone: {address.phone}</p>
        </div>
        
        {!address.is_default && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 border-brand-gold text-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold" 
            onClick={() => onSetDefault(address.id)}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Set as Default
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCard;
