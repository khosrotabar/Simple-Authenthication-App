import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth-util";
import { ConnectToDatabase } from "../../../lib/db-util";

export default NextAuth({
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await ConnectToDatabase();

        const db = client.db();
        const userCollection = db.collection("users");
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("User not found!");
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          client.close();
          throw new Error("Password is wrong!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
  secret: process.env.SECRET,
});
