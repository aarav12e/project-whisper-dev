import { useEffect, useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import type { Patient, Visit } from "@/lib/types";

const Dashboard = () => {
  const [patientCount, setPatientCount] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.patients.list(), api.visits.list()])
      .then(([patients, visits]) => {
        setPatientCount(patients.length);
        setVisitCount(visits.length);
      })
      .catch((error) => {
        console.error("Failed to load dashboard data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Patient Records", value: loading ? "..." : String(patientCount), icon: Calendar },
    { label: "Visit Records", value: loading ? "..." : String(visitCount), icon: FileText },
  ];

  const quickActions = [
    { label: "New Visit", icon: UserPlus, path: "/visits" },
    { label: "Search Patient", icon: Search, path: "/patients" },
    { label: "Reports", icon: FileText, path: "/reports" },
  ];

  const recentActivities = [
    { patient: "Sunita Devi", action: "Vaccination recorded", time: "10 mins ago" },
    { patient: "Ramesh Kumar", action: "Visit completed", time: "1 hour ago" },
    { patient: "Lakshmi Patel", action: "ANC checkup", time: "2 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-heading font-bold">Welcome, Priya</h1>
              <p className="text-sm opacity-90">ASHA Worker</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div>
          <h2 className="text-lg font-heading font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} to={action.path}>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-2 py-4 w-full min-h-touch-target"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs text-center">{action.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-heading font-semibold mb-3">Recent Activities</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{activity.patient}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
