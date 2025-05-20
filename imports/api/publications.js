import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/roles';
import { UsersCollection } from './users';
import { ROLES } from './rolesDefinations';

// Publish user's own roles
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// Publish all users (admin only)
Meteor.publish('users.all', async function () {
  if (!this.userId) {
    return this.ready();
  }

  try {
    const isUserAdmin = await Roles.userIsInRoleAsync(this.userId, ROLES.ADMIN);
    if (!isUserAdmin) {
      return this.ready();
    }

    return UsersCollection.find({}, {
      fields: {
        emails: 1,
        profile: 1,
        createdAt: 1,
        roles: 1
      }
    });
  } catch (error) {
    console.error('Error in users.all publication:', error);
    return this.ready();
  }
});

// Publish user profiles (viewer and admin)
Meteor.publish('users.profiles', async function () {
  if (!this.userId) {
    return this.ready();
  }

  try {
    const isUserAdmin = await Roles.userIsInRoleAsync(this.userId, ROLES.ADMIN);
    const isUserViewer = await Roles.userIsInRoleAsync(this.userId, ROLES.VIEWER);

    if (!isUserAdmin && !isUserViewer) {
      return this.ready();
    }

    return UsersCollection.find({}, {
      fields: {
        'profile.name': 1,
        'profile.color': 1
      }
    });
  } catch (error) {
    console.error('Error in users.profiles publication:', error);
    return this.ready();
  }
}); 