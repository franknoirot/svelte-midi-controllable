<script>
    import MIDIIcon from './MIDIIcon.svelte'
    import { listenForMIDIInput } from '../scripts/midi.js'
    export let id = 0
    export let color = 'hsl(320deg, 60%, 60%)'
    let containerDOM
    let min = -30
    let max = 52
    let output = (max - min) / 2 - min
    $: normalizedOutput = (output - min) / (max - min)

    let midiInput = false

    function setMIDICallback(input) {
        if (!midiInput) {
            midiInput = input
        }
    }

    function inputMIDICallback(input, val) {
        if (input !== midiInput) return
        output = val * (max - min) + min
    }
</script>

<div class="dial-container" bind:this={ containerDOM } style={`--theme: ${ color }`}> 
    <h2 class="output">{ output.toFixed(3) }</h2>
    <div class="dial-row">
        <div class='dial-min-wrap'>
            <div class='dial-min-inner'>
                <input class="dial-min" id={`dial-${ id }-min`} type="number" bind:value={ min } />
                <div class='line'></div>
            </div>
            <label for={`dial-${ id }-min`}>Min</label>
        </div>
        <div class="dial-wrap">
            <label class="dial-bg" for={`dial-${ id }`}>
                <div class="dial-line" style={`transform: var(--init-trans) rotate(${ (normalizedOutput - .5) * 180 }deg`}></div>
            </label>
            <input class="dial" id={`dial-${ id }`} type="range" step="any" min={ min } max={ max } bind:value={ output } />
        </div>
        <div class='dial-max-wrap'>
            <div class='dial-max-inner'>
                <input class="dial-max" id={`dial-${ id }-max`} type="number" bind:value={ max } />
                <div class='line'></div>
            </div>
            <label for={`dial-${ id }-max`}>Max</label>
        </div>
    </div>
    <div class='midi-card-bottom'>
        <button class="dial-midi" on:click={ function(e) {
                midiInput = false
                listenForMIDIInput(containerDOM, this, setMIDICallback, inputMIDICallback)
            } }>
            <MIDIIcon /> 
        </button>
        <p class='midi-status'>Set MIDI Input</p>
    </div>
</div>

<style>
    /* added to global.css due to state-based classes not compiling because they "aren't in use" */
</style>