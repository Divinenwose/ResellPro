import React from "react";
import "./Home.css"
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/Searchbar/Searchbar";
import ListedProject from "../../components/ListedProject/ListedProject";
import Footer from "../../components/Footer/Footer";


const HomePage = () => {
    return(
        <div className="Home">
            <Hero />
            <SearchBar />
            <ListedProject />
            <Footer />
        </div>
    )
}

export default HomePage;