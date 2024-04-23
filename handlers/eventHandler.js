const fs = require('fs');
const path = require('path');

module.exports = {
  loadEvents(lucy) {
    const eventsPath = path.join(__dirname, '../events');
    const eventDirs = fs.readdirSync(eventsPath);

    for (const dir of eventDirs) {
      const eventFiles = fs.readdirSync(path.join(eventsPath, dir)).filter(file => file.endsWith('.js'));
      for (const file of eventFiles) {
        const filePath = path.join(eventsPath, dir, file);
        const event = require(filePath);
        lucy.on(event.name, (...args) => event.execute(lucy, ...args));
      }
    }
  },
};