import * as api from '$lib/wxc_api.js';
import { writable, readable } from 'svelte/store';

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
export const storeCurrentUrl = writable(undefined);

// Webex Calling User Store
export const wxcUsers = writable([]);
