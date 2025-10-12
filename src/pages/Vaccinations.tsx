import { BottomNavigation } from "@/components/BottomNavigation";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Syringe, AlertCircle, Calendar } from "lucide-react";

const mockVaccinations = {
  dueToday: [
    { id: "1", patient: "Baby Ananya", age: "6 months", vaccine: "DPT Booster", time: "10:00 AM" },
    { id: "2", patient: "Baby Rohan", age: "3 months", vaccine: "OPV-2", time: "2:00 PM" },
  ],
  overdue: [
    { id: "3", patient: "Baby Priya", age: "9 months", vaccine: "Measles", overdueDays: 5 },
  ],
  upcoming: [
    { id: "4", patient: "Baby Arjun", age: "2 months", vaccine: "Hepatitis B", dueDate: "In 3 days" },
    { id: "5", patient: "Baby Kavya", age: "4 months", vaccine: "DPT-3", dueDate: "In 1 week" },
  ],
};

const Vaccinations = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b p-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold">Vaccinations</h1>
            <OfflineIndicator />
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto p-4">
        <Tabs defaultValue="due" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="due">
              Due Today
              <Badge variant="secondary" className="ml-2">
                {mockVaccinations.dueToday.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue
              <Badge variant="destructive" className="ml-2">
                {mockVaccinations.overdue.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="due" className="space-y-3">
            {mockVaccinations.dueToday.map((vac) => (
              <Card key={vac.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-success/10 p-2 rounded-full">
                      <Syringe className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{vac.patient}</h3>
                      <p className="text-sm text-muted-foreground">Age: {vac.age}</p>
                      <p className="text-sm font-medium mt-1">{vac.vaccine}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{vac.time}</span>
                      </div>
                    </div>
                    <Button size="sm" className="min-h-touch-target">
                      Record
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="overdue" className="space-y-3">
            {mockVaccinations.overdue.map((vac) => (
              <Card key={vac.id} className="border-destructive/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-destructive/10 p-2 rounded-full">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{vac.patient}</h3>
                      <p className="text-sm text-muted-foreground">Age: {vac.age}</p>
                      <p className="text-sm font-medium mt-1">{vac.vaccine}</p>
                      <p className="text-xs text-destructive mt-1">
                        Overdue by {vac.overdueDays} days
                      </p>
                    </div>
                    <Button size="sm" variant="destructive" className="min-h-touch-target">
                      Record
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-3">
            {mockVaccinations.upcoming.map((vac) => (
              <Card key={vac.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <Syringe className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{vac.patient}</h3>
                      <p className="text-sm text-muted-foreground">Age: {vac.age}</p>
                      <p className="text-sm font-medium mt-1">{vac.vaccine}</p>
                      <p className="text-xs text-muted-foreground mt-1">Due: {vac.dueDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Vaccinations;
