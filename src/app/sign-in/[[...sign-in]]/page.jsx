import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f7f0dd]">
      <div>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
