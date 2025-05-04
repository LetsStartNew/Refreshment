
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

const OrdersTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Manage your most recent customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#ORD-1234</TableCell>
              <TableCell>John Smith</TableCell>
              <TableCell>Apr 23, 2025</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Completed
                </span>
              </TableCell>
              <TableCell className="text-right">$89.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#ORD-1235</TableCell>
              <TableCell>Sarah Johnson</TableCell>
              <TableCell>Apr 22, 2025</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  Processing
                </span>
              </TableCell>
              <TableCell className="text-right">$124.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#ORD-1236</TableCell>
              <TableCell>Michael Williams</TableCell>
              <TableCell>Apr 21, 2025</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                  Pending
                </span>
              </TableCell>
              <TableCell className="text-right">$42.75</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#ORD-1237</TableCell>
              <TableCell>Lisa Davis</TableCell>
              <TableCell>Apr 20, 2025</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Completed
                </span>
              </TableCell>
              <TableCell className="text-right">$134.25</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
