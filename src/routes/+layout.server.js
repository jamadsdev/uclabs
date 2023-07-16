/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	if (locals.user) {
		return { user: locals.user };
	} else {
		return {};
	}
}
