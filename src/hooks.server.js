import PocketBase from 'pocketbase';
import { ENVIRONMENT, PB_EMAIL, PB_PASSWORD } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
	// const adminPb = new PocketBase('http://10.7.20.89:8090');
	// const pb = new PocketBase('http://10.7.20.89:8090');

	// await adminPb.admins.authWithPassword(PB_EMAIL, PB_PASSWORD);
	// event.locals.adminPb = adminPb;
	event.locals.pb = new PocketBase('http://10.7.20.89:8090');

	//Load authStore from cookie
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// try {
	// 	//Refresh auth if it is still valid
	// 	if (!event.locals.pb.authStore.isValid) await event.locals.pb.authStore.authRefresh();
	// 	event.locals.user = { ...event.locals.pb.authStore.model };
	// } catch (err) {
	// 	console.log('Hooks:', 'Expired Cookie');
	// 	event.locals.pb.authStore.clear();
	// }
	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		console.log('Hook: Failed Refresh');
		event.locals.pb.authStore.clear();
	}
	const response = await resolve(event);

	//Set the cookie
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: ENVIRONMENT === 'production'
		})
	);
	// response.headers.set(
	// 	'set-cookie',
	// 	event.locals.pb.authStore.exportToCookie({
	// 		secure: ENVIRONMENT === 'production'
	// 	})
	// );

	return response;
};
