import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Checkbox } from "../components/ui/checkbox";
import { Eye, EyeOff, Zap, Github, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/config";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data?.token;
      const userName = res.data?.username;
      const subscription = res.data?.subscription;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
        localStorage.setItem(
          "subscription",
          JSON.stringify({
            availableQuata: subscription.availableQuata,
            expiryDate: subscription.expiryDate,
            subscriptionType: subscription.subscriptionType,
          })
        );
        navigate("/");
        onLogin();
      } else {
        setError("No token received");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-2xl tracking-tight">
              AI Virtual Try-On
            </span>
          </div>
          <div className="space-y-2">
            <h1 className="text-white text-3xl tracking-tight">Welcome back</h1>
            <p className="text-gray-200 text-lg">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-2xl shadow-black/20 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-12 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  className="border border-white bg-gray-900 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="remember" className="text-gray-400">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:shadow-blue-600/40"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="space-y-5">
            <div className="relative">
              <Separator className="bg-gray-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gray-800 px-4 text-gray-400">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="h-12 bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                <Mail size={18} className="mr-2" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
                className="h-12 bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                <Github size={18} className="mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </div>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
              Contact us +91 884 860 0150
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 space-y-3">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Secure login powered by AI NL
          </p>
          <div className="flex items-center justify-center gap-6">
            <button className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </button>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <button className="hover:text-gray-400 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
