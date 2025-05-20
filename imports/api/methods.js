import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/roles';
import { ROLES, isAdmin } from './rolesDefinations';

// Server-side methods for role management
Meteor.methods({
  // Assign roles to a user (admin only)
  async 'roles.assign'({ userId, roles }) {
    // Check if the current user is an admin
    if (!isAdmin(this.userId)) {
      throw new Meteor.Error('not-authorized', 'Only admins can assign roles');
    }

    // Validate roles
    const validRoles = Object.values(ROLES);
    const invalidRoles = roles.filter(role => !validRoles.includes(role));
    if (invalidRoles.length > 0) {
      throw new Meteor.Error('invalid-roles', `Invalid roles: ${invalidRoles.join(', ')}`);
    }

    // Assign roles
    return awaitRoles.addUsersToRolesAsync(userId, roles);
  },

  // Remove roles from a user (admin only)
  async 'roles.remove'({ userId, roles }) {
    // Check if the current user is an admin
    if (!isAdmin(this.userId)) {
      throw new Meteor.Error('not-authorized', 'Only admins can remove roles');
    }

    // Validate roles
    const validRoles = Object.values(ROLES);
    const invalidRoles = roles.filter(role => !validRoles.includes(role));
    if (invalidRoles.length > 0) {
      throw new Meteor.Error('invalid-roles', `Invalid roles: ${invalidRoles.join(', ')}`);
    }

    // Remove roles
    return await Roles.removeUsersFromRolesAsync(userId, roles);
  },

  // Get roles for a user
  async 'roles.get'({ userId }) {
    // Users can only get their own roles unless they're admin
    if (this.userId !== userId && !isAdmin(this.userId)) {
      throw new Meteor.Error('not-authorized', 'Not authorized to view roles');
    }

    return await Roles.getRolesForUserAsync(userId);
  }
}); 