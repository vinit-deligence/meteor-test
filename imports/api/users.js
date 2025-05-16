import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

// Define the Users collection
export const UsersCollection = new Mongo.Collection('users');

// Define the schema for a user
export const UserSchema = {
  email: String,
  createdAt: Date,
  profile: {
    name: String,
    color: String
  }
};

// Helper function to create a new user
export const createUser = async ({ email, name, color }) => {
  const user = {
    email,
    createdAt: new Date(),
    profile: {
      name,
      color
    }
  };
  
  return await UsersCollection.insertAsync(user);
}; 