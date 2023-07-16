/** @type {import('./$types').PageServerLoad} */

export async function load({ locals }) {
	// console.log(locals);
	if (!locals.pb.authStore.token) {
		console.log('No User Logged In');
		return {};
	} else {
		return { user: locals.user };
	}
}
