import { promptForApiKey } from "./prompt-for-api-key.js";

/**
 * Retrieves API Key (in descending order) from
 * 1 - Command line argument
 * 2 - Environment var
 * 3 - User prompt
 */
export const getApiKey = async () => {
  //  Command line argument
  const argIndex = process.argv.indexOf("--google-fonts-key");
  if (argIndex !== -1 && process.argv[argIndex + 1]) {
    return process.argv[argIndex + 1];
  }

  // Environment variable
  if (process.env.GOOGLE_FONTS_API_KEY) {
    return process.env.GOOGLE_FONTS_API_KEY;
  }

  // Interactive prompt
  return await promptForApiKey();
};
