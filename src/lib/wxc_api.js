import { error } from '@sveltejs/kit';

const base = 'https://webexapis.com/v1';

async function send({ method, path, data, token }) {
	const opts = { method, headers: {} };

	if (data) {
		console.log('API Data Found');
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	const res = await fetch(`${base}/${path}`, opts);
	if (res.ok || res.status == 422) {
		const text = await res.text();

		return text ? JSON.parse(text) : { result: 'success' };
	}

	return {
		error,
		message: res.statusText
	};
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}
