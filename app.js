const event = require('node:events');

const eventEmitter = new event();

eventEmitter.on('click', () => {
    console.log('Click click click');
})

eventEmitter.emit('click')