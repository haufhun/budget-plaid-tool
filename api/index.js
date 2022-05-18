import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import {
  getLinkToken,
  getAccessToken,
  getAccounts,
  getTransactions,
} from "./controllers.js";

const app = express();
const PORT = 4090;

app.use(express.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// Get the public token and exchange it for an access token
app.get("/test", (req, res) => res.json("Hello, World"));
app.post("/getLinkToken", getLinkToken);
app.post("/getAccessToken", getAccessToken);
app.post("/getAccounts", getAccounts);
app.post("/getTransactions", getTransactions);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
