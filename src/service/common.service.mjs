import { v4 as uuidv4 } from 'uuid'
import {StatusCodes} from 'http-status-codes';

export const uuid = () => {
    return uuidv4();
}  

export {StatusCodes}