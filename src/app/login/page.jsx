// import React from "react";
// import Image from "next/image";
// import { SignIn } from "@clerk/nextjs"; // Import Clerk's SignIn component
// import loginImage from "../../images/myaccount-cover.png"; // Adjust the path to your actual image

// const LoginPageContent = () => {
//   return (
//     <div className="flex min-h-screen bg-[#fcf9e9]">
//       {/* Left side - Image */}
//       <div className="hidden lg:block w-1/2 relative overflow-hidden">
//         <Image
//           src={loginImage}
//           alt="Assorted Indian dishes and spices" 
//           layout="fill"
//           objectFit="cover"
//           className="s-curve-image" // Custom class for the S-shaped curve
//         />
//       </div>

//       {/* Right side - Login Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold mb-2 text-gray-800">
//             Welcome Back
//           </h2>
//           <p className="mb-6 text-sm text-gray-600">
//             Did you not join the family yet?{" "}
//             <a href="/register" className="text-green-600 hover:underline">
//               Register here!
//             </a>
//           </p>
//           {/* Clerk's SignIn Component */}
//           <SignIn
//             path="/login"
//             routing="path"
//             signUpUrl="/register"
//             afterSignInUrl="/profile" // Redirect to the profile page after successful login
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPageContent;
