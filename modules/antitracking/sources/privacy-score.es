/* eslint import/prefer-default-export: 'off' */
/* eslint func-names: 'off' */
/* eslint prefer-arrow-callback: 'off' */

import utils from '../core/utils';
import MapCache from '../core/helpers/fixed-size-cache';
import * as datetime from './time';
import config from '../core/config';

const privacyScoreURL = config.settings.PRIVACY_SCORE_URL;

const PrivacyScore = function (tldHashRole) {
  this.tldHash = tldHashRole.substring(0, 16);
  this.role = tldHashRole.substring(16, tldHashRole.length);
  this.score = null;
  this.datetime = null;
  return this;
};

PrivacyScore._cache = new MapCache(tldHashRole => new PrivacyScore(tldHashRole), 1000);

PrivacyScore.get = tldHashRole => PrivacyScore._cache.get(tldHashRole);

PrivacyScore.prototype.getPrivacyScore = function () {
  if (this.score !== null && this.datetime === datetime.getTime()) {
    return;
  }
  const prefix = this.tldHash.substring(0, 8);
  const suffix = this.tldHash.substring(8, 16);
  const reqURL = `${privacyScoreURL}prefix=${prefix}&role=${this.role}`;
  this.score = -1;
  this.datetime = datetime.getTime();
  utils.httpGet(reqURL, function (req) {
    const res = JSON.parse(req.response);
    if (suffix in res) {
      this.score = res[suffix];
    }
  }.bind(this), utils.log, 10000);
};

export {
  PrivacyScore
};
