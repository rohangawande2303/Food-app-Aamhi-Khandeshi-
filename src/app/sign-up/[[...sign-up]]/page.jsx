import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f7f0dd]">
      <div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
