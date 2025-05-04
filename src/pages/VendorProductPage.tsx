
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, 
} from "@/components/ui/form";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Package, PlusCircle, Edit, Trash } from 'lucide-react';

const productFormSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  minQuantity: z.string().min(1, "Minimum quantity is required"),
  description: z.string().optional(),
});

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Mineral Water (24-pack)",
    category: "Water",
    price: 18.99,
    minQuantity: 10,
    stock: 125
  },
  {
    id: 2,
    name: "Sparkling Water (12-pack)",
    category: "Water",
    price: 14.99,
    minQuantity: 10,
    stock: 84
  },
  {
    id: 3,
    name: "Assorted Cookies Box",
    category: "Snacks",
    price: 12.50,
    minQuantity: 15,
    stock: 45
  },
  {
    id: 4,
    name: "Fresh Fruit Basket (Medium)",
    category: "Snacks",
    price: 24.99,
    minQuantity: 5,
    stock: 32
  },
  {
    id: 5,
    name: "Coffee Service Kit",
    category: "Beverages",
    price: 42.50,
    minQuantity: 3,
    stock: 28
  }
];

const VendorProductPage = () => {
  const [products, setProducts] = React.useState(sampleProducts);
  const [isAddProductOpen, setIsAddProductOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editProductId, setEditProductId] = React.useState<number | null>(null);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      category: "",
      price: "",
      minQuantity: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    if (isEditMode && editProductId) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === editProductId ? {
          ...product,
          name: values.productName,
          category: values.category,
          price: parseFloat(values.price),
          minQuantity: parseInt(values.minQuantity)
        } : product
      ));
      toast.success("Product updated successfully!");
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        name: values.productName,
        category: values.category,
        price: parseFloat(values.price),
        minQuantity: parseInt(values.minQuantity),
        stock: 0
      };
      setProducts([...products, newProduct]);
      toast.success("Product added successfully!");
    }
    
    form.reset();
    setIsAddProductOpen(false);
    setIsEditMode(false);
    setEditProductId(null);
  };

  const handleEditProduct = (id: number) => {
    const productToEdit = products.find(product => product.id === id);
    if (!productToEdit) return;
    
    form.reset({
      productName: productToEdit.name,
      category: productToEdit.category.toLowerCase(),
      price: String(productToEdit.price),
      minQuantity: String(productToEdit.minQuantity),
      description: "",
    });
    
    setEditProductId(id);
    setIsEditMode(true);
    setIsAddProductOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully!");
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your product listings</p>
        </div>
        
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setIsEditMode(false);
              form.reset();
            }}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? "Update the details of your existing product" 
                  : "Fill in the details to add a new product to your catalog"}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="water">Water</SelectItem>
                          <SelectItem value="beverages">Beverages</SelectItem>
                          <SelectItem value="snacks">Snacks</SelectItem>
                          <SelectItem value="gifts">Gift Boxes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="minQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description of the product" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddProductOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditMode ? "Update Product" : "Add Product"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Package className="mr-2" />
            Your Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Min Qty</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.minQuantity}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.stock > 50 ? 'bg-green-100 text-green-700' :
                      product.stock > 20 ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorProductPage;
