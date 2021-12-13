import { hashPassword } from "../../../lib/auth-util";
import { ConnectToDatabase } from "../../../lib/db-util";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  const client = await ConnectToDatabase();
  const db = client.db();

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(442).json({
      message: "Invalid input - password must be greater than 7 letters length",
    });

    return;
  }

  const existUser = await db.collection("users").findOne({ email: email });

  if (existUser) {
    res.status(422).json({ message: "User already exists!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    email: email,
    password: hashedPassword,
  };

  const result = await db.collection("users").insertOne(newUser);

  res.status(201).json({ message: "User created!" });

  client.close();
}

export default handler;
