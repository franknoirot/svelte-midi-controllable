let midi = false
let midiCallbacks = []

export default class MIDIAccess {
    constructor(args = {}) {
      this.onDeviceInput = args.onDeviceInput || console.log;
    }
  
    start() {
      return new Promise((resolve, reject) => {
        this._requestAccess().then(access => {
          this.initialize(access);
          resolve();
        }).catch(() => reject('Something went wrong.'));
      });
    }
  
    initialize(access) {
      const devices = access.inputs.values();
      for (let device of devices) this.initializeDevice(device);
    }
  
    initializeDevice(device) {
      device.onmidimessage = this.onMessage.bind(this);
    }
    
    onMessage(message) {
      let [_, input, value] = message.data;
      this.onDeviceInput({ input, value });
    }
  
    _requestAccess() {
      return new Promise((resolve, reject) => {
        if (navigator.requestMIDIAccess)
          navigator.requestMIDIAccess()
            .then(resolve)
            .catch(reject);
        else reject();
      });
    }
}
  
export function listenForMIDIInput(dialContainer, button, setCallback, inputCallback) {
    console.log(dialContainer, button)

    button.classList.remove('set')
    button.classList.add('active')
    
    if (!midi) {
      midi = new MIDIAccess({ onDeviceInput: setMIDIInput })
      
      midi.start().then(() => {
        console.log('MIDI ACCESS STARTED!');
      }).catch(console.error);
    } else {
      midi.onDeviceInput = setMIDIInput
    }
    
    function setMIDIInput({ input }) {
      dialContainer.dataset.midi = input
      dialContainer.style.setProperty('--midi', `'${ input }'`)
      
      setCallback(input)

      midiCallbacks.push({ input, cb: inputCallback })

      button.classList.remove('active')
      button.classList.add('set')
      if (button.nextElementSibling) {
        button.nextElementSibling.innerHTML = 'MIDI ' + input
      }
      
      midi.onDeviceInput = onDeviceInput
    }
    
    function onDeviceInput({ input, value }) {
        const foundCb = midiCallbacks.find(({ input: inputVal }) => inputVal === input)

        if (foundCb) {
          foundCb.cb(input, normRange(value, 0, 127))
        }
        
    }
}

// utility function for converting any range into 0 to 1
function normRange(val,min,max) {
    let range = max-min;
    return (val-min)/range;
  }
