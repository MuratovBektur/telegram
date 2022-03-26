import { fileURLToPath } from "url";
import path from "path";

export default (metaUrl: string) => {
  const __dirname = path.dirname(fileURLToPath(metaUrl));
  return (pathArr: Array<string>) => path.join(__dirname, ...pathArr);
};
