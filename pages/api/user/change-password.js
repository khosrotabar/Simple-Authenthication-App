import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth-util";
import { ConnectToDatabase } from "../../../lib/db-util";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenthicated" });
    return;
  }

  const userEmail = session.user.email;
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;

  const client = await ConnectToDatabase();

  const collection = client.db().collection("users");

  const user = await collection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordIsEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordIsEqual) {
    res.status(403).json({ message: "Old password does not match!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await collection.update(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();

  res.status(201).json({ message: "Password changes!" });
}

export default handler;
