<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<script>
    import projects from '$lib/projects.json';
    import Project from '$lib/Project.svelte';
</script>

<h1>Alana Gerald</h1>

<p>Hi! I'm Alana, I'm an ECE student.</p>

<img src="images/Cat03.jpg" alt="Headshot of an orange cat staring at the camera">

<h2>Recent Projects</h2>
{#each projects.slice(0, 3) as p}
    <Project data={p} hLevel=3/>
{/each}