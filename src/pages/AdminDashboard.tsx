
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Store,
  FileCheck,
  ShoppingBag,
  CircleDollarSign,
  Bell,
  Search,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <h3 className="text-2xl font-bold mt-1">2,453</h3>
              </div>
              <div className="p-2 bg-brand-blue/10 rounded-full">
                <Users className="h-5 w-5 text-brand-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Vendors</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Store className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Orders</p>
                <h3 className="text-2xl font-bold mt-1">156</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <ShoppingBag className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">₹1.2M</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <CircleDollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Admin Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users across the platform</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-8 w-[250px]"
                  />
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "John Smith",
                      email: "john@example.com",
                      date: "Apr 23, 2025",
                      orders: 15,
                      status: "active"
                    },
                    {
                      name: "Sarah Johnson",
                      email: "sarah@example.com",
                      date: "Apr 10, 2025",
                      orders: 8,
                      status: "active"
                    },
                    {
                      name: "Michael Williams",
                      email: "michael@example.com",
                      date: "Mar 15, 2025",
                      orders: 3,
                      status: "inactive"
                    },
                    {
                      name: "Lisa Davis",
                      email: "lisa@example.com",
                      date: "Feb 28, 2025",
                      orders: 0,
                      status: "active"
                    }
                  ].map((user, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.date}</TableCell>
                      <TableCell>{user.orders}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Vendors Tab */}
        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Approvals</CardTitle>
              <CardDescription>Manage vendor applications and KYC verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>FSSAI Number</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      business: "Fresh Foods Co.",
                      contact: "James Wilson",
                      fssai: "1234567890123",
                      location: "Chennai",
                      status: "pending",
                    },
                    {
                      business: "Hydration Solutions",
                      contact: "Emma Brown",
                      fssai: "9876543210987",
                      location: "Chennai",
                      status: "pending",
                    },
                    {
                      business: "Snack Haven",
                      contact: "Robert Davis",
                      fssai: "5678901234567",
                      location: "Chennai",
                      status: "pending",
                    }
                  ].map((vendor, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{vendor.business}</TableCell>
                      <TableCell>{vendor.contact}</TableCell>
                      <TableCell>{vendor.fssai}</TableCell>
                      <TableCell>{vendor.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="text-green-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Manage and moderate product listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Premium Mineral Water (24-pack)",
                      vendor: "Hydration Solutions",
                      category: "Water",
                      price: "₹189.90",
                      status: "active"
                    },
                    {
                      name: "Assorted Cookies Box",
                      vendor: "Snack Haven",
                      category: "Snacks",
                      price: "₹250.00",
                      status: "active"
                    },
                    {
                      name: "Organic Tea Selection",
                      vendor: "Fresh Foods Co.",
                      category: "Beverages",
                      price: "₹350.00",
                      status: "pending"
                    },
                    {
                      name: "Executive Gift Box",
                      vendor: "Premium Gifts",
                      category: "Gifts",
                      price: "₹899.00",
                      status: "pending"
                    }
                  ].map((product, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.vendor}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={product.status === "active" ? "default" : "outline"}
                          className={product.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">View</Button>
                          {product.status === "pending" && (
                            <Button variant="outline" size="sm" className="text-green-600">
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>Track and manage all orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "#ORD-1234",
                      customer: "John Smith",
                      vendor: "Hydration Solutions",
                      total: "₹802.40",
                      status: "delivered"
                    },
                    {
                      id: "#ORD-1235",
                      customer: "Sarah Johnson",
                      vendor: "Snack Haven",
                      total: "₹1,250.75",
                      status: "processing"
                    },
                    {
                      id: "#ORD-1236",
                      customer: "Michael Williams",
                      vendor: "Fresh Foods Co.",
                      total: "₹652.30",
                      status: "out-for-delivery"
                    },
                    {
                      id: "#ORD-1237",
                      customer: "Lisa Davis",
                      vendor: "Multiple",
                      total: "₹1,895.00",
                      status: "dispute"
                    }
                  ].map((order, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.vendor}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={order.status === "dispute" ? "destructive" : "default"}
                          className={
                            order.status === "processing" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                            order.status === "out-for-delivery" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                            order.status === "delivered" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                            ""
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Center</CardTitle>
              <CardDescription>Manage system notifications and communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "New Vendor Application",
                    message: "Fresh Foods Co. has applied for vendor registration",
                    time: "10 minutes ago",
                    type: "vendor",
                    read: false
                  },
                  {
                    title: "Order Dispute",
                    message: "Customer Lisa Davis has raised a dispute for order #ORD-1237",
                    time: "2 hours ago",
                    type: "dispute",
                    read: false
                  },
                  {
                    title: "New Bulk Order",
                    message: "Corporate client TechCorp has placed an order for 500 refreshment boxes",
                    time: "Yesterday",
                    type: "order",
                    read: true
                  },
                  {
                    title: "Payment Verification Required",
                    message: "Manual payment verification needed for order #ORD-1240",
                    time: "2 days ago",
                    type: "payment",
                    read: true
                  }
                ].map((notification, i) => (
                  <Card key={i} className={notification.read ? "bg-white" : "bg-blue-50"}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3 items-start">
                          <div className={`
                            rounded-full p-2 mt-1
                            ${notification.type === 'vendor' ? 'bg-purple-100 text-purple-600' : ''}
                            ${notification.type === 'dispute' ? 'bg-red-100 text-red-600' : ''}
                            ${notification.type === 'order' ? 'bg-green-100 text-green-600' : ''}
                            ${notification.type === 'payment' ? 'bg-amber-100 text-amber-600' : ''}
                          `}>
                            {notification.type === 'vendor' && <Store className="h-4 w-4" />}
                            {notification.type === 'dispute' && <Bell className="h-4 w-4" />}
                            {notification.type === 'order' && <ShoppingBag className="h-4 w-4" />}
                            {notification.type === 'payment' && <CircleDollarSign className="h-4 w-4" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          {notification.read ? "Archive" : "Mark Read"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
