<script>
    import * as d3 from 'd3';

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let arc = arcGenerator({
        startAngle: 0,
        endAngle: 2 * Math.PI
    });

    export let data = [];
    export let selectedIndex = -1;

    let sliceGenerator;
    let arcData;
    let arcs;
    let colors;

    $: {
        sliceGenerator = d3.pie().value(d => d.value);
        arcData = sliceGenerator(data);
        arcs = arcData.map(d => arcGenerator(d));
        colors = d3.scaleOrdinal(d3.schemeTableau10);
    }

    function toggleWedge (index, event) {
        if (!event.key || event.key === "Enter") {
            selectedIndex = selectedIndex === index ? -1 : index;
        }
    }
</script>
<style>
    svg {
        max-width: 20em;
        margin-block: 2em;

        /* Do not clip shapes outside the viewBox */
        overflow: visible;
    }

    svg:has(path:hover, path:focus-visible) {
        path:not(:hover, :focus-visible) {
            opacity: 50%;
        }
    }

    path {
        transition: 300ms;
        cursor: pointer;
        outline: none;

        --angle: calc(var(--end-angle) - var(--start-angle));
        --mid-angle: calc(var(--start-angle) + var(--angle) / 2);

        &.selected {
            transform: rotate(var(--mid-angle))
                    translateY(-6px) scale(1.1)
                    rotate(calc(-1 * var(--mid-angle)));
        }

        transform: rotate(var(--mid-angle))
	           translateY(0)
	           rotate(calc(-1 * var(--mid-angle)));
    }

    ul {
        /* aspect-ratio: 1 / 1; */
        background-color: var(--color);
        border-radius: 50%;
        grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
    }

    li {
        display: flex;
    }

    .swatch {
        align-items: center;
    }

    .selected {
        --color: oklch(60% 45% 0) !important;

        &:is(path) {
            fill: var(--color);
        }
    }
</style>

<div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, i}
            <path 
            d={ arc } 
            style="
            --start-angle: { arcData[i]?.startAngle }rad;
            --end-angle: { arcData[i]?.endAngle }rad;"
            fill={ colors(i) } 
            class:selected={selectedIndex === i} 
            on:click={e => toggleWedge(i, e)}
            on:keyup={e => toggleWedge(i, e)}
            tabindex="0"
            role="button"
            aria-label/>
        {/each}
    </svg>
    <ul class="legend">
        {#each data as d, index}
            <li style="--color: { colors(index) }">
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>