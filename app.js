// const event = require('node:events');
//
// const eventEmitter = new event();
//
// eventEmitter.on('click', () => {
//     console.log('Click click click');
// })
//
// eventEmitter.emit('click')



// const fs = require('fs');
// const path = require('path');
//
// const readStream = fs.createReadStream('text.txt');
//
// readStream.on('data', chunk => {
//     console.log(chunk);
// })



const express = require ('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        name: 'Alex',
        age: 20,
        gender: 'male',
    })

    console.log('Hello')
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

