require('dotenv').config();
const { ExportCustomJobInstance } = require("twilio/lib/rest/bulkexports/v1/export/exportCustomJob");
require('./database');
const app = require('./server');

app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'))
})