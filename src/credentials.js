const Promise = require('bluebird');
const prompt = require('prompt');
Promise.promisifyAll(prompt);

module.exports = function() {
  var properties = [

    {
      name: 'provider',
      hidden: false,
      description: 'provider (google or pokemon-club)',
      required: true,
      pattern: /google|pokemon-club/,
    },
    {
      name: 'username',
      required: true
    },
    {
      name: 'password',
      hidden: true,
      required: true

    }
  ];

  prompt.start();

  return prompt.getAsync(properties);
};
