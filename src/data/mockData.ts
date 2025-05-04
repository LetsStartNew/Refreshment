
export const mockOrders = [
  { 
    id: "ORD123", 
    date: "2024-04-05", 
    items: [
      { name: "Water Bottles (24-pack)", quantity: 5, price: 30 }
    ], 
    total: 150,
    status: "Delivered" 
  },
  { 
    id: "ORD124", 
    date: "2024-04-15", 
    items: [
      { name: "Energy Drink", quantity: 10, price: 12 },
      { name: "Sparkling Water", quantity: 8, price: 10 }
    ], 
    total: 200,
    status: "Upcoming" 
  },
];

export const mockNotifications = [
  { 
    id: "notif1", 
    message: "Your order #ORD124 is scheduled for delivery tomorrow.",
    date: "2024-04-28",
    read: false
  },
  { 
    id: "notif2", 
    message: "We've added new snack combos to our menu!",
    date: "2024-04-26",
    read: true
  },
];
