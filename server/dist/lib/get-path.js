import { fileURLToPath } from "url";
import path from "path";
export default (metaUrl) => {
    const __dirname = path.dirname(fileURLToPath(metaUrl));
    return (pathArr) => path.join(__dirname, ...pathArr);
};
