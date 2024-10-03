<script>
    import { page } from '$app/stores';
    let pages = [
        {url: "/", title: "Home"},
        {url: "contact/", title: "Contacts"},
        {url: "cv/", title: "CV"},
        {url: "projects/", title: "Projects"},
        {url: "https://github.com/StrangeAndStranger", title: "Github Profile"}
    ];

    
    let localStorage = globalThis.localStorage ?? {};
    let colorScheme = localStorage.colorScheme ? localStorage.colorScheme : "light dark";
    $: localStorage.colorScheme = colorScheme;

    let root = globalThis?.document?.documentElement;
    $: root?.style.setProperty("color-scheme", colorScheme);
</script>

<nav>
    <!-- { JSON.stringify($page) } -->
    {#each pages as p }
    <a href={ p.url } class:current={ "." + $page.route.id === p.url } target={ p.url.startsWith("http") ? "_blank" : null }>{ p.title }</a>
	{/each}
</nav>
<label class="color-scheme" style="position: absolute;">
    Theme:
    <select bind:value={colorScheme}>
        <option>light</option>
        <option>light dark</option>
        <option>dark</option>
    </select>
</label>`
<slot />