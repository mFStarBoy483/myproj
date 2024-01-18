import ErrorHandler from '../utils/errorHandler.js'
export default (err, req, res, next) =>{
    let error ={
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error"
    };

    if (err.name==='CastError'){
        const message =`Resource not found. Invalid: ${err?.path}`;
        error = new ErrorHandler(message, 404);
    }

    if (err.name==='ValidationError'){
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 400);
    }

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        console.log('Sending development error response');
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err?.stack,
        });
    }
    
    if (process.env.NODE_ENV === 'PRODUCTION') {
        console.log('Sending production error response');
        res.status(error.statusCode).json({
            message: error.message,
        });
    }
    
};