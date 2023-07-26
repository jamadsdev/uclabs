<script>
	import { enhance } from '$app/forms';
	import { modalStore } from '@skeletonlabs/skeleton';

	import * as api from '$lib/wxc_api';
	// Stores
	import { storeWxcToken, storeUserData } from '$lib/stores.js';
	import { toastStore } from '@skeletonlabs/skeleton';

	import ModalPinReset from '$lib/components/ModalPinReset.svelte';

	let users = [];
	let locations = [];
	let errorMsg = '';
	let filteredUsers = [];
	let searchTerm = '';

	const normalizePhones = (phones) => {
		let data = {
			did: '',
			extension: ''
		};

		for (let i = 0; i < phones.length; i++) {
			if (phones[i]['primary']) {
				if (phones[i]['type'] == 'work_extension') {
					data.extension = phones[i]['value'];
				} else if (phones[i]['type'] == 'work') {
					data.did = phones[i]['value'];
				}
			}
		}

		if (!data.did && !data.extension) {
			return '';
		} else {
			return `${data.did} ext: ${data.extension}`;
		}
	};

	async function listUsers() {
		console.log('List Users Button Pressed');
		let results = await api.get('telephony/config/voicemail/rules', $storeWxcToken['token']);

		if (results.error) {
			let t = {
				message: results.message,
				timeout: 5000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		} else {
			if (results.defaultVoicemailPinRules['defaultVoicemailPinEnabled']) {
				let resLocations = await api.get('locations', $storeWxcToken['token']);

				locations = resLocations.items;

				let { items } = await api.get('people?callingData=true', $storeWxcToken['token']);
				// Only include users with LocationID
				let temp = [];
				for (let i = 0; i < items.length; i++) {
					if (items[i].locationId != undefined) temp.push(items[i]);
				}
				users = temp;
			} else {
				errorMsg = 'NoDefPIN';
			}
		}
	}

	function resetPinModal(user) {
		const c = { ref: ModalPinReset };
		const modal = {
			type: 'component',
			component: c,
			title: 'Voicemail PIN Reset',
			body: 'PIN Reset Status',
			data: user,
			response: (r) => {
				if (r) console.log('Response:', r);
			}
		};
		modalStore.trigger(modal);
	}
	$: {
		if (searchTerm) {
			filteredUsers = users.filter((user) =>
				user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredUsers = [...users];
		}
	}
</script>

<div class="p-5">
	<div class="grid grid-cols-4 gap-4 pb-2 lg:grid-cols-6">
		<button
			class="btn variant-glass-primary"
			disabled={!$storeWxcToken['valid']}
			on:click={listUsers}>Get User List</button
		>
		{#if users.length > 0}
			<div class="grid col-span-2">
				<input class="input" type="text" placeholder="Search by Name" bind:value={searchTerm} />
			</div>
			<div>
				<!-- <select class="select">
					<option value="1">Name</option>
					<option value="2">Email</option>
					<option value="3">Phone Number</option>
					<option value="4">Location</option>
				</select> -->
			</div>
		{/if}
	</div>

	{#if users == 'noDefPIN'}
		<h3>
			The default voicemail PIN has not been set.<br />This must be set in order for an admin to
			reset a user's voicemail PIN
		</h3>
	{:else if users.length > 0}
		<div class="w-4/5">
			<div class="table-container">
				<table class="table table-compact table-hover">
					<thead>
						<tr>
							<th><input class="checkbox" type="checkbox" /></th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone Number</th>
							<!-- <th>Location</th> -->
							<th />
						</tr>
					</thead>
					<tbody>
						{#each filteredUsers as user, i}
							<tr>
								<td><input class="checkbox" type="checkbox" /></td>
								<td>{user.displayName}</td>
								<td>{user.emails}</td>
								<td
									>{#if user.phoneNumbers}
										{normalizePhones(user.phoneNumbers)}
									{/if}
								</td>
								<!-- <td>{user.locationId}</td> -->
								<td>
									<!-- <form action="?/resetPin" method="POST" use:enhance> -->
									<!-- <input type="hidden" id="id" name="id" value={user.id} /> -->
									<button
										type="submit"
										class="btn btn-sm variant-filled"
										on:click={resetPinModal(user)}>Reset PIN</button
									>
									<!-- </form> -->
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
	<!-- {/await} -->
</div>
