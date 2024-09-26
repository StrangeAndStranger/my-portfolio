<script>
    import projects from '$lib/projects.json';
    import Project from '$lib/Project.svelte';
</script>
<svelte:head>
	<title>Prior projects</title>
</svelte:head>

<h1>{ projects.length } Projects</h1>

{#each projects as p}
    <Project data={p} />
{/each}
