<script>
	import { ProgressRadial, SlideToggle, toastStore } from '@skeletonlabs/skeleton';

	// Stores
	import { storeWxcToken, wxcUsers } from '$lib/stores.js';
	import * as api from '$lib/wxc_api';
	import { normalizePhones } from '$lib/utils';

	import LayoutContent from '$lib/layouts/LayoutContent.svelte';

	// Local Variables
	let filteredUsers = [];
	let selUsers = [];
	let searchTerm = '';
	let loading = false;

	// Functions
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
	}

	async function hotelStatus(id) {
		let status = await api.get(`people/${id}/features/hoteling`, $storeWxcToken['token']);
		console.log('Hoteling', status.enabled);
		return status.enabled;
	}

	async function changeStatus(id, status) {
		// https://webexapis.com/v1/people/{personId}/features/hoteling
		let result = await api.put(
			`people/${id}/features/hoteling`,
			{ enabled: !status },
			$storeWxcToken['token']
		);
		if (result.error) {
			let t = {
				message: results.message,
				timeout: 3000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		} else {
			let t = {
				message: `Hoteling has been set to ${!status}`,
				timeout: 3000,
				background: 'variant-filled-success'
			};
			toastStore.trigger(t);
		}
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

<LayoutContent>
	<div>
		<span class="h1 pb-2">Enable/Disable Hoteling</span>
		<span class="h4 pb-2"
			>&nbsp;&nbsp;&nbsp;(<a class="hover-cursor" href="/docs/wxc#hoteling">docs</a>)</span
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
				<!-- <button class="btn variant-glass-secondary" on:click={resetPinModal(selUsers)}
					>Bulk Set Hoteling ({selUsers.length})
				</button> -->
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
								<th>Hotel Status</th>
							</tr>
						</thead>
						<tbody>
							{#each filteredUsers as user, i}
								<tr>
									<td
										><input
											class="checkbox"
											type="checkbox"
											bind:group={selUsers}
											value={user}
										/></td
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
										{#await hotelStatus(user.id)}
											<!-- <SlideToggle size="sm" checked="true" /> -->
											<ProgressRadial stroke={80} width="w-4" />
										{:then status}
											<SlideToggle
												name="status"
												size="sm"
												checked={status}
												on:change={changeStatus(user.id, status)}
											/>
										{/await}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</LayoutContent>
