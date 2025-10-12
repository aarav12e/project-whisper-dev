import { useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mic, Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const mockPatients = [
  { id: "1", name: "Sunita Devi", age: 28, lastVisit: "2 days ago", status: "due" },
  { id: "2", name: "Ramesh Kumar", age: 45, lastVisit: "1 week ago", status: "normal" },
  { id: "3", name: "Lakshmi Patel", age: 32, lastVisit: "3 days ago", status: "pregnant" },
  { id: "4", name: "Deepa Sharma", age: 24, lastVisit: "1 day ago", status: "normal" },
  { id: "5", name: "Anita Singh", age: 36, lastVisit: "5 days ago", status: "overdue" },
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "due", label: "Due for Visit" },
    { id: "overdue", label: "Overdue" },
    { id: "pregnant", label: "Pregnant" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due":
        return "bg-warning/10 text-warning";
      case "overdue":
        return "bg-destructive/10 text-destructive";
      case "pregnant":
        return "bg-info/10 text-info";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold">Patients</h1>
            <OfflineIndicator />
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 min-h-touch-target"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button size="icon" variant="outline" className="min-w-touch-target">
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className="whitespace-nowrap"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4 space-y-3">
        {mockPatients.map((patient) => (
          <Link key={patient.id} to={`/patients/${patient.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {patient.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Age: {patient.age} • Last visit: {patient.lastVisit}
                    </p>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Floating Action Button */}
      <Link to="/patients/new">
        <Button
          size="icon"
          className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>

      <BottomNavigation />
    </div>
  );
};

export default Patients;
