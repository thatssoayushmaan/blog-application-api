import { useContext, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Context } from "../../Context/Context";
import "./Settings.css";
import axios from 'axios'

export default function Settings() {
    const {user} = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState('')
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            updatedUser.profilePic = filename

            try {
                await axios.post('/upload', data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axios.put(`/users/${user._id}`, updatedUser)
            setSuccess(true)
        } catch (error) {
            
        }
    }
    
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Your Account</span>
                    <span className="settingsTitleDelete">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            className="settingsPPInput"
                            onChange={e=>setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} name="name" onChange={e=>setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} name="email" onChange={e=>setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password" onChange={e=>setPassword(e.target.value)}/>
                    <button className="settingsSubmitButton" type="submit">
                        Update
                    </button>
                    {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Updated Successfully....
            </span>
          )}
                </form>
            </div>
            <Sidebar />
        </div>
    );
}