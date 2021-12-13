import UserProfile from "../components/profile/user-profile";
import { getSession, session, setOptions } from "next-auth/client";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  setOptions(process.env.NEXTAUTH_SITE);
  const sessions = await session({ req: context.req });

  if (!sessions) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { sessions },
  };
}

export default ProfilePage;
