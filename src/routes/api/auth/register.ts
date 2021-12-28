import stringHash from 'string-hash';
import * as cookie from 'cookie';
import { v4 } from 'uuid';
import {prisma} from "$lib/prisma/client"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function post({body:{email,password,username}}) {

    const result = await prisma.user.findUnique({
        where: {
            email
        }
	});
    const cookieId = v4();

    if(!result){
        const user = await prisma.user.create({ data: { email, username, password: stringHash(password) , cookie:cookieId } });
        
        return {
            status:200,
            headers: {
                'Set-Cookie': cookie.serialize('session_id' , cookieId , {
                    httpOnly:true,
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite:'lax',
                    path:'/'
                }),
            },
            body:{ user , message: 'success'}
        }
    }else{
        return {
            status: 409,
            body:{
                message: 'User email is already exists'
            }
        }
    }
   
}
