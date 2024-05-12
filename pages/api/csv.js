import fs from "fs";

export default function handler(req, res) {
  const csv = fs.readFileSync("./public/result.csv", "utf-8");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=result.csv");
  res.status(200).send(csv);
}
