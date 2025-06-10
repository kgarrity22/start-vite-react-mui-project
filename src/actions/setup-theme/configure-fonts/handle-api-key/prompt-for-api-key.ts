import enquirer from "enquirer";
import { saveApiKey } from "./store-api-key.js";

// Gets the API key via prompt
export const promptForApiKey = async (): Promise<string | undefined> => {
  const { prompt } = enquirer;
  const { wantsToSetup } = await prompt<{ wantsToSetup: boolean }>({
    type: "confirm",
    name: "wantsToSetup",
    message:
      "Would you like to set up Google Fonts integration? (requires free API key)",
    initial: false,
  });

  if (!wantsToSetup) {
    console.log(
      "⚠️ Skipping font installation. You can import fonts manually later ⚠️"
    );
    return undefined;
  }

  console.log(
    "Get your free API key at: https://developers.google.com/fonts/docs/developer_api"
  );

  const { apiKey } = await prompt<{ apiKey: string }>({
    type: "password",
    name: "apiKey",
    message: "Enter your Google Fonts API key (optional):",
  });

  if (apiKey) {
    saveApiKey(apiKey);
    console.log("✅ API key saved for future use!");
  }

  return apiKey;
};
