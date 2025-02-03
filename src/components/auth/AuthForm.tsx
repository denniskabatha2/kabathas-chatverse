import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Mock authentication
      localStorage.setItem('user', JSON.stringify({ email, id: '1' }));
      toast({ title: isLogin ? "Successfully logged in!" : "Account created successfully!" });
      window.location.reload(); // Refresh to update auth state
    } catch (error: any) {
      toast({ 
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleAuth} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </form>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
      </Button>
    </div>
  );
};