const mongoose =require("mongoose")

const dbConnect = async () => {
    try {
        await mongoose .connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports=dbConnect

