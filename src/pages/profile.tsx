import ProfilePage from "@/templates/ProfilePage";
import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  return <ProfilePage />;
}
