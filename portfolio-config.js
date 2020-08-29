#!/usr/bin/env node
const fs = require('fs')

function getConfig() {
    const now = new Date()
    const month = (now.getMonth()+1).toString().padStart(2,'0')
    const day = now.getDate().toString().padStart(2,'0')

    return {
        "name": "WebMIDI Controller Prototype",
        "lastUpdated": `${now.getFullYear()}-${month}-${day}`,
        "lastUpdatedMMDD": month+"/"+day,
        "isLocal": true,
        "isPublic": true,
        "path": "/midi-controller",
        "themeColor": "hsl(310deg, 60%, 65%)",
        "tools": "Svelte.js, WebMIDI API",
        "image": false
    }
}

fs.writeFile('portfolio-config.json', JSON.stringify(getConfig(),null,2), err => {
    if (err) console.error(err)
    else {
        console.log('Portfolio file written successfully')
    }
})