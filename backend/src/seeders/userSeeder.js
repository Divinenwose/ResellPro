const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { User } = require("../models/User");
dotenv.config();
const users = [
    {
      name: "Admin User",
      email: "admin@resellpro.com",
      password: "Admin123!",
      roles: ["admin"],
    }
  ];
const userSeeder = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        for(const user of users){
            const existingUser = await User.findOne({email: user.email});
            if(existingUser){
                console.log(`User with email ${user.email} already exists`);
                continue;
            }else{
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const newUser = new User({
                    ...user,
                    password: hashedPassword,
                });
                await newUser.save();
                console.log(`User ${user.name} created successfully`);
            }
        }
        console.log("All users seeded successfully");
        process.exit(0);
    }catch(error){
        console.error("Error seeding users:", error);
        process.exit(1);
    }
}

userSeeder();
