import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import WelcomeImage from "~/public/graphic.svg";
import Link from "next/link";
import PrimaryButton from "@/shared/ui/PrimaryButton";

export default function Welcome({ providers }) {
  const session = useSession();

  console.log("session: ", session);
  return (
    <Layout withNav={false}>
      <section
        className="h-[460px] mt-[-40px] ml-[-40px] w-screen"
        style={{
          background: `url(${WelcomeImage.src})`,
          backgroundPosition: "-140px -260px",
        }}
      />

      <section className="flex mt-[-24px] flex-col">
        <h2 className="text-white font-poppins font-semibold text-xxxl pr-5">
          Manage Everything on Phone
        </h2>

        <Link
          href="/auth/login"
          // className="bg-primary w-full h-12 flex items-center justify-center gap-3 rounded-full mt-[40px] shadow-button"
        >
          <PrimaryButton iconName="letter" text="Continue with email" />
          {/* <Icon name="letter" width={16} height={16} />
          <b className="text-white">Continue with email</b> */}
        </Link>

        <div className="flex gap-4 mt-4">
          {providers &&
            Object.values(providers).map((provider) => {
              if (provider.name !== "Credentials") {
                return (
                  // <div key={provider.name} style={{ marginBottom: 0 }}>
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-full h-12 border-[1px] border-border flex-grow "
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                  >
                    <span className="text-white">{provider.name}</span>
                  </a>
                  // </div>
                );
              }
            })}
        </div>

        <p className="mt-4 text-deactive text-center text-smm">
          By continuing you agree Keid’s Terms of Services & Privacy Policy
        </p>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers,
    },
  };
}

// import { useRef } from "react";
// import { getProviders, getSession, signIn, useSession } from "next-auth/react";

// const Signin = ({ providers }) => {
//   const email = useRef("");
//   const password = useRef("");

//   const session = useSession();

//   console.log("session: ", session);
//   return (
//     <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
//       <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
//         <div className="p-5 bg-white md:flex-1">
//           <h3 className="my-4 text-2xl font-semibold text-gray-700">
//             Account Login
//           </h3>
//           <form action="#" className="flex flex-col space-y-5">
//             <div className="flex flex-col space-y-1">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-semibold text-gray-500"
//               >
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 autoFocus
//                 className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
//                 onChange={(e) => (email.current = e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col space-y-1">
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-semibold text-gray-500"
//                 >
//                   Password
//                 </label>
//                 <a
//                   href="#"
//                   className="text-sm text-blue-600 hover:underline focus:text-blue-800"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//               <input
//                 type="password"
//                 id="password"
//                 className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
//                 onChange={(e) => (password.current = e.target.value)}
//               />
//             </div>
//             <div>
//               <button
//                 type="button"
//                 className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
//                 onClick={async () => {
//                   const res = await signIn("credentials", {
//                     email: email.current,
//                     password: password.current,
//                     // redirect: false,
//                   });

//                   console.log("resp: ", res);
//                 }}
//               >
//                 Log in
//               </button>
//             </div>
//             <div className="flex flex-col space-y-5">
//               <span className="flex items-center justify-center space-x-2">
//                 <span className="h-px bg-gray-400 w-14"></span>
//                 <span className="font-normal text-gray-500">or login with</span>
//                 <span className="h-px bg-gray-400 w-14"></span>
//               </span>
//               <div className="flex flex-col space-y-4">
//                 {providers &&
//                   Object.values(providers).map((provider) => {
//                     if (provider.name !== "Credentials") {
//                       return (
//                         <div key={provider.name} style={{ marginBottom: 0 }}>
//                           <a
//                             href="#"
//                             className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
//                             onClick={() => signIn(provider.id)}
//                           >
//                             <span>
//                               <svg
//                                 className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
//                                 viewBox="0 0 16 16"
//                                 version="1.1"
//                                 aria-hidden="true"
//                               >
//                                 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
//                               </svg>
//                             </span>
//                             <span className="text-sm font-medium text-gray-800 group-hover:text-white">
//                               Sign in with {provider.name}
//                             </span>
//                           </a>
//                         </div>
//                       );
//                     }
//                   })}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;
// export async function getServerSideProps(context) {
//   const { req } = context;
//   const session = await getSession({ req });
//   const providers = await getProviders();

//   //   console.log("providers: ", providers);

//   if (session) {
//     return {
//       redirect: { destination: "/" },
//     };
//   }
//   return {
//     props: {
//       providers,
//     },
//   };
// }
