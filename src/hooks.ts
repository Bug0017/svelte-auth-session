import * as cookie from 'cookie'
import { prisma } from '$lib/prisma/client';

export async function getSession(request){
    const { session_id } = cookie.parse(request.headers.cookie);
    if (session_id){
        const userSessionExit = await prisma.user.findFirst({
					where: {
						cookie: session_id
					}
		});

        if (userSessionExit ) {
            return {
                authenticated:true,
                userSessionExit
            }
        }else{
             return {
                authenticated: false,
            };
        }
    }else{
        return {
            authenticated:false,
        }
    }
}

export async function handleError({ error, request }) {
	// example integration with https://sentry.io/
	console.log(error,request)
}