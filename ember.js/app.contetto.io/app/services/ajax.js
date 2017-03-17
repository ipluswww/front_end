import AjaxService from 'ember-ajax/services/ajax';
import config from 'contetto-fe/config/environment';

export default AjaxService.extend({
  host: config.REST.host,

  namespace: '',
});
