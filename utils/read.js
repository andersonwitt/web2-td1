import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getTableInfo({
  fileName,
  route,
  dataMap,
  filter,
  sort,
  hasDelete,
}) {
  const dataJSONString = fs.readFileSync(
    path.join(__dirname, `../data/${fileName}.json`)
  );
  const data = JSON.parse(dataJSONString);
  let dataFiltered = [...data];

  const columns = [...dataMap.map((map) => map[1]), "Ações"];

  if (filter) {
    dataFiltered = data.filter(filter);
  }

  if (sort) {
    dataFiltered = dataFiltered.sort(sort);
  }

  const rows = dataFiltered.map((item) => {
    const actionCells = [`/${route}/${item.id}`];

    if (hasDelete) {
      actionCells.push(`/${route}/${item.id}`);
    }

    return [...dataMap.map((map) => [item[map[0]]]), actionCells];
  });

  return { data, columns, rows };
}
