<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

    let data = [];
    let commits = [];

    onMount(async () => {
        data = await d3.csv("loc.csv", row => ({
            ...row,
            line: Number(row.line), // or just +row.line
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + "T00:00" + row.timezone),
            datetime: new Date(row.datetime)
        }));

        console.log("Data: ", data);

        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
        let first = lines[0];
        let {author, date, time, timezone, datetime} = first;
        let ret = {
            id: commit,
            url: "https://github.com/vis-society/lab-7/commit/" + commit,
            author, date, time, timezone, datetime,
            hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
            totalLines: lines.length
        };

        // Like ret.lines = lines
        // but non-enumerable so it doesn’t show up in JSON.stringify
        Object.defineProperty(ret, "lines", {
            value: lines,
            configurable: true,
            writable: true,
            enumerable: false,
        });

        

        return ret;
    });
    console.log("Commits: ", commits);

    });

    let files;
    $: files = d3.groups(data, d => d.file).length;

    // let fileLengths;
    // $: fileLengths = d3.rollups(data, v => d3.max(v, v => v.line), d => d.file);

    // let averageFileLength;
    // $: averageFileLength = d3.mean(fileLengths, d => d[1]);

    // let workByPeriod;
    // $: workByPeriod = d3.rollups(data, v => v.length, d => d.datetime.toLocaleString("en", {dayPeriod: "short"}))

    // let maxPeriod;
    // $: maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];

    
    let width = 1000, height = 600;
    $: xScale = d3.scaleTime()
            .domain(d3.extent(data, d=> d.dateTime))
            .range([0, width]);
	
	$: yScale = d3.scaleLinear()
			.domain([0, 24])
			.range([0, height])


</script>

<h1>Meta</h1>

<p>This page includes stats about the code of this website.</p>

<dl class="stats">
	<dt>Total <abbr title="Lines of code">LOC</abbr></dt>
	<dd>{data.length}</dd>

    <dt>Number of Files</dt>
	<dd>{files}</dd>

    <dt>Number of Commits</dt>
	<dd>{commits.length}</dd>
</dl>


<svg viewBox="0 0 {width} {height}">
	<g class="dots">
    {#each commits as commit, index }
        <circle
            cx={ xScale(commit.datetime) }
            cy={ yScale(commit.hourFrac) }
            r="5"
            fill="steelblue"
        />
    {/each}
    </g>        
</svg>

<style>
	svg {
		overflow: visible;
	}
</style>