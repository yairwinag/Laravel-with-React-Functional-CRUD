import React from 'react';
import { Link } from 'react-router-dom';

const AppContainer = ({title, children}) => {
    return (
        <div className="container">
        <div className="card">
            <h2 className="card-header">{title}</h2>
            <div className="card-body table-bordered">
               
                 {children}
            </div>
            </div>
        </div>
    );
};

export default AppContainer;