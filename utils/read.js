import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getTableInfo(fileName, route, dataMap) {
  const dataJSONString = fs.readFileSync(
    path.join(__dirname, `../data/${fileName}.json`)
  );
  const data = JSON.parse(dataJSONString);
  const columns = [...dataMap.map((map) => map[1]), "Ações"];
  const rows = data.map((item) => ([
    ...dataMap.map((map) => item[map[0]]),
    `/${route}/${item.id}`,
  ]));

  return { data, columns, rows };
}