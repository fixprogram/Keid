import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import Layout from "@/widgets/Layout";
import WelcomeImage from "~/public/graphic.svg";
import Link from "next/link";
import PrimaryButton from "@/shared/ui/PrimaryButton";

export default function Welcome({ providers }) {
  const session = useSession();

  // console.log("session: ", session);
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
