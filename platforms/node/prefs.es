import storage from 'node-persist';
import events from '../core/events';
import config from '../core/config';

const prefs = config.default_prefs || {};
let started = false;

const prefsStorage = storage.create({
  dir: 'tmp/prefs',
});

// load prefs from storage
export function init() {
  if (!started) {
    prefsStorage.initSync();
    prefsStorage.forEach((key, value) => {
      prefs[key] = value;
    });
    started = true;
  }
  return Promise.resolve();
}

export function getPref(prefKey, defaultValue) {
  init();
  if (prefs && prefs[prefKey] !== undefined) {
    return prefs[prefKey];
  }
  return defaultValue;
}

export function setPref(prefKey, value) {
  init();
  const changed = prefs[prefKey] !== value;

  if (changed) {
    prefs[prefKey] = value;
    prefsStorage.setItemSync(prefKey, value);

    // trigger prefchange event
    events.pub('prefchange', prefKey);
  }
}

export function hasPref(prefKey) {
  return prefKey in prefs;
}

export function clearPref(prefKey) {
  delete prefs[prefKey];
  prefsStorage.removeItemSync(prefKey);
}
