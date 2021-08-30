import { useState, useEffect } from "react";
import axios from 'axios'
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css'
import { useLocation } from "react-router-dom";

export default function Home() {
    const [posts,setPosts] = useState([])
    const {search} = useLocation()

    const getPosts = async () => {
        const res = await axios.get('/posts' + search)
        setPosts(res.data)
        // console.log(res.data[0])
    }

    useEffect(() => {
        getPosts()
    },[search])
    
    return (
        <div>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar />
            </div>
        </div>
    )
}
