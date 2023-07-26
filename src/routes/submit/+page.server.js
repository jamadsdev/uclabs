/** @type {import('./$types').RequestHandler} */
// import { error, fail } from '@sveltejs/kit';

// import * as api from '$lib/wxc_api';

export const actions = {
	submitToken: async ({ request, cookies }) => {
		const loginFormData = await request.formData();
		const token = loginFormData.get('token')?.toString() ?? '';
		console.log('submitToken action invoked');

		console.log('Token:', token);
		cookies.set('wxc_access', token, {
			path: '/',
			httpOnly: false,
			secure: false,
			sameSite: false
		});

		return { success: true };
	}
	// listUsers: async ({ request }) => {
	// 	const loginFormData = await request.formData();
	// 	const token = loginFormData.get('token')?.toString() ?? '';

	// 	const results = await api.get('telephony/config/voicemail/rules', token);

	// 	if (results.defaultVoicemailPinRules['defaultVoicemailPinEnabled']) {
	// 		const { items } = await api.get('people?callingData=true', token);
	// 		return items;
	// 	} else {
	// 		return 'noDefPIN';
	// 	}
	// }
};
