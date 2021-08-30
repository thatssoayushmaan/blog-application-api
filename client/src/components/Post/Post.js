import { Link } from 'react-router-dom'
import './Post.css'

export default function Post({post }) {
    // console.log(post)
    const PF = "https://blog-mernstack-application.herokuapp.com/images/"
    return (
        <div className="post">
            {post.photo && (
                <img
                className="postImg"
                src={PF + post.photo}
                alt=""
            />
            )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map(category => {
                        <span className="postCat">
                        {category.name}
                    </span>
                    })}
                </div>
                <Link to={`/post/${post._id}`} className="link">
                <span className="postTitle">
                    {post.title}
                </span>
                </Link>
                
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                {post.desc}
            </p>
        </div>
    )
}
