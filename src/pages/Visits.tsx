import { BottomNavigation } from "@/components/BottomNavigation";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const mockVisits = [
  {
    id: "1",
    patient: "Sunita Devi",
    date: "Today, 10:30 AM",
    type: "Routine Checkup",
    location: "Village: Rampur",
    status: "completed",
  },
  {
    id: "2",
    patient: "Ramesh Kumar",
    date: "Today, 2:00 PM",
    type: "Follow-up",
    location: "Village: Madhubani",
    status: "scheduled",
  },
  {
    id: "3",
    patient: "Lakshmi Patel",
    date: "Yesterday, 11:00 AM",
    type: "ANC Visit",
    location: "Village: Rampur",
    status: "completed",
  },
];

const Visits = () => {
  const getStatusBadge = (status: string) => {
    if (status === "completed") {
      return "bg-success/10 text-success";
    }
    return "bg-warning/10 text-warning";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold">Visits</h1>
            <OfflineIndicator />
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4 space-y-4">
        {mockVisits.map((visit) => (
          <Card key={visit.id} className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{visit.patient}</h3>
                  <p className="text-sm text-muted-foreground">{visit.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(visit.status)}`}>
                  {visit.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{visit.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{visit.location}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full min-h-touch-target">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link to="/visits/new">
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

export default Visits;
