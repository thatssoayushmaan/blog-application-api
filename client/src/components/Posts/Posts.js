import './Posts.css'
import Post from '../Post/Post'

export default function Posts({posts}) {
    // console.log(posts)
    return (
        <div className="posts">
            <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
        </div>
    )
}
