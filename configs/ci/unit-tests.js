/* eslint-disable */

'use strict';

const urls = require('../common/urls');

module.exports = {
  'platform': 'firefox',
  'format': 'system',
  'brocfile': 'Brocfile.node.js',
  'baseURL': '/',
  'testsBasePath': './build/',
  'testem_launchers': ['unit-node'],
  'testem_launchers_ci': ['unit-node'],
  'settings': Object.assign({}, urls, {
    'id': 'cliqz@cliqz.com',
    'name': 'Cliqz',
    'channel': '99',
    // TODO: need to find a better way to include this in the config
    // default setting for the module may be okay
    'TEAM_URL': 'https://cliqz.com/team/',
  }),
  'default_prefs' : {
  },
  'bundles': [
  ]
}
