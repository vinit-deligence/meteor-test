import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

// Use Meteor's built-in users collection
export const UsersCollection = Meteor.users;

// Define the schema for a user profile
// Note: The schema is enforced by the roles package and the accounts-password package.
export const UserSchema = {
  emails: [
    {
      address: String,
      verified: Boolean,
    },
  ],
  createdAt: Date,
  services: {
    password: {
      bcrypt: String,
    },
  },
  // Custom profile fields
  profile: {
    name: String,
    color: String,
  },
  // Roles field (managed by roles package)
  roles: [String],
};

// Helper function to create a new user
export const createUser = async ({ email, password, name, color }) => {
  const userId = await Accounts.createUserAsync({
    email,
    password,
    profile: {
      name,
      color,
    },
    roles: [],
  });

  return userId;
};

// Helper function to get user profile
export const getUserProfile = (userId) => {
  const user = UsersCollection.findOne(userId);
  return user?.profile;
};

// Helper function to update user profile
export const updateUserProfile = async (userId, profile) => {
  return await UsersCollection.updateAsync(userId, {
    $set: { profile },
  });
};

// Helper function to get all users (admin only)
export const getAllUsers = () => {
  if (!Meteor.isServer) {
    throw new Meteor.Error(
      "not-authorized",
      "This function can only be called from the server"
    );
  }
  return UsersCollection.find(
    {},
    {
      fields: {
        emails: 1,
        profile: 1,
        createdAt: 1,
        roles: 1,
      },
    }
  ).fetch();
};
