import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import NotFound from "./NotFound";

const User = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users/" + props.id)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate("/notFound")
            });
    }, []);

    const handleDelete = (delId) => {
        axios
        .delete("http://localhost:5000/api/users/" + delId)
        .then((res) => {
            navigate("/users");
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleEdit = (edtId) => {
        axios
        .put("http://localhost:5000/api/users/" + edtId + "/edit")
        .then((res) => {
            navigate(`/users/${edtId}/edit`);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    if (user === null) {
        return "Loading...";
    }
    return (
        <div className={"table"}>
        <h2 style={{marginLeft: "90px"}}>Edit your profile: {user.firstName} {user.lastName}</h2>
        <div style={{marginLeft: "90px"}}>
            <h3>Name:</h3>
            <p>{user.firstName} {user.lastName}</p>
            <h3>Email:</h3>
            <p>{user.email}</p>
            <h3>Bands:</h3> 
            {user.bands.map((band) => {
                return (
                    <p key={band._id}>{band}</p>
                )
            } )}
        <div>
                <button 
                    style={{}}
                    onClick={(e) => {
                    handleEdit(user._id);
                    }}
                    style={{ color: "red", cursor: "pointer", margin: "5px" }}
                >Edit
                </button>
                <button
                    style={{margin: "5px"}}
                    onClick={(e) => {
                    handleDelete(user._id);
                    }}
                    style={{ color: "red", cursor: "pointer", margin: "5px" }}
                >Delete
                </button>
            </div>
        </div>
        </div>
    );
};

export default User;