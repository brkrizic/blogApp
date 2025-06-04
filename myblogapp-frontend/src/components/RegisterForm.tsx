import type { FormEvent } from "react";

interface RegisterFormProps {
  onRegister: (e: FormEvent) => void;
  fullname: string;
  username: string;
  password: string;
  setFullname: (val: string) => void;
  setUsername: (val: string) => void;
  setPassword: (val: string) => void;
}


const RegisterModal = ({
  onRegister,
  fullname,
  username,
  password,
  setFullname,
  setUsername,
  setPassword
}: RegisterFormProps) => {

  return (
      <>
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        <form className="space-y-4" onSubmit={onRegister}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </>
  );
};

export default RegisterModal;
