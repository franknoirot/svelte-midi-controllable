<script>
	import { onMount } from 'svelte'
	import DialMIDI from './components/DialMIDI.svelte'
	let controls = []
	let canvas
	let p


	function addControl() {
		const hue = Math.random() * 360 + 'deg'
		const sat = Math.random() * 20 + 50 + '%'
		const lit = '65%'

		controls = [...controls, { color: `hsl(${hue}, ${sat}, ${lit})` }]
	}

	function getCtrl(ctrl, fallbackVal) {
		return (ctrl && ctrl.value !== undefined) ? ctrl.value : fallbackVal
	}
</script>

<main>
	<section class='grid'>
		{#each controls as control, i (control.color+i)}
			<DialMIDI id={ i } color={ control.color } on:midiinput={ ({ detail }) => {
				control.value = detail
				controls = [...controls]	
			}} />
		{/each}
		<button class='add-midi' on:click={ addControl }>+ Add MIDI Input</button>
	</section>
	<section>
		<svg viewBox='0 0 20 10' style='max-width: 720px; border: solid 4px;'>
			<rect x={ getCtrl(controls[0], 5) }  y={ getCtrl(controls[1], 2.5) }  width={ getCtrl(controls[2], 10) } height={ getCtrl(controls[3], 5) }
				  fill={`hsl(${ getCtrl(controls[4], 80) }deg, ${ getCtrl(controls[5], 60) }%, ${ getCtrl(controls[6], 60) }%)`}  />
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