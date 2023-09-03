<script>
	/** @type {import('./$types').PageData} */
	// export let data;
	import { AppShell } from '@skeletonlabs/skeleton';
	// import { TableOfContents } from '@skeletonlabs/skeleton';
	import LayoutContent from '$lib/layouts/LayoutContent.svelte';
	import Icon from '$lib/components/Icon.svelte';

	// export let tocKey = undefined;
</script>

<LayoutContent enableToc={true}>
	<header class="space-y-4">
		<h1 class="h1">Getting Started</h1>
		<p>
			This site will be under consistant development to add more features and utilities. I am hoping
			to cover things that admins don't have the ability to do in Control Hub. Eventually I will be
			expanding out to Webex Contact Center and Webex Meetings/Chat. More to come!!
		</p>
	</header>
	<section class="space-y-4">
		<h2 class="h2">Requirements</h2>
		<blockquote class="blockquote">Partner accounts are not currently suppported.</blockquote>
		<p>Most/All of these utilities require you to be at least one of the following roles:</p>
		<ul class="list pl-5">
			<li>
				<span><Icon name="chevron-right" /></span>
				<span>Full Administrator</span>
			</li>
			<li>
				<span><Icon name="chevron-right" /></span>
				<span>User Administrator</span>
			</li>
			<li>
				<span><Icon name="chevron-right" /></span>
				<span>Location Administrator</span>
			</li>
		</ul>
	</section>

	<section class="space-y-4">
		<h2 class="h2">Getting Your Access Token</h2>
		<blockquote class="blockquote">
			This personal access token is temporary and will be valid for 12 hours.<br />
			Your access token is only stored in the browser. It will not persist between sessions.
		</blockquote>
		<ul class="list pl-5">
			<li>
				<span><Icon name="chevron-right" /></span>
				<span>
					Go to <a href="https://developer.webex.com" target="_blank" class="underline"
						>&nbsp;Webex for Developers&nbsp;</a
					> and login
				</span>
			</li>
			<li>
				<span><Icon name="chevron-right" /></span>
				<span>
					Navigate to any of the API endpoints (<a
						href="https://developer.webex.com/docs/api/v1/people/get-my-own-details"
						class="underline"
						target="_blank">Example</a
					>)
				</span>
			</li>
			<li>
				<span><Icon name="chevron-right" /></span>
				<span>Copy your personal Bearer token</span>
			</li>
			<li>
				<span class="pl-8"><img src="/img/HowToBearer.png" alt="Bearer Token" /></span>
			</li>
			<li>
				<span><Icon name="chevron-right" /></span>
				<span>
					With your brand new bearer token, you can use it for any of the Webex Calling utilities.
				</span>
			</li>
		</ul>
	</section>

	<!-- <h2 class="h2">Creating an Account</h2> -->
	<!-- <h2 class="h2">Planned Capabilities</h2> -->
</LayoutContent>
