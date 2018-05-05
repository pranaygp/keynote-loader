const fs = require('fs');
const path = require('path')
const through2 = require('through2');
const keynote = require('keynote');

const { getOptions, interpolateName } = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = {
  type: "object",
  properties: {
    password: {
      type: "string" // TODO: pass this to `keynote` for encrypted .key files
    },
    name: {},
    regExp: {},
    context: {
      "type": "string"
    }
  },
  "additionalProperties": false
}

module.exports = async function(content) {
  const options = getOptions(this) || {};
  
  validateOptions(schema, options, 'keynote-loader');
  const callback = this.async();
  
  const context = options.context || this.rootContext || (this.options && this.options.context);

  // Get keynote data in a stream
  const keynoteFileStream = through2();
  keynoteFileStream.write(content)
  keynoteFileStream.end();

  const data = await keynote(keynoteFileStream);

  callback(null, `module.exports = ${JSON.stringify(data)}`)
}

module.exports.raw = true;