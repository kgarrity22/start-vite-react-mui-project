import { homedir } from "os";
import { join } from "path";
import fs from "fs-extra";

const CONFIG_DIR = join(homedir(), ".start-vite-react-mui");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

export const saveApiKey = (apiKey: string) => {
  fs.ensureDirSync(CONFIG_DIR);
  const config = getConfig();
  config.googleFontsApiKey = apiKey;
  fs.writeJsonSync(CONFIG_FILE, config, { spaces: 2 });
};

const getConfig = () => {
  try {
    return fs.existsSync(CONFIG_FILE) ? fs.readJsonSync(CONFIG_FILE) : {};
  } catch {
    return {};
  }
};
