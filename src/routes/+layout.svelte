<script>
    import { page } from '$app/stores';
    let pages = [
        {url: "/", title: "Home"},
        {url: "contact/", title: "Contacts"},
        {url: "cv/", title: "CV"},
        {url: "projects/", title: "Projects"},
        {url: "https://github.com/StrangeAndStranger", title: "Github Profile"}
    ];
</script>

<nav>
    <!-- { JSON.stringify($page) } -->
    {#each pages as p }
    <a href={ p.url } class:current={ "." + $page.route.id === p.url } target={ p.url.startsWith("http") ? "_blank" : null }>{ p.title }</a>
	{/each}
</nav>
<slot />