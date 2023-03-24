import { join } from "path";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const port = process.env["PORT"] || 3000;

app.use(express.static(__dirname));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/",  (req: Request , res: Response) => {
  console.log("Mulita | Incoming | ", req.body);
  res.send("ok");
});

app.listen(port, () => {
  console.log(`🎮 [Server is running at ${port}]`)
});
