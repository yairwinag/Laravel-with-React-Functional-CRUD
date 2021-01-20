import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Home = () => {

    const [posts, setPosts] = useState(null);

    const fetchPosts = () => {
        api.getAllPosts().then(res => {
            const result = res.data;
            setPosts(result)
        });
    }

    useEffect(() =>{
       fetchPosts();
    }, []);

    const renderPosts = () => {  
        if(!posts) {
            return (
                <tr>
                    <td colSpan="4">
                        Loading posts....
                    </td>
                </tr>
            );
        }
        if(posts.length === 0){
            return (
                <tr>
                    <td colSpan="4">
                        There is no post yet.Add one.
                    </td>
                </tr>
            );
        }
                
        return posts.map((post) => (
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>
                        <Link to={`/edit/${post.id}`} className="btn btn-warning mr-2">Edit</Link>
                        <button 
                            className="btn btn-danger" 
                            type="button"
                            onClick={() => {
                                api.deletePost(post.id)
                                .then(fetchPosts)
                                .catch(err => {
                                    alert("Fail to delete post with id" + post.id)
                                })
                            }}
                        >
                                Del
                        </button>
                    </td>
                </tr>
        ))
    }

    return (
        <AppContainer
            title="Laravel React JS-CRUD"
        >
                <div className="m-4">
                <Link to="/add" className="btn btn-primary">ADD POST</Link>
                </div>
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       { renderPosts() }
                    </tbody>
                </table>
        </AppContainer>
    );
};

export default Home;