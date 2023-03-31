import { useSession } from "next-auth/react";

export default function Greeting() {
  const { data } = useSession();

  const name = data?.user ? data.user.name : "";

  return (
    <h2 className="text-white font-poppins font-semibold text-xxl mt-[22px]">
      {`Hello, ${name}`}
    </h2>
  );
}
