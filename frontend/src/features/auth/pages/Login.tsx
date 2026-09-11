import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
  const {
    actionLoading,
    authLoading,
    handleLogin,
    error,
  } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const success = await handleLogin({
      email,
      password,
    })

    if (success) {
      navigate("/")
    }
  }

  // Initial authentication check
  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl border bg-card p-8  shadow-sm">

          {/* Header */}
          <div className="mb-8 text-center text-blue-500">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Login to your account to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
                disabled={actionLoading}
                className="h-11"
              />
            </div>

            {/* Password */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={actionLoading}
              className="h-11 w-full rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {actionLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  )
}

export default Login