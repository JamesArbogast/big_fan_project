import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import { set } from "mongoose";

const EditUser = (props) => {
    const [firstName, setFirstName] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ bands, setBands ] = useState([]);

    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users/" + props.id)
            .then((res) => {
                console.log(res);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
                setBands(res.data.bands);
            })
            .catch((err) => {
                setErrors(err.response?.data?.errors);
                console.log(err);
            });
    }, [props.id]);

    const handleEditUserSubmit = (event) => {
    event.preventDefault();

    const editedUser = {
        firstName: firstName,
        lastName : lastName,
        email : email,
        bands : bands
    };

    axios
        .put(
            `http://localhost:5000/api/users/${props.id}/edit`,
            editedUser
        )
        .then((res) => {
            console.log(res);
            navigate("/users/" + props.id);
        })
        .catch((err) => {
            setErrors(err.response?.data?.errors);
            console.log(err);
        });
    };

    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
            <h3 className="text-center">New User</h3>

            <form
                onSubmit={(e) => {
                handleEditUserSubmit(e);
            }}
            >
                <div className="form-group">
                    <label className="h6">First Name: </label>
                    <input
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        value={firstName}
                    />
                </div>
                <div>
                    {errors?.firstName && (
                        <span style={{ color: "red" }}>{errors.firstName.message}</span>
                    )}
                </div>
                <div className="form-group">
                    <label className="h6">Last Name: </label>
                    <input
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        value={lastName}
                    />
                </div>
                <div>
                    {errors?.lastName && (
                        <span style={{ color: "red" }}>{errors.lastName.message}</span>
                    )}
                </div>
                <div className="form-group">
                    <label className="h6">Email: </label>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        value={email}
                    />
                </div>
                <div>
                    {errors?.email  && (
                        <span style={{ color: "red" }}>{errors.email.message}</span>
                    )}
                </div>
                    <div className="form-group">
                            <label className="h6">Bands: </label>
                            <input
                                onChange={(e) => {
                                    setBands(e.target.value);
                                }}
                                type="text"
                                className="form-control"
                                value={bands}
                            />
                    </div>
            <button className="btn btn-sm btn-outline-success">Edit User</button>
        </form>
    </div>
    );
};

export default EditUser;