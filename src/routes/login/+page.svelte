<script>
	/** @type {import('./$types').PageData} */

	export let form;

	let thisForm;
	let showPassword = false;
	let email;

	$: {
		if (email && form?.error) email.focus();
	}
</script>

<div class="flex flex-col items-center mt-4">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Login to your account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>register</a
		> if you don't already have an account.
	</p>
	<form
		bind:this={thisForm}
		action="?/login"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-4"
	>
		<div class="w-full max-w-md">
			<label for="email" class="label font-medium pb-1">
				<span>Email</span>
			</label>
			<input
				bind:this={email}
				type="email"
				name="email"
				class="form-input w-full max-w-md text-black"
			/>
		</div>
		<div class="w-full max-w-md">
			<label for="password" class="font-medium pb-1">
				<span>Password</span>
			</label>
			<input type="password" name="password" class="form-input w-full max-w-md text-black" />
		</div>
		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn variant-glass-primary w-40">Login</button>
		</div>
	</form>
</div>
