import { useEffect, useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Plus } from "lucide-react";
import { api } from "@/lib/api";
import type { Visit } from "@/lib/types";

const getStatusBadge = (status: string) => {
  if (status === "completed") {
    return "bg-success/10 text-success";
  }
  return "bg-warning/10 text-warning";
};

const Visits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.visits
      .list()
      .then(setVisits)
      .catch((error) => {
        console.error("Failed to load visits:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold">Visits</h1>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4 space-y-4">
        {loading ? (
          <p className="text-muted-foreground">Loading visits...</p>
        ) : visits.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-center text-muted-foreground">
              No visits found yet. Create visit records using the backend API.
            </CardContent>
          </Card>
        ) : (
          visits.map((visit) => (
            <Card key={visit.id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{visit.patient_name}</h3>
                    <p className="text-sm text-muted-foreground">{visit.chief_complaint || visit.status}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(visit.status)}`}>
                    {visit.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{visit.visit_date}</span>
                  </div>
                  {visit.gps_latitude && visit.gps_longitude ? (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {visit.gps_latitude.toFixed(2)}, {visit.gps_longitude.toFixed(2)}
                      </span>
                    </div>
                  ) : null}
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
          window.location.href = '/visits/new';
        }}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <BottomNavigation />
    </div>
  );
};

export default Visits;
