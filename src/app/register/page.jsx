// import React from "react";
// import Image from "next/image";
// import { SignUp } from "@clerk/nextjs"; // Import Clerk's SignUp component
// import registerImage from "../../images/myaccount-cover.png"; // Adjust the path to your actual image

// const RegisterPageContent = () => {
//   return (
//     <div className="flex min-h-screen bg-[#fcf9e9]">
//       {/* Left side - Image */}
//       <div className="hidden lg:block w-1/2 relative overflow-hidden">
//         <Image
//           src={registerImage}
//           alt="Assorted Indian dishes and spices"
//           layout="fill"
//           objectFit="cover"
//           className="s-curve-image" // Custom class for the S-shaped curve
//         />
//       </div>

//       {/* Right side - Register Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold mb-2 text-gray-800">
//             Join the Family
//           </h2>
//           <p className="mb-6 text-sm text-gray-600">
//             Already have an account?{" "}
//             <a href="/login" className="text-green-600 hover:underline">
//               Login here!
//             </a>
//           </p>
//           {/* Clerk's SignUp Component */}
//           <SignUp path="/register" routing="path" signInUrl="/login" />
//         </div> 
//       </div>
//     </div>
//   );
// };

// export default RegisterPageContent;
