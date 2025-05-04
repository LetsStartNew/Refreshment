
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTab from './OrdersTab';
import ProductsTab from './ProductsTab';
import DeliveryTab from './DeliveryTab';

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="orders" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="orders">Recent Orders</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="delivery">Delivery</TabsTrigger>
      </TabsList>
      
      <TabsContent value="orders">
        <OrdersTab />
      </TabsContent>
      
      <TabsContent value="products">
        <ProductsTab />
      </TabsContent>
      
      <TabsContent value="delivery">
        <DeliveryTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
