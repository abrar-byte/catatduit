import LoginByGoogle from "@/components/LoginByGoogle";
import { RegisterForm } from "@/components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create an account to start tracking your finances
            </p>
          </div>
          <RegisterForm />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login
            </Link>
          </div>
          <LoginByGoogle />

          <div className="text-center text-sm">
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-primary"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
