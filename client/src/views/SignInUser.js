import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

const NewUser = (props) => {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ bands, setBands ] = useState([]);

    const [errors, setErrors] = useState(null);

    const handleNewUserSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            firstName: firstName,
            lastName : lastName,
            email : email,
            bands : bands

        };

        axios
            .post("http://localhost:5000/api/users", newUser)
            .then((res) => {
                console.log(res);
                navigate(`/users`);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response?.data?.errors);
            });
    };

    return (
        <div className="table">
            <h2 className="">Sign In</h2>
            <form
                onSubmit={(e) => {
                    handleSignIn(e);
                }}
            >
            <div className="form-group">
                <label className="h6">Email:</label>
                <input
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                />
                <div>
                    {errors?.firstName && (
                    <span style={{ color: "red" }}>{errors.firstName.message}</span>
                    )}
                </div>
            </div>
            <div className="form-group">
                <label className="h6">Last Name: </label>
                <input
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                />
                <div>
                    {errors?.lastName && (
                    <span style={{ color: "red" }}>{errors.lastName.message}</span>
                    )}
                </div>
            </div>
            <div className="form-group">
                <label className="h6">Email: </label>
                <input
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    description="text"
                    className="form-control"
                />
                <div>
                    {errors?.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                    )}
                </div>
            </div>

            <Link to="/users"><button style={{ color: "red", cursor: "pointer", margin: "5px", padding: "5px 20px 5px 20px" }}>Cancel</button></Link>
            <button style={{cursor: "pointer", margin: "5px", padding: "5px 20px 5px 20px"}}>Submit</button>
            </form>
        </div>
    );
};

export default NewUser;