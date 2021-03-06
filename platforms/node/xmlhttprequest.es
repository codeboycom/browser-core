import fetch, { Headers } from 'node-fetch';
import console from './console';

class XMLHttpRequest {
  constructor() {
    this.opts = {};
  }

  open(method, url) {
    this.opts.method = method;
    this.url = url;
  }

  send(data) {
    if (data) {
      this.opts.body = data;
    }

    this.req = fetch(this.url, this.opts).then((response) => {
      const { ok, status, statusText } = response;
      this.status = status;
      this.statusText = statusText;
      if (ok) {
        return response.text().then((responseText) => {
          this.response = responseText;
          this.responseText = responseText;
          if (this.onload) {
            this.onload();
          }
        });
      }
      if (this.onerror) {
        this.onerror();
      }
      return Promise.resolve(this.statusText);
    }).catch((err) => {
      if (this.onerror) {
        this.onerror();
      }
      console.error('fetch error', this.url, err);
    });
  }

  setRequestHeader(header, value) {
    if (!this.opts.headers) {
      this.opts.headers = new Headers();
    }
    this.opts.headers.append(header, value);
  }
}

function setPrivateFlags() {}
function setBackgroundRequest() {}
function XMLHttpRequestFactory() {
  return XMLHttpRequest;
}

export {
  XMLHttpRequestFactory,
  setPrivateFlags,
  setBackgroundRequest
};
