import { Meteor } from 'meteor/meteor';
import { UsersCollection, createUser } from '/imports/api/users';

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

  // Publish the Users collection to all clients
  Meteor.publish("users", function () {
    return UsersCollection.find();
  });
});
