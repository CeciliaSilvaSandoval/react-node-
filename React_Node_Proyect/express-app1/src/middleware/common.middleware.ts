import express from 'express';
import cors from 'cors';
import path from 'path'

const registerCommonMiddleware = ( server: express.Application ) => {
    
    server.use(express.json());

    // Set cors headers
    server.use(cors());

    // Serve static files 
    server.use(express.static(path.resolve(__dirname,'../../../react-app/build')));

}

export default registerCommonMiddleware;