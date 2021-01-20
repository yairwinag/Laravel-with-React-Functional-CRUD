import React, { useState, useEffect } from 'react';
import AppContainer from './AppContainer';
import { useHistory,useParams } from "react-router-dom";
import api from '../api';

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();   
    const[ loading, setLoading ] = useState(false);
    const[ title, setTitle ] = useState ('');
    const[ body, setBody ] = useState ('');

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updatePost({
                title, body,
            }, id)
            history.push('/');
        }catch{
            alert('Fail Edit post');
        }finally {
            setLoading(false);
        }
    }

    useEffect(() =>{
        api.getOnePost(id).then(res => {
            const result = res.data; 
            const post = result;  
            setTitle(post.title);
            setBody(post.body);
        });
    }, []);

    return (
        <AppContainer
            title="Edit Post">
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        className="form-control"
                        type="text"
                        value={title}
                        onChange = {e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Body</label>
                    <textarea 
                        className="form-control"
                        value={body}
                        onChange = {e => setBody(e.target.value)}>
                    </textarea>
                </div>
                <div className="form-group">
                    <button 
                        type="submit" 
                        className="btn btn-success" 
                        onClick={onEditSubmit}
                        disabled={loading}
                        >
                        {loading ? 'LOADING...' : 'Update'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default Edit;