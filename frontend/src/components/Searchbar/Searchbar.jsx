import React from "react";
import "./Searchbar.css"
import search_icon from "../../assets/search_icon.png"

const SearchBar = ({ className }) => {

    return(
        <div className={`search-container ${className}`}>
            <img src={search_icon} alt="" />
            <input type="text" className="search-input" placeholder="Search" />
        </div>
    )
}

export default SearchBar;