<script>
	import Icon from '$lib/components/Icon.svelte';
</script>

<section class="space-y-4">
	<h2 class="h2">Voicemail PIN Reset</h2>
	<p>A voicemail PIN is used to retrieve your voicemail messages.</p>
	<p>
		This utility will allow you to bulk reset the voicemail PIN for multiple users, or for just a
		single user.
	</p>
	<div>
		<p class="font-bold">This utility requires the following:</p>
		<ul class="list pl-5">
			<li>
				<span><Icon name="chevron-right" /></span>
				<span class="flex-auto">The default VM PIN must be set</span>
			</li>
			<li>
				<span><Icon name="chevron-right" /></span>
				<span class="flex-auto"
					>Full administrator, User administrator, or Location administrator privilege</span
				>
			</li>
		</ul>
	</div>
</section>
