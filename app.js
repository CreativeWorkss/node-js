const payload = require('./payload')
const express = require('express');
const bodyParser = require('body-parser');
const { value } = require('./output');
const { object } = require('joi');
const app = express();
app.use(bodyParser.json());


app.post('/', function (req, res, next) {
	let transformPayload = transform(req);
	res.send(transformPayload);
})


const transform = (val) => {
	let transformPayload;
	transformPayload = transformation(val.body.payload);
	return transformPayload;
}

const transformation = (val) => {
  let data = val;
	for(const property in data){ 
  if(Array.isArray(data[property]) || typeof data[property] === 'object' ){
    transformation(data[property]);
    }
    else{
      data[property] = data[property].replace("{REF_MSISDN}", "0406679321");
      data[property] = data[property].replace("{REF_IMSI}", "50002312344314");
      data[property] = data[property].replace("{REF_SERVPROFID}", "2");
    }      
  }
	return data;
}


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


module.exports = {
	app:app
}