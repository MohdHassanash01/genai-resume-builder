import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Register = () => {
  const {
    authLoading,
    actionLoading,
    handleRegister,
    error,
  } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    // Client-side password confirmation
    if (password !== confirmPassword) {
      return;
    }

    const success = await handleRegister({
      username,
      email,
      password,
    });

    if (success) {
      navigate("/");
    }
  }

  // Initial authentication check
  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl border bg-card p-8 shadow-sm">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Register to get started
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Server Error */}
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username">
                Username
              </Label>

              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                disabled={actionLoading}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={actionLoading}
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">

              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Password
                </Label>

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <>
                      <EyeOff size={16} />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye size={16} />
                      Show
                    </>
                  )}
                </button>
              </div>

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={actionLoading}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                disabled={actionLoading}
                required
              />

              {confirmPassword &&
                password !== confirmPassword && (
                  <p className="text-sm text-destructive">
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={actionLoading}
              className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-foreground hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our Terms of
          Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
};

export default Register;