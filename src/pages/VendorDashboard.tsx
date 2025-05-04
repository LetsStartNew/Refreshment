
import React from 'react';
import StatsCards from '../components/vendor/StatsCards';
import DashboardTabs from '../components/vendor/DashboardTabs';

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6 text-brand-gold">Vendor Dashboard</h1>
        
        {/* Stats Cards */}
        <StatsCards />
        
        {/* Tabs Section */}
        <DashboardTabs />
      </div>
    </div>
  );
};

export default VendorDashboard;
