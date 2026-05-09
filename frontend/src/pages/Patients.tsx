import { useEffect, useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mic, Plus, Filter } from "lucide-react";
import { api } from "@/lib/api";
import type { Patient } from "@/lib/types";

const filters = [
  { id: "all", label: "All" },
  { id: "pregnant", label: "Pregnant" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pregnant":
      return "bg-info/10 text-info";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.patients
      .list()
      .then(setPatients)
      .catch((error) => {
        console.error("Failed to load patients:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPatients = patients.filter((patient) => {
    if (selectedFilter === "pregnant") {
      return patient.is_pregnant;
    }
    return true;
  }).filter((patient) => {
    if (!searchQuery.trim()) return true;
    return patient.full_name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold">Patients</h1>
          </div>

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
        {loading ? (
          <p className="text-muted-foreground">Loading patient records...</p>
        ) : filteredPatients.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-center text-muted-foreground">
              No patients found. Add a new patient using the backend API.
            </CardContent>
          </Card>
        ) : (
          filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {patient.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{patient.full_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Age: {patient.age}
                    </p>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      patient.is_pregnant ? "pregnant" : "normal"
                    )}`}
                  >
                    {patient.is_pregnant ? "pregnant" : "normal"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Button
        size="icon"
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => {
          window.location.href = '/patients/new';
        }}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <BottomNavigation />
    </div>
  );
};

export default Patients;
