
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsTabProps {
  notifications: Notification[];
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ notifications }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated with your orders and offers</CardDescription>
        </div>
        <Button variant="outline" size="sm">Mark All as Read</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50 border-blue-100' : ''}`}
            >
              <div className="flex justify-between mb-1">
                <p className="font-medium">{notification.message}</p>
                {!notification.read && (
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{notification.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
