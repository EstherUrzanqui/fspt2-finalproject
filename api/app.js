require('dotenv').config()
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
//const fileUpload = require('express-fileupload')

const clientPath = path.join(__dirname, '../', 'client', 'build')

const apiRoutes = require('./routes')

const app = express()
app.use(express.static(clientPath));

app.use(cors())
app.use(bodyParser.json())

console.log('paaath', clientPath)

app.use('/', apiRoutes)


app.get('/', function(req, res) {
  res.sendFile(clientPath);
});



/*app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/'
  })
)*/

app.use(express.static('./client/public/img'))

app.listen(process.env.PORT, () => {
  console.log(`Starting server in PORT ${process.env.PORT}`)
})
