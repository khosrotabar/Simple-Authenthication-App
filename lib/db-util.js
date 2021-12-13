import { MongoClient } from "mongodb";

export async function ConnectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://Mohammad:Mohammadpw@cluster0.gfww0.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
