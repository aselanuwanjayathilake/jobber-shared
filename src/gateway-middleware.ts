import JWT from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";
import {NotAuthorizedError} from "./error-handler";

const tokens: string[] = ['auth','seller','gig','search','buyer','message','order','review'];

export const verifyGatewayRequest = (req: Request,res: Response,next: NextFunction): void => {
  if(!req.headers?.gatewayToken) {
throw new NotAuthorizedError('Invalid request','Request not coming from api gateway')
  }

  const token: string = req.headers?.gatewayToken as string;

  if(!token) {
    throw new NotAuthorizedError('Invalid request','Request not coming from api gateway')
  }

  try {
    const payload : {id:string,iat: number} = JWT.verify(token,'') as {id:string,iat: number};
    if(!tokens.includes(payload.id)){
      throw new NotAuthorizedError('Invalid request','Request payload is invalid')
    }
  }catch (e) {
    throw new NotAuthorizedError('Invalid request','Request not coming from api gateway')
  }

}
