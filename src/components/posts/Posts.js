import { useAuth } from "../../AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "../imageupload/ImageUpload";
import "./Posts.css";
import Post from "../post/Post";

function Posts() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);

    document.title = 'Facebook';

    const fetchPosts = () => {
        axios.get('http://localhost:8080/api/posts')
            .then(response => {

                setPosts(response.data)
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    const handleNewPost = () => {

        fetchPosts()
    };
    const handlePostDelete = (deletedPostId) => {
        // Cập nhật lại mảng posts sau khi xóa bài đăng thành công
        setPosts(posts.filter(post => post.post_id !== deletedPostId));
    }
    return (
        <div className="posts">
            <ImageUpload onNewPost={handleNewPost} />
            {
                posts.map(post => (
                    <Post postId={post.post_id} user={user} username={post.account.username} caption={post.content}  noLikes={post.likes} postUserId={post.account.account_id}visibility={post.visibility.name}                         onDeleteSuccess={handlePostDelete} />
                ))
            }
        </div>
    );
}

export default Posts;