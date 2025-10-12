import { BottomNavigation } from "@/components/BottomNavigation";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  User,
  Globe,
  Bell,
  Database,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold">Settings</h1>
            <OfflineIndicator />
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Profile Section */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  PK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Priya Kumar</h2>
                <p className="text-sm text-muted-foreground">ASHA Worker</p>
                <p className="text-xs text-muted-foreground">ID: ASHA-2024-1234</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Settings Groups */}
        <div className="space-y-4">
          {/* Language Settings */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
              Preferences
            </h3>
            <Card>
              <CardContent className="p-0 divide-y">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">English</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-muted-foreground">Push notifications</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data & Sync */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
              Data & Sync
            </h3>
            <Card>
              <CardContent className="p-0 divide-y">
                <Link to="/sync" className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <Wifi className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Sync Status</p>
                    <p className="text-sm text-success">All data synced</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Storage</p>
                    <p className="text-sm text-muted-foreground">125 MB used</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">WiFi Only Sync</p>
                      <p className="text-sm text-muted-foreground">Save mobile data</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
              Help & Support
            </h3>
            <Card>
              <CardContent className="p-0 divide-y">
                <Link to="/reports" className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Reports</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Help & Support</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Logout */}
          <Card>
            <CardContent className="p-0">
              <Link to="/" className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-destructive">
                <LogOut className="h-5 w-5" />
                <p className="font-medium">Logout</p>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          <p>EoASHA v1.0.0</p>
          <p className="text-xs mt-1">Built for ASHA workers across India</p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Settings;
