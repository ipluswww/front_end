import DS from "ember-data";
import ContettoValidations from 'contetto-fe/mixins/contetto-validations';

const {
  attr,
  belongsTo,
} = DS;

export default DS.Model.extend(ContettoValidations, {
  company: belongsTo('company'),
  brand: belongsTo('brand'),
  //user: belongsTo('user')
  name: attr('string'),
  type: attr('string'),
  brandsCreate: attr('boolean'),
  brandsRolesCreate: attr('boolean'),
  brandsRolesManage: attr('boolean'),
  brandsUsersAdd: attr('boolean'),
  brandsUsersChangeRole: attr('boolean'),
  brandsUsersRemove: attr('boolean'),
  rolesCreate: attr('boolean'),
  rolesEditPermissions: attr('boolean'),
  rolesRemove: attr('boolean'),
  staffChangeRoles: attr('boolean'),
  staffInvite: attr('boolean'),
  staffRemove: attr('boolean'),
  // only for brand
  createPost: attr('boolean'),
  reviewPost: attr('boolean'),
  viewAnalytics: attr('boolean'),
  manageSocialAccount: attr('boolean'),
  manageReviewStructure: attr('boolean'),
  overrideReviewStructure: attr('boolean'),
  manageTeam: attr('boolean'),

  validations: {
    company: {
      presence: true,
    },
    name: {
      presence: true,
    },
    type: {
      presence: true,
    },
  }
});
