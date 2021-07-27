import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import NotFound from "./NotFound";

const UserFeed = (props) => {
    const [ user, setUser ] = useState(null);
    const [ bands, setBands ] = useState(null);

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
    }, [props.likes]);

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
                <h2>{user.firstName}'s Dashboard</h2>
                <p>{user.bands}</p>
            </div>
        </div>
    );
};

export default UserFeed;