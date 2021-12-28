import stringHash from 'string-hash';
import * as cookie from 'cookie';
import { v4 } from 'uuid';
import { prisma } from '$lib/prisma/client';

export async function post({body:{email ,password}}) {
    const cookieId = v4();
    const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

	const updateUserSession = await prisma.user.update({
		where: { id: user.id },
		data: { cookie: cookieId }
	});
    if (user && +user.password === stringHash(password)) {
			return {
				status: 200,
				headers: {
					'Set-Cookie': cookie.serialize('session_id', cookieId, {
						httpOnly: true,
						maxAge: 60 * 60 * 24 * 7,
						sameSite: 'lax',
						path: '/'
					})
				},
				body: { user, message: 'success' }
			};
		} else {
			return {
				status: 409,
				body: {
					message: 'User not found'
				}
			};
		}
}