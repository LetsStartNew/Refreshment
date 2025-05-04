
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartBar, 
  Package, 
  ShoppingCart,
  Users
} from 'lucide-react';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="dark-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-pale/80">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1 text-brand-gold">254</h3>
            </div>
            <div className="p-2 bg-brand-gold/20 rounded-full">
              <ShoppingCart className="h-5 w-5 text-brand-gold" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dark-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-pale/80">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1 text-brand-gold">$12,543</h3>
            </div>
            <div className="p-2 bg-brand-gold/20 rounded-full">
              <ChartBar className="h-5 w-5 text-brand-amber" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dark-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-pale/80">Products</p>
              <h3 className="text-2xl font-bold mt-1 text-brand-gold">48</h3>
            </div>
            <div className="p-2 bg-brand-gold/20 rounded-full">
              <Package className="h-5 w-5 text-brand-amber" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dark-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-pale/80">Customers</p>
              <h3 className="text-2xl font-bold mt-1 text-brand-gold">1,254</h3>
            </div>
            <div className="p-2 bg-brand-gold/20 rounded-full">
              <Users className="h-5 w-5 text-brand-gold" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
