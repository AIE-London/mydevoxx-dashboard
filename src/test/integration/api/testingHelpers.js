import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";

function expectNotFoundOrRethrowError(error, message){
    if (isATestingException(error) || isAnExpectFailure(error)){
        throw error;
    } else {
        if (error.statusCode){
            expect(error.statusCode).toBe(404);
        } else {
            throw UnexpectedErrorException(message, error);
        }
    }
}

function isATestingException(error){
    return (error && error.name && ["UnexpectedErrorException", "UnexpectedSuccessException", "MappingSetupException"].indexOf(error.name) > -1);
}

function isAnExpectFailure(error){
    return (error && error.matcherResult);
}

function raiseOrPassError(type, message, error){
    if (isATestingException(error) || isAnExpectFailure(error)) {
        throw error; // Pass the existing error on
    } else {
        switch(type){ // Raise a new Testing Error
            case "UnexpectedErrorException":
                throw new UnexpectedErrorException(message, error);
                break;
            case "UnexpectedSuccessException":
                throw new UnexpectedSuccessException(message);
                break;
            case "MappingSetupException":
                throw new MappingSetupException(message, error);
                break;
            default:
                throw error;
        }
    }
}

export {
    expectNotFoundOrRethrowError,
    raiseOrPassError
}