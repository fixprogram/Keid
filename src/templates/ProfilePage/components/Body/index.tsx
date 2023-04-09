import Icon from "@/shared/ui/Icon";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Body() {
  const session = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/welcome");
  }

  const data = session.data as { user: { name: string; email: string } };
  const { name, email } = data.user;

  return (
    <section className="mt-8 mx-auto flex flex-col justify-center items-center">
      <Icon name="avatar" width={136} height={136} />

      <h4
        className="font-poppins text-white mt-[13px]"
        style={{ fontSize: 32, lineHeight: "40px" }}
      >
        {name}
      </h4>

      <a
        href={`mailto:${email}`}
        className="block mt-1 font-semibold"
        style={{ color: "#BBFFE7" }}
      >
        {email}
      </a>
    </section>
  );
}
