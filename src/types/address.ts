
export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  phone: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}
