const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { User } = require("../models/User");
const { ListingCategory } = require('../models/ListingCategory');
dotenv.config();
const categories = [
    { name: "Phones & Accessories", description: "Phones & Accessories category", icon: "fa-solid fa-mobile-screen-button" },
    { name: "Kitchen Appliances", description: "Kitchen Appliances category", icon: "fa-solid fa-utensils" },
    { name: "Cars", description: "Cars category", icon: "fa-solid fa-car" },
    { name: "Properties", description: "Properties category", icon: "fa-solid fa-house" },
    { name: "Men Fashion", description: "Men Fashion category", icon: "fa-solid fa-shirt" },
    { name: "Women Fashion", description: "Women Fashion category", icon: "fa-solid fa-shirt" },
    { name: "Skincare Products", description: "Skincare Products category", icon: "fa-solid fa-face-smile" },
  ];
const categorySeeder = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        for(const category of categories){
            const existingCategory = await ListingCategory.findOne({name: category.name});
            if(existingCategory){
                console.log(`Category with name ${category.name} already exists`);
                continue;
            }else{
                const newCategory = new ListingCategory({
                    ...category,
                });
                await newCategory.save();
                console.log(`Category ${category.name} created successfully`);
            }
        }
        console.log("All categories seeded successfully");
        process.exit(0);
    }catch(error){
        console.error("Error seeding categories:", error);
        process.exit(1);
    }
}

categorySeeder();
