import { redirect, error } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		const loginFormData = await request.formData();
		const email = loginFormData.get('email')?.toString() ?? '';
		const password = loginFormData.get('password')?.toString() ?? '';

		let loginResponse = {
			email,
			error: true,
			message: ''
		};

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
			console.log('auth store', locals.pb.authStore);
			if (locals.pb.authStore.baseToken) throw redirect(303, '/docs');
			// } catch (err) {
			// 	console.log('Login Error:', err);
			// 	throw error(500, 'Something went wrong logging in');
		} finally {
			if (!locals.pb.authStore.baseToken) return loginResponse;
		}
	}
};
