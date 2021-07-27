import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import "../App.css"

const Users = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/users")
        .then((res) => {
            const sortedUsers = res.data.sort((a, b) =>
            a.type.localeCompare(b.type)
            );
            setUsers(sortedUsers);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleDelete = (deletedId) => {
        axios
            .delete("http://localhost:5000/api/users/" + deletedId)
            .then((res) => {
                // At this point it is deleted from DB but we need to cause a re-render to remove it from the page.
                const filteredUsers = users.filter((user) => {
                return user._id !== deletedId;
                });

                setUsers(filteredUsers);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    return (
        <div className={"table"}>
        <h3 style={{marginLeft: "85px", fontSize: "30px"}}>All Users</h3>
        <table className={"innerTable"} cellPadding="0px" cellSpacing="0px">
            <thead>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
            </thead>
        {users.map((user) => {
            return (
                <tr
                    key={user._id}
                >
                    <td>
                    <Link to={"/users/" + user._id} style={{margin: "10px", textDecoration: "none", fontSize: "20px", color: "darkblue"}}>{user.firstName} {user.lastName}</Link>
                    </td>
                    <td>
                        <Link to={`/users/${user._id}`} style={{margin: "10px", textDecoration: "none", fontSize: "20px", color: "darkblue"}}>details</Link> | <Link to={`/users/${user._id}/edit`} style={{margin: "10px", textDecoration: "none", fontSize: "20px", color: "darkblue"}}>edit</Link>
                    </td>
                </tr>
            );
        })}
        </table>
        </div>
    );
};

export default Users;