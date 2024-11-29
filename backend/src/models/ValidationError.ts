import { ZodError } from 'zod';

class ValidationError extends Error {
    errors: {
        [x: string]: string[] | undefined;
        [x: number]: string[] | undefined;
        [x: symbol]: string[] | undefined;
      };
    
      constructor(error: ZodError) {
        super('Validation Error');
        this.errors = this.flattenErrors(error);
      }
    
      flattenErrors(error: ZodError) {
        return error.flatten().fieldErrors;
      }
}

export default ValidationError