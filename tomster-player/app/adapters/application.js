import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'tomster-player/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;
  @service socket;

  host = ENV.apiHost;
  namespace = ENV.apiNamespace;

  @computed('session.{isAuthenticated,data.authenticated.access_token}', 'socket.id')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
      headers['X-Socket-Id'] = this.socket.id;
    }

    return headers;
  }
}
