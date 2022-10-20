class BaseError extends Error {
    
    constructor(name, httpCode, description, isOperational) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        //Error.captureStackTrace(this);
    }
}
   
   //free to extend the BaseError
class APIError extends BaseError {
    constructor(name, httpCode, isOperational = true, description = 'internal server error') {
        super(name, httpCode, isOperational, description);
    }
}

class Http400Error extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode, isOperational, description);
    }
}

class AUTHError extends BaseError {
    constructor(name, httpCode=401, isOperational = true, description = 'Authentication Error') {
        super(name, httpCode, description,isOperational);
    }

}

class NotFoundError  extends BaseError{
    constructor(name, httpCode =404 , isOperational = true, description = 'Resource Not Found') {
        super(name, httpCode, isOperational, description);
    }
}
class EmptyError extends BaseError {
    constructor(name, httpCode = 204, isOperational = true, description = 'No Record Found') {
        super(name, httpCode, description,isOperational);
    }

}


module.exports = {
    APIError,
    Http400Error,
    AUTHError,
    EmptyError,
    NotFoundError
}
