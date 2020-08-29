<script>
	import DialMIDI from './components/DialMIDI.svelte'
	let controls = []

	function addControl() {
		const hue = Math.random() * 360 + 'deg'
		const sat = Math.random() * 20 + 50 + '%'
		const lit = '65%'

		controls = [...controls, { color: `hsl(${hue}, ${sat}, ${lit})` }]
	}

	function getCtrl(index, fallbackVal) {
		return (controls[index] && controls[index].value !== undefined) ? controls[index].value : fallbackVal
	}
</script>

<main>
	<section class='grid'>
		{#each controls as control, i (control.color+i)}
			<DialMIDI id={ i } color={ control.color } on:input={ ({ detail }) => {
				control.value = detail
				controls = [...controls]	
			}} />
		{/each}
		<button class='add-midi' on:click={ addControl }>+ Add MIDI Input</button>
	</section>
	<section>
		<svg viewBox='0 0 20 10' style='max-width: 720px; border: solid 4px;'>
			<rect x={ getCtrl(0, 5) }  y={ getCtrl(1, 2.5) }  width={ getCtrl(2, 10) } height={ getCtrl(3, 5) }
				  fill={`hsl(${ getCtrl(4, 80) }deg, ${ getCtrl(5, 60) }%, ${ getCtrl(6, 60) }%)`}  />
		</svg>
	</section>
</main>

<style>
	main {
		text-align: center;
		padding: 2vh 1vw;
		margin: 0 auto;
		max-width: 100%;
	}
	
	section.grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-block-end: 1em;
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