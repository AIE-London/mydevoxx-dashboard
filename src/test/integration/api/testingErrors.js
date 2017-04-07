function UnexpectedErrorException (message, innerException) {
    this.name = 'UnexpectedErrorException';
    this.message = message || "There was an unexpected error";
    this.innerException = innerException || undefined;
};

UnexpectedErrorException.prototype = Error.prototype;

function UnexpectedSuccessException (message) {
    this.name = 'UnexpectedSuccessException';
    this.message = message || "There was an unexpected success";
};

UnexpectedSuccessException.prototype = Error.prototype;

function MappingSetupException (message, innerException) {
    this.name = 'MappingSetupException';
    this.message = message || "There was an error setting up mapping";
    this.innerException = innerException || undefined;
};

MappingSetupException.prototype = Error.prototype;

export {
    UnexpectedErrorException,
    UnexpectedSuccessException,
    MappingSetupException
}