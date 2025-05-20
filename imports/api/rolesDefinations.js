import { Roles } from 'meteor/roles';
import { Meteor } from 'meteor/meteor';

// Define role constants
export const ROLES = {
  ADMIN: 'admin',
  VIEWER: 'viewer',
  GUEST: 'guest'
};

// Helper function to check if user has admin role
export const isAdmin = async (userId) => {
  return await Roles.userIsInRoleAsync(userId, ROLES.ADMIN);
};

// Helper function to check if user has viewer role
export const isViewer = async (userId) => {
  return await Roles.userIsInRoleAsync(userId, ROLES.VIEWER);
};

// Helper function to check if user has guest role
export const isGuest = async (userId) => {
  return await Roles.userIsInRoleAsync(userId, ROLES.GUEST);
};

// Helper function to get all roles for a user
export const getUserRoles = async (userId) => {
  return await Roles.getRolesForUserAsync(userId);
};