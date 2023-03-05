
class SortingHatError extends Error {
    constructor () {
      super('Failed to add students name due to issues that arose during the sorting ceremony. Please check that all students have been properly registered and try again.');
      Error.captureStackTrace(this, this.constructor);
  
      this.name = this.constructor.name;
    }
  
    toString (): string {
      return this.message;
    }
  }
  
  export default SortingHatError;
  