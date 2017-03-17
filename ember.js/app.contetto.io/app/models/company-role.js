import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  name: attr('string'),
  brandChangeRoles: attr('to-boolean'),
  brandCreate: attr('to-boolean'),
  brandInvite: attr('to-boolean'),
  brandRemove: attr('to-boolean'),
  brandRolesCreate:  attr('to-boolean'),
  brandRolesManage: attr('to-boolean'),
  brandUsersAdd: attr('to-boolean'),
  brandUsersChangeRole:  attr('to-boolean'),
  brandUsersRemove:  attr('to-boolean'),
  companyChangeRoles:  attr('to-boolean'),
  companyInvite:  attr('to-boolean'),
  companyRemove:  attr('to-boolean'),
  rolesCreate:  attr('to-boolean'),
  rolesEditPermissions:  attr('to-boolean'),
  rolesRemove: attr('to-boolean'),
  company: belongsTo('company')
});
