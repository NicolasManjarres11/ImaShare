const moment = require('moment')

const helpers = {}

helpers.timeago = timestamp => {
    return moment(timestamp).startOf('minute').fromNow(); // A partir del tiempo recibido, quiero que publique cuánto tiempo ha pasado en minutos
}

module.exports = helpers