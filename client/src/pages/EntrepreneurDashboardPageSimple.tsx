import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EntrepreneurDashboardPageSimple() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a simplified dashboard to test functionality.</p>
            <Button>Test Button</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}