import { LoginForm } from "@/components/login-form"
import LoginByGoogle from "@/components/LoginByGoogle"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>
          <LoginForm />
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-primary">
              Register
            </Link>
          </div>
          <LoginByGoogle/>
          <div className="text-center text-sm">
            <Link href="/" className="underline underline-offset-4 hover:text-primary">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
