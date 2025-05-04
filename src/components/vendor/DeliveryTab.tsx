
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DeliveryTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Management</CardTitle>
        <CardDescription>Track your ongoing deliveries</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Delivery ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">DEL-5678</TableCell>
              <TableCell>#ORD-1234</TableCell>
              <TableCell>John Smith</TableCell>
              <TableCell>123 Main St, Anytown</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <span>Delivered</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">DEL-5679</TableCell>
              <TableCell>#ORD-1235</TableCell>
              <TableCell>Sarah Johnson</TableCell>
              <TableCell>456 Park Ave, Anytown</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                  <span>In Transit</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">DEL-5680</TableCell>
              <TableCell>#ORD-1236</TableCell>
              <TableCell>Michael Williams</TableCell>
              <TableCell>789 Oak St, Anytown</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-amber-500"></div>
                  <span>Processing</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DeliveryTab;
