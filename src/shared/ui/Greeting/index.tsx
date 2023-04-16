import { User, useUser } from "@/shared/lib/hooks/useUser";

export default function Greeting() {
  const user = useUser() as User;

  if (!user) {
    return null;
  }

  const { name } = user;

  return (
    <h2 className="text-white font-poppins font-semibold text-xxl mt-[22px]">
      {`Hello, ${name}`}
    </h2>
  );
}
