import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



export const ContactsList = () => {

    const navigate = useNavigate()
    const {store, actions} = useContext(Context)

    const handleDelete = async (contactId) => {
        actions.deleteContact(contactId)
    }

    const handleEdit = async (contact) => {
        actions.setCurrentContact(contact)
        navigate("/edit-contact")
    }

    return (

        <div className="container-fluid">
            <div className="container my-2 pb-5">
                <div className="d-flex justify-content-between mx-3 ">
                    <h1 className=" my-4">Contacts</h1>
                    <Link to="/add-contact">
                        <button type="button" className="btn btn-success  my-4">
                            Add Contact
                        </button>
                    </Link>
                </div>
                <div className="container ">
                    <ul className="list-group rounded my-3">
                        {store.contacts.map((item) =>
                            <li key={item.id}
                                className="list-group-item d-flex ">
                                <div className="p-2 flex-fill">
                                    <img className="rounded-circle " src={`https://randomuser.me/api/portraits/men/${item.id}.jpg`} alt="..." />
                                </div>
                                <div className="col-md-6 p-1 flex-fill">
                                    <h5 className="card-title mb-1">{item.name}</h5>
                                    <p className="card-text mb-1">{item.phone}</p>
                                    <p className="card-text mb-1">{item.email}</p>
                                    <p className="card-text mb-1">{item.address}</p>
                                </div>
                                <div className="d-flex align-item-end p-2 flex-fill" style={{height:"60px"}}>
                                    <button onClick={() => handleEdit(item)} type="button" className="btn btn-secondary me-4">
                                    <i className="fas fa-edit "></i>
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} type="button" className="btn btn-danger" >
                                    <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}