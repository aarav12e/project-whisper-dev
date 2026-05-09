import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी (Hindi)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "bn", label: "বাংলা (Bengali)" },
  { value: "mr", label: "मराठी (Marathi)" },
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !password) {
      toast({
        title: "Error",
        description: "Please enter both User ID and Password",
        variant: "destructive",
      });
      return;
    }

    // Temporary navigation without authentication
    toast({
      title: "Welcome to EoASHA",
      description: "Login successful",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto bg-primary rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-heading">EoASHA</CardTitle>
            <CardDescription>Digital Health Records for Rural India</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language / भाषा</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="min-h-touch-target">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId">User ID / कर्मचारी ID</Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter your ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="min-h-touch-target text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password / पासवर्ड</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-h-touch-target text-base"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer">
                Remember Me / मुझे याद रखें
              </Label>
            </div>

            <Button type="submit" className="w-full min-h-touch-target text-base font-medium">
              Login / लॉग इन करें
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
