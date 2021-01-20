import React, { useState } from 'react';
import AppContainer from './AppContainer';
import { useHistory } from "react-router-dom";
import api from '../api';

const Add = () => {
    const history = useHistory();   
    const[ loading, setLoading ] = useState(false);
    const[ title, setTitle ] = useState ('');
    const[ body, setBody ] = useState ('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addPost({
                title, body,
            })
            history.push('/');
        }catch{
            alert('Fail add post');
        }finally {
            setLoading(false);
        }
    }

    return (
        <AppContainer
            title="Add Post">
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
                        onClick={onAddSubmit}
                        disabled={loading}
                        >
                        {loading ? 'LOADING...' : 'ADD'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default Add;