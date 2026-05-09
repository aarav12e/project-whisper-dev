import { useEffect, useState } from "react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Syringe, AlertCircle, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import type { Vaccination } from "@/lib/types";

const Vaccinations = () => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.vaccinations
      .list()
      .then(setVaccinations)
      .catch((error) => {
        console.error("Failed to load vaccinations:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const dueToday = vaccinations.filter((vac) => vac.status === "due");
  const overdue = vaccinations.filter((vac) => vac.status === "overdue");
  const upcoming = vaccinations.filter((vac) => vac.status === "upcoming");

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold">Vaccinations</h1>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4">
        <Tabs defaultValue="due" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="due">
              Due Today
              <Badge variant="secondary" className="ml-2">
                {dueToday.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue
              <Badge variant="destructive" className="ml-2">
                {overdue.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="due" className="space-y-3">
            {loading ? (
              <Card>
                <CardContent className="p-4 text-muted-foreground">Loading vaccinations...</CardContent>
              </Card>
            ) : dueToday.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-muted-foreground">
                  No vaccinations due today.
                </CardContent>
              </Card>
            ) : (
              dueToday.map((vac) => (
                <Card key={vac.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-success/10 p-2 rounded-full">
                        <Syringe className="h-5 w-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{vac.patient_name}</h3>
                        <p className="text-sm text-muted-foreground">{vac.vaccine_name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{vac.due_date}</span>
                        </div>
                      </div>
                      <Button size="sm" className="min-h-touch-target">
                        Record
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="overdue" className="space-y-3">
            {overdue.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-muted-foreground">
                  No overdue vaccinations.
                </CardContent>
              </Card>
            ) : (
              overdue.map((vac) => (
                <Card key={vac.id} className="border-destructive/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-destructive/10 p-2 rounded-full">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{vac.patient_name}</h3>
                        <p className="text-sm text-muted-foreground">{vac.vaccine_name}</p>
                        <p className="text-xs text-destructive mt-1">
                          Overdue since {vac.due_date}
                        </p>
                      </div>
                      <Button size="sm" variant="destructive" className="min-h-touch-target">
                        Record
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-3">
            {upcoming.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-muted-foreground">
                  No upcoming vaccinations.
                </CardContent>
              </Card>
            ) : (
              upcoming.map((vac) => (
                <Card key={vac.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-full">
                        <Syringe className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{vac.patient_name}</h3>
                        <p className="text-sm text-muted-foreground">{vac.vaccine_name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Due: {vac.due_date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Vaccinations;
