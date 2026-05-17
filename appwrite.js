import { Client, Account } from "https://cdn.jsdelivr.net/npm/appwrite@16.0.2/+esm";

const client = new Client()
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject("6a072b1b000dda3b22da");

const account = new Account(client);

export { account, client };

