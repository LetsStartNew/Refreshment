
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

const ProductsTab = () => {
  return (
    <Card className="dark-card">
      <CardHeader>
        <CardTitle className="text-brand-gold">Products</CardTitle>
        <CardDescription className="text-brand-pale/70">Manage your product inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-brand-gold/30">
              <TableHead className="text-brand-pale">ID</TableHead>
              <TableHead className="text-brand-pale">Product Name</TableHead>
              <TableHead className="text-brand-pale">Category</TableHead>
              <TableHead className="text-brand-pale">Stock</TableHead>
              <TableHead className="text-brand-pale text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-brand-gold/20 hover:bg-brand-amber/10">
              <TableCell className="font-medium text-brand-cream">PRD-001</TableCell>
              <TableCell className="text-brand-cream">Mineral Water (24-pack)</TableCell>
              <TableCell className="text-brand-cream">Beverages</TableCell>
              <TableCell className="text-brand-cream">125</TableCell>
              <TableCell className="text-brand-gold text-right">$18.99</TableCell>
            </TableRow>
            <TableRow className="border-brand-gold/20 hover:bg-brand-amber/10">
              <TableCell className="font-medium text-brand-cream">PRD-002</TableCell>
              <TableCell className="text-brand-cream">Sparkling Water (12-pack)</TableCell>
              <TableCell className="text-brand-cream">Beverages</TableCell>
              <TableCell className="text-brand-cream">84</TableCell>
              <TableCell className="text-brand-gold text-right">$14.99</TableCell>
            </TableRow>
            <TableRow className="border-brand-gold/20 hover:bg-brand-amber/10">
              <TableCell className="font-medium text-brand-cream">PRD-003</TableCell>
              <TableCell className="text-brand-cream">Flavored Water Variety</TableCell>
              <TableCell className="text-brand-cream">Beverages</TableCell>
              <TableCell className="text-brand-cream">56</TableCell>
              <TableCell className="text-brand-gold text-right">$21.50</TableCell>
            </TableRow>
            <TableRow className="border-brand-gold/20 hover:bg-brand-amber/10">
              <TableCell className="font-medium text-brand-cream">PRD-004</TableCell>
              <TableCell className="text-brand-cream">Water Dispenser (5 Gallon)</TableCell>
              <TableCell className="text-brand-cream">Equipment</TableCell>
              <TableCell className="text-brand-cream">12</TableCell>
              <TableCell className="text-brand-gold text-right">$129.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductsTab;
