import { Meteor } from 'meteor/meteor';
import { UsersCollection, createUser } from '/imports/api/users';
import { FilesCollection, seedFiles } from '/imports/api/files';

async function seedUsers() {
  const dummyUsers = [
    { email: 'john@example.com', name: 'John Doe', color: '#FF5733' },
    { email: 'jane@example.com', name: 'Jane Smith', color: '#33FF57' },
    { email: 'bob@example.com', name: 'Bob Johnson', color: '#3357FF' }
  ];

  for (const user of dummyUsers) {
    await createUser(user);
  }
}

Meteor.startup(async () => {
  // Seed users if the collection is empty
  if (await UsersCollection.find().countAsync() === 0) {
    await seedUsers();
  }

  // Seed files if the collection is empty
  if (await FilesCollection.find().countAsync() === 0) {
    await seedFiles();
  }

  // Publish the Users collection to all clients
  Meteor.publish("users", function () {
    return UsersCollection.find();
  });

  // Publish the Files collection to all clients
  Meteor.publish("files", function () {
    return FilesCollection.find();
  });
});
