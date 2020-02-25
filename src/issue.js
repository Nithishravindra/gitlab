// jshint esversion: 9

/**
 * @description null
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Response body
 */


const requestEndpoint = `https://gitlab.com/api/v4/issues`;
async function _command(params, commandText, secrets = {}) {
    const secretVal = secrets.privateToken;
    if (!secretVal) {
        return {
            response_type: 'ephemeral',
            text: 'You need `gitlab access token`.'
        };
    }

    try {
        const axios = require('axios');
        const res = await axios.get(requestEndpoint,
            {
                'headers': { "Private-Token": "hg54f57uf-Y_EWcG23Y-" }
            });

        const x = res.data[0].project_id;
        const y = res.data[0].title;
        const z = res.data[0].state;

        return {
            response_type: 'in_channel', // or `ephemeral` for private response
            text: `${"project_id => " + x + " title => " + y + " state => " + z}`
        };
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

const main = async ({ __secrets = {}, commandText, ...params }) => ({
    body: await _command(params, commandText, __secrets)
});

module.exports = main;