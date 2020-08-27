<script>
	import DialMIDI from './components/DialMIDI.svelte'
	let controls = []

	function addControl() {
		const hue = Math.random() * 360 + 'deg'
		const sat = Math.random() * 20 + 50 + '%'
		const lit = '65%'

		controls = [...controls, { color: `hsl(${hue}, ${sat}, ${lit})` }]
	}
</script>

<main>
	{#each controls as control, i (control.color+i)}
		<DialMIDI id={ i } color={ control.color } />
	{/each}
	<button class='add-midi' on:click={ addControl }>+ Add MIDI Input</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		display: grid;
		max-width: 100%;
		grid-template-columns: repeat(5,minmax(250px, 1fr));
		gap: 1em;
	}

	button.add-midi {
    font-size: 1.8rem;
    align-self: center;
    width: fit-content;
    justify-self: center;
    border: none;
    background: #343434;
    color: white;
    padding: .25em 1em;
    border-radius: .15em;
}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>