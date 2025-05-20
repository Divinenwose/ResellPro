import React, { useEffect, useState } from "react";
import "./ProductCategories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFile, faDollarSign, faCheckSquare, faTimesSquare, faNairaSign, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import kettle from "../../assets/kettle.jpeg";
import DonutChart from "../DonutChart/DonutChart";
import GradientAreaChart from "../GradientAreaChart/GradientAreaChart";
import formatDate from "../../utils/FormatDate";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

const ProductCategories = (props) => {
    const apiURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [categoryData, setCategoryData] = useState({
        name: "",
        description: "",
        id: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(apiURL + "/api/listing-categories");
            const data = await response.json();
            setCategories(data.data);
        };
        if (categories.length === 0) {
            fetchData();
        }
    }, [categories, rerender]);
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCreate = () => {
        setCategoryData({
            name: '',
            description: '',
            id: ''
        });

        handleOpenModal();
    };

    const handleEdit = (id, name, description) => {
        setCategoryData({
            name: name,
            description: description,
            id: id
        });

        handleOpenModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (categoryData.id) {
            try{
                // Update category
                const response = await fetch(apiURL + "/api/listing-categories/" + categoryData.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                    },
                    body: JSON.stringify({
                        name: categoryData.name,
                        description: categoryData.description
                    })
                });

                const data = await response.json();
                if (data.success) {
                    setCategories(
                        categories.map(item => item._id === categoryData.id ? data.data : item)
                    );
                    handleCloseModal();
                    toast.success(data.message);
                }else{
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        }else{
            // Create category
            try{
                const response = await fetch(apiURL + "/api/listing-categories/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                    },
                    body: JSON.stringify({
                        name: categoryData.name,
                        description: categoryData.description
                    })
                });
                const data = await response.json();
                if (data.success) {
                    setCategories([...categories, data.data]);
                    handleCloseModal();
                    toast.success(data.message);
                }else{
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        }
    };

    return (
        <div className="main-dashboard-container">
            <div className="main-dashboard-header">
                <h3>Product Categories</h3>
            </div>
            <div className="stats-cards">
                <div className="stats-card">
                    <div className="stats-card-icon">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <h4>Total Categories</h4>
                    <p>{props.stats[0].total_categories}</p>
                </div>
                <div className="stats-card">
                    <div className="stats-card-icon">
                        <FontAwesomeIcon icon={faFile} />
                    </div>
                    <h4>Most Popular Category</h4>
                    <p>{props.stats[0]?.most_popular_category?.name ?? ""}</p>
                </div>
                <div className="stats-card create-category-card" style={{cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center"}}
                    onClick={() => handleCreate()}
                >
                    <div className="create-category-card-icon">
                        <FontAwesomeIcon icon={faPlus} />
                        <h4>Add New Category</h4>
                    </div>
                </div>
            </div>
            <div className="main-dashboard-content">
                <div className="content-table">
                    {categories.length > 0 ? (
                        <table className="content-table-table">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody style={{border: "1px solid #D3D3D3", textAlign: "center"}}> 
                            {categories.map((item, index) => (
                                <tr key={index} className="content-table-row">
                                    <td>{index + 1}</td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{formatDate(item.createdAt, true)}</td>
                                    <td style={{maxWidth: "100px"}}>
                                        <div className="content-table-status" style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                                            <FontAwesomeIcon icon={faEdit} style={{color: "green", cursor: "pointer"}} onClick={() => handleEdit(item._id, item.name, item.description)}/>
                                            {/* <FontAwesomeIcon icon={faTrash} style={{color: "red", cursor: "pointer" }}/> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="content-table-no-data">
                            <p>No Product Categories found</p>
                        </div>
                    )}
                </div>
                
            </div>
            
            <Modal show={showModal} onClose={handleCloseModal}>
                <div>
                    <div className="form-header">
                        {categoryData.id ? (
                            <h3>Edit Category</h3>
                        ) : (
                            <h3>Add New Category</h3>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px"}}>
                        <div>
                            <input type="text" className="form-input" placeholder="Category Name" value={categoryData.name} onChange={(e) => setCategoryData({...categoryData, name: e.target.value})}/>
                        </div>
                        <div>
                            <input type="text" className="form-input" placeholder="Category Description" value={categoryData.description} onChange={(e) => setCategoryData({...categoryData, description: e.target.value})}/>
                        </div>
                        <div>
                            <button className="form-button" type="submit">
                                {categoryData.id ? "Update Category" : "Add Category"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ProductCategories;

