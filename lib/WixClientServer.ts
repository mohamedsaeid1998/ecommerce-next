import { createClient, OAuthStrategy } from "@wix/sdk";
import { cookies } from "next/headers";
import { products, collections } from "@wix/stores";


export const wixClientServer = async () => {
  let refreshToken;
  try {
    const cookie = cookies()
    refreshToken = JSON.parse(cookie.get("refreshToken")?.value || "{}")
  } catch (e) {

  }


  const wixClient = createClient({

    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient
}