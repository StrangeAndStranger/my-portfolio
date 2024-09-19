<script>
    import projects from '$lib/projects.json';
</script>
<svelte:head>
	<title>Prior projects</title>
</svelte:head>
<body>
    <h1>{ projects.length } Projects</h1>

    <!-- <nav>
        <ol>
            <li><a href="../index.html">Main</a></li>
            <li><a href="../projects/index.html">Projects</a></li>
            <li><a href="../contact/index.html">Contact</a></li>
            <li><a href="index.html">CV</a></li>
            <li><a href="https://github.com/StrangeAndStranger" target="_blank">GitHub Profile</a></li>
        </ol>
    </nav> -->

    {#each projects as p}
        <article>
            <h2>Project title</h2>
            <img src="static\images\Cat03.jpg" alt="" style="height: 10%; width: 10%;">
            <p>Project description</p>
        </article>
    {/each}
    
</body>