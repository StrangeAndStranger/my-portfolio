<svelte:head>
	<title>Contact me</title>
</svelte:head>

    <h1>Contacts Page</h1>

    <form action="mailto:agerald@andrew.cmu.edu" method="POST" enctype="text/plain">
        <label for="email">Email: </label>
        <input type="email" name="email"/>
    
        <label for="subject">Subject: </label>
        <input type="text" name="subject"/>
    
        <label for="body">Body: </label>
        <textarea name="body"></textarea>
    
        <button type="submit">Submit</button>
    </form>

    <!-- <nav>
        <ol>
            <li><a href="../index.html">Main</a></li>
            <li><a href="../projects/index.html">Projects</a></li>
            <li><a href="../contact/index.html">Contact</a></li>
            <li><a href="index.html">CV</a></li>
            <li><a href="https://github.com/StrangeAndStranger" target="_blank">GitHub Profile</a></li>
        </ol>
    </nav> -->
