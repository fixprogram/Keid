import WelcomeImage from "~/public/graphic.png";
import Link from "next/link";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { GetServerSideProps } from "next/types";
import Layout from "@/widgets/Layout";

export default function Welcome() {
  return (
    <Layout withNav={false}>
      <section
        className="h-[460px] mt-[-40px] ml-[-40px]"
        // TODO: use next Image component
        style={{
          background: `url(${WelcomeImage.src})`,
          backgroundPosition: "-140px -260px",
          width: "calc(100vw + 40px)",
        }}
      />

      <section className="flex mt-[-24px] flex-col">
        <h2 className="text-white font-poppins font-bold text-xxxl pr-5">
          Manage Everything on your Phone
        </h2>

        <Link href="/auth/login" className="mt-10">
          <PrimaryButton iconName="letter" text="Continue with email" />
        </Link>

        {/* <div className="flex gap-4 mt-4">
          {providers &&
            Object.values(providers).map((provider) => {
              if (provider.name !== "Credentials") {
                return (
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-full h-12 border-[1px] border-border flex-grow "
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                  >
                    <span className="text-white">{provider.name}</span>
                  </a>
                );
              }
            })}
        </div> */}

        <p className="mt-4 text-deactive text-center text-smm">
          By continuing you agree Keid’s Terms of Services & Privacy Policy
        </p>
      </section>
    </Layout>
  );
}
