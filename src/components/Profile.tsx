import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getUserDetails } from "../services/userService";
import User from "../interfaces/User";

interface ProfileProps {

}

const Profile: FunctionComponent<ProfileProps> = () => {
    let [userInfo, setUserInfo] = useState<User>()

    useEffect(() => {
        getUserDetails()
            .then((res) => {
                setUserInfo(res.data)
            })
            .catch((err) => console.log(err)
            )
    }, []);
    return (
        <>
            <div className="card mb-3 col-md-3 " >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="./img/user.png" className="img-fluid rounded-circle" alt="user"></img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{userInfo?.name}</h5>
                            <p className="card-text">{userInfo?.email}</p>
                            <p className="card-text"><small className="text-muted">{userInfo?.isAdmin ? ("This user is admin") : ("Regular user")}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;