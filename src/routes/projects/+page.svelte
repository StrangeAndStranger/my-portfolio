<script>
    import projects from '$lib/projects.json';
    import Project from '$lib/Project.svelte';
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';

    
    let query = ""
    let filteredProjects;
    $: filteredProjects = projects.filter(project => {
        let values = Object.values(project).join("\n").toLowerCase();
        return values.includes(query.toLowerCase());
    });

    let pieData;
    $: {
        // Initialize to an empty object every time this runs
        pieData = {};

        // Calculate rolledData and pieData based on filteredProjects here
        let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);
            pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
    }

    let selectedYearIndex = -1;

    let selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

    console.log(selectedYearIndex, selectedYear);
    let filteredByYear;
    $: filteredByYear = projects.filter(project => {
        let values = Object.values(project);
        if(selectedYear){
            return values.includes(selectedYear.toString()); 
        }  else {
            return values;
        }
    });

</script>

<svelte:head>
	<title>Prior projects</title>
</svelte:head>

<h1>{ projects.length } Projects</h1>

<Pie data={pieData}  bind:selectedIndex={selectedYearIndex} />

<input type="search" bind:value={query}
       aria-label="Search projects" placeholder="🔍 Search projects…" />
{#each filteredByYear as p}
    <Project data={p} />
{/each}
