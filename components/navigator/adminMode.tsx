import { authConfig } from "@/auth";
import { getServerSession } from "next-auth/next";

const AdminMode = async () => {
  const session = await getServerSession(authConfig);
  console.log(session);
  return <div>Enter</div>;
};

export default AdminMode;
