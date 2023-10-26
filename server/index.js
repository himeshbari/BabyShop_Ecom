import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routers/user.router.js";
import categoryRoutes from "./routers/category.router.js";
import productRoutes from "./routers/product.router.js";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';



const app = express();

//configure env
dotenv.config();

//read image in frontend 
app.use(express.json())
const __dirname = path.resolve();
app.use(express.static(__dirname))

//databse config
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database successfully connnected!");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });


//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/user", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome to BabyCry</h1>");
});

//PORT
const PORT = process.env.PORT || 2020;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running port ${PORT}`);
});
