import { User, useUser } from "@/shared/lib/hooks/useUser";
import Icon from "@/shared/ui/Icon";

export default function Body() {
  const user = useUser() as User;

  if (!user) {
    return null;
  }

  const { name, email } = user;

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
