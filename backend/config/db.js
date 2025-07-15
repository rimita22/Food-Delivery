import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://rimitasarkar2003:RIMITA22%23%23@cluster0.irdkbvt.mongodb.net/food-del'
    )
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error:", err));
};
