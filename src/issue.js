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
                'headers': { "Private-Token": secretVal }
            });
        let output = {};
        if (res.status === 200) {
            output = res.data
                .filter(function (item) {
                    if (item.state === 'opened') return item.id;
                })
                .map(function (item) {
                    return "id: " + item.id + " title: " + item.title + " description: " + item.description + " authorname: " + item.author.username;
                });
        }

        return {
            response_type: 'in_channel', // or `ephemeral` for private response
            text: `${output}`
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