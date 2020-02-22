
/**
 * @description null
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Response body
 */
async function _command(params, commandText, secrets = {}) {
  
    const secretVal = secrets.privateToken
    const requestEndpoint = `https://gitlab.com/api/v4/commands/api/v4/issues`;
  
  	
  	if(!secretVal) {
    	return {
          response_type: 'ephemeral',
          text:
              'You need `gitlab access token`.'
          };
    }
  
  	const {varArgs, __client} = params;
    try {  
        const axios = require('axios');
        await axios({
            method: 'GET',
            url: requestEndpoint,
            headers: {
              'PRIVATE-TOKEN': `PRIVATE-TOKEN ${secretVal}`
            }
          })
      	  .then( res => {
            	return res
          })
    } catch (error) {
      return {
      		response_type: 'in_channel',
     		text: error.message
    	};
    }
}

/**
 * @typedef {object} SlackBodyType
 * @property {string} text
 * @property {'in_channel'|'ephemeral'} [response_type]
 */

const main = async ({__secrets = {}, commandText, ...params}) => ({
  body: await _command(params, commandText, __secrets)
});

module.exports = main;