import express from 'express';
import cors from 'cors';
import path from 'path';

const registerCommonMiddleware = ( server: express.Application ) => {
    
    // Retrive body/json
    server.use(express.json());

    // Set cors headers
    server.use(cors());

    // Have Node serve files for our React App
    server.use(express.static(path.resolve(__dirname, `../../../react-app/build`)));

}

export default registerCommonMiddleware;