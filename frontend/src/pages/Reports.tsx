import { BottomNavigation } from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Reports = () => {
  const metrics = [
    { label: "Total Visits", value: "45", period: "This Month" },
    { label: "Vaccinations", value: "23", period: "This Month" },
    { label: "Deliveries", value: "3", period: "This Month" },
    { label: "ANC Checkups", value: "18", period: "This Month" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold">Reports</h1>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Report Period Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Report Period</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm">Daily</Button>
              <Button variant="default" size="sm">Weekly</Button>
              <Button variant="outline" size="sm">Monthly</Button>
            </div>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div>
          <h2 className="text-lg font-heading font-semibold mb-3">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{metric.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.period}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Report Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Export Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start min-h-touch-target">
              <FileText className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
            <Button variant="outline" className="w-full justify-start min-h-touch-target">
              <Download className="h-4 w-4 mr-2" />
              Export as Excel
            </Button>
            <Button variant="outline" className="w-full justify-start min-h-touch-target">
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
          </CardContent>
        </Card>

        {/* Sync Status */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-warning/10 p-2 rounded-full">
                <FileText className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Offline Mode</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Reports will be updated when you're back online
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/settings">
            <Button variant="ghost" size="sm">
              Back to Settings
            </Button>
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Reports;
