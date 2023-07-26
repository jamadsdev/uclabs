import { writable } from 'svelte/store';

export const storeWxcToken = writable([
	{
		token: '',
		valid: false
	}
]);
export const storeUserData = writable([
	{
		displayName: '',
		orgName: ''
	}
]);
export const storeWxcTab = writable(0);
