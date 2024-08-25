import express from "express";
import cors from "cors";
import connectDb from "./config/dbConfig";
import dotenv from "dotenv";
import shortUrl from "./routes/shortUrl";

dotenv.config();
connectDb();

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://url-shortener-iota-taupe.vercel.app",
    credentials: true,
  })
);

//Routes
app.use("/api/", shortUrl);

app.listen(port, () => {
  console.log(`Server started successfully at port: ${port}`);
});
