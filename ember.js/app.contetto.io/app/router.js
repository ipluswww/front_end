import Ember from 'ember';
import config from './config/environment';
const Router = Ember.Router.extend({
    location: config.locationType
});
Router.map(function() {
    this.route('auth', {path : '/'}, function() {
      this.route('signup', {}, function () {
          this.route('step2');
      });
      this.route('invite-sign', function () {
        this.route('index', {path:':token'});
        this.route('step-2');
      });
      this.route('social');
      this.route('verification');
      this.route('forgot-password');
      this.route('change-password', {path: '/change-password/:token'});
    });
    this.route('welcome', {}, function () {
        this.route('company');
        this.route('brand');
        this.route('targetaudience');
        this.route('schedule');
    });
    this.route('home', {}, function() {
        this.route('unknown', {
          path: '/*path'
        });
        this.route('Index');
        //Routes used for Account Settings (Details / Password and Notification settings)
        this.route('accountsettings',{},function(){
            this.route('details', {path:'/'});
            this.route('details');
            this.route('password');
            this.route('notification');
        });
        //Routes used for inbox
        this.route('inbox');
        //Routes used for feeds
        this.route('feeds',{},function(){
          this.route('list', {path:'/'});
          this.route('list');
          this.route('add');
          this.route('tags');
          this.route('notifications');
          this.route('note',{},function(){
              this.route('create', {path:'/'});
              this.route('create');
          });
          this.route('reply',{},function(){
              // this.route('view', {path:'/'});
              this.route('view');
              this.route('post');
          });
          this.route('task',{},function(){
              this.route('create', {path:'/'});
              this.route('create');
          });
          this.route('reminder',{},function(){
              this.route('create', {path:'/'});
              this.route('create');
          });
        });
        //Routes used for companies
        this.route('companies',{},function(){
            this.route('add',{path:'/'});
            this.route('add');
        });
        this.route('company',{path:'/company/:comp_id'},function(){
            this.route('details',{path:'/'});
            this.route('details');
            this.route('users',{},function(){
                this.route('list', { path: '/' });
                this.route('list');
                this.route('invite');
                this.route('changerole', { path: '/:mem_id/changerole' });
            });
            this.route('roles',{},function(){
                this.route('list', { path: '/' });
                this.route('list');
                this.route('add', { path: '/add' });
                this.route('edit', { path: '/:role_id/edit' });
            });
            this.route('inviteuser');
        });
        this.route('brands', function(){
            this.route('add');
        });
        this.route('brand',{path:'/brand/:brand_id'},function(){
          this.route('details',{path:'/'});
          this.route('details');

          this.route('campaigns',{},function(){
              this.route('list',{path:'/'});
              this.route('list');
              this.route('add');
          });
          this.route('campaign',{path:'/campaign/:camp_id'},function(){
              this.route('details',{path:'/'});
              this.route('details');
              this.route('posts');
          });
          this.route('targetaudience');
          this.route('goals',{},function(){
              this.route('list',{path:'/'});
              this.route('list');
              this.route('add');
          });
          this.route('reviewflow',{},function(){
              this.route('list',{path:'/'});
              this.route('list');
              this.route('settings',{},function(){
                  this.route('review',{path:'/'});
                  this.route('review');
                  this.route('category');
              });
              this.route('departments',{},function(){
                  this.route('list',{path:'/'});
                  this.route('list');
                  this.route('details');
                  this.route('add');
              });
              this.route('channels',{},function(){
                  this.route('list',{path:'/'});
                  this.route('list');
                  this.route('add');
              });
          });
          this.route('team',{},function(){
              this.route('list',{path:'/'});
              this.route('list');
              this.route('invite');
              this.route('edit',{path:'/:member_id/edit'});
              this.route('roles',{},function(){
                  this.route('list', { path: '/' });
                  this.route('list');
                  this.route('add', { path: '/add' });
                  this.route('edit', { path: '/:role_id/edit' });
              });
              this.route('details');
              this.route('departments');
              this.route('activity');
              this.route('chats');
              this.route('tasks');
              this.route('notes');
              this.route('posts');
          });
          this.route('socialaccounts',{},function(){
              this.route('list',{path:'/'});
              this.route('list');
              this.route('schedule');
              this.route('addaccount');
              this.route('addsocial');
              this.route('addemail',{},function(){
                  this.route('list',{path:'/'});
                  this.route('list');
                  this.route('incoming');
                  this.route('outgoing');
              });
              this.route('addwordpress');
              this.route('addreview');
          });
          this.route('post', function() {
            this.route('add');
            this.route('edit');
          });
        });
        /** Task routes under home -
        **/
        this.route('tasks', function() {
            this.route('new');
            this.route('details');
            this.route('advanced-search');
            this.route('dependency');
        });
    });
    this.route('contetto');
});
export default Router;
