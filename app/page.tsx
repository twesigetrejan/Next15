import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex justify-center gap-4 items-center">
        <button className="bg-blue-500 hover:scale-105 rounded-md py-1 px-3 text-white">
          <LoginLink>Sign in</LoginLink>
        </button>
        <button className="bg-blue-500 hover:scale-105 rounded-md py-1 px-3 text-white">
          <RegisterLink>Sign up</RegisterLink>
        </button>
      </div>
    </div>
  );
}
