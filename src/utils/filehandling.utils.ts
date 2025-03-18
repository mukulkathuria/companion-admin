interface JsonKeys {
  [key: string]: string;
}
export function jsonToCsv(items: JsonKeys[]) {
  const header = Object.keys(items[0]);
  const headerString = header.join(",");
  const replacer = (_key: string, value: string) =>
    Array.isArray(value) ? JSON.stringify(value) : String(value);
  const rowItems = items.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );
  const csv = [headerString, ...rowItems].join("\r\n");
  return csv;
}

export function jsonToExcel(
  items: JsonKeys[],
  sheetName: string = "Sheet1"
): void {
  const header = Object.keys(items[0]);
  const rowItems = items.map((row) =>
    header.map((fieldName) => row[fieldName] ?? "").join("\t")
  );
  const excelContent = [header.join("\t"), ...rowItems].join("\r\n");
  const blob = new Blob([excelContent], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${sheetName}.xlsx`;
  link.click();
}

export function generateSCSVFile(data: JsonKeys[]) {
  const csvdata = jsonToCsv(data);
  const link = document.createElement("a");
  const blob = new Blob([csvdata], { type: "text/csv;charset=utf-8" });
  link.href = URL.createObjectURL(blob);
  link.download = `test.csv`;
  link.click();
}
