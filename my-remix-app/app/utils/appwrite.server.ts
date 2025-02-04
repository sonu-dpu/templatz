import { Client, Account, OAuthProvider } from "appwrite";
import config from "~/config/config";

export class AuthService {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(config.appWriteURL) // Your Appwrite API endpoint
      .setProject(config.appWriteProjectId); // Your Appwrite Project ID

    this.account = new Account(this.client);
  }

  async createAccountWithGoogle() {
    try {
      return this.account.createOAuth2Session(
        OAuthProvider.Google,
        process.env.APP_URL + "/auth/callback",
        process.env.APP_URL + "/auth/error"
      );
    } catch (error) {
      console.error("Error in createAccountWithGoogle:", error);
      return null;
    }
  }

  async getCurrentUser(sessionId: string) {
    try {
      this.client.setJWT(sessionId);
      return await this.account.get();
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
