<script>
	import { enhance } from '$app/forms';
	import { modalStore } from '@skeletonlabs/skeleton';

	import { normalizePhones } from '$lib/utils';
	import * as api from '$lib/wxc_api';
	// Stores
	import { storeWxcToken, wxcUsers } from '$lib/stores.js';
	import { toastStore } from '@skeletonlabs/skeleton';

	import ModalPinReset from '$lib/components/ModalPinReset.svelte';

	let users = [];
	// let locations = [];
	let errorMsg = '';
	let filteredUsers = [];
	let selUsers = [];
	let searchTerm = '';
	let loading = false;

	function selectAll(users) {
		if (selUsers.length > 0) {
			selUsers = [];
		} else {
			selUsers = [...$wxcUsers];
		}
	}
	async function listUsers() {
		selUsers = [];
		loading = true;
		let results = await api.get('telephony/config/voicemail/rules', $storeWxcToken['token']);
		if (results.error) {
			let t = {
				message: `${results.message} - See <a class="underline" href="/docs/troubleshooting">docs</a> for more information`,
				timeout: 5000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
			loading = false;
		} else {
			if (results.defaultVoicemailPinRules['defaultVoicemailPinEnabled']) {
				let resUsers = await api.get('people?callingData=true', $storeWxcToken['token']);

				if (resUsers.error) {
					let t = {
						message: results.message,
						timeout: 5000,
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
					loading = false;
				} else {
					// Only include users with LocationID
					let temp = [];
					for (let i = 0; i < resUsers.items.length; i++) {
						if (resUsers.items[i].locationId != undefined) temp.push(resUsers.items[i]);
					}
					// users = temp;
					$wxcUsers = temp;
					loading = false;
				}
			} else {
				let t = {
					message: 'Default VM PIN is not set',
					timeout: 5000,
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
				loading = false;
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
			buttonTextCancel: 'Close',

			response: (r) => {
				if (r) console.log('Response:', r);
			}
		};
		modalStore.trigger(modal);
	}
	$: {
		if (searchTerm) {
			filteredUsers = $wxcUsers.filter((user) =>
				user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredUsers = [...$wxcUsers];
		}
	}
</script>

<div>
	<span class="h1 pb-2">Voicemail PIN Reset</span>
	<span class="h4 pb-2"
		>&nbsp;&nbsp;&nbsp;(<a class="hover-cursor" href="/docs/wxc#voicemail-pin-reset">docs</a>)</span
	>
	<hr />
	<div class="grid grid-cols-4 gap-4 py-5 lg:grid-cols-6">
		<button
			class="btn variant-glass-primary"
			disabled={!$storeWxcToken['valid']}
			on:click={listUsers}
		>
			{#if $wxcUsers.length > 0}
				Refresh User List
			{:else}
				Get User List
			{/if}
		</button>
		{#if $wxcUsers.length > 0}
			<div class="grid col-span-2">
				<input class="input" type="text" placeholder="Search by Name" bind:value={searchTerm} />
			</div>
		{/if}
		{#if selUsers.length > 0 && $wxcUsers.length > 0}
			<button class="btn variant-glass-secondary" on:click={resetPinModal(selUsers)}
				>Bulk PIN Reset ({selUsers.length})
			</button>
		{/if}
	</div>

	{#if loading}
		<div class="grid grid-cols-4 gap-4 w-4/5">
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
		</div>
	{:else if $wxcUsers.length > 0}
		<div class="w-full">
			<div class="table-container">
				<table class="table table-compact table-hover">
					<thead>
						<tr>
							<th><input class="checkbox" type="checkbox" on:click={selectAll($wxcUsers)} /></th>
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
								<td
									><input class="checkbox" type="checkbox" bind:group={selUsers} value={user} /></td
								>
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
										on:click={resetPinModal(user)}
										disabled={selUsers.length > 0 ? true : false}>Reset PIN</button
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
