import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { UsersCollection, createUser } from '/imports/api/users';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

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
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // Seed users if the collection is empty
  if (await UsersCollection.find().countAsync() === 0) {
    await seedUsers();
  }

  // We publish the entire Links collection to all clients.
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  // Publish the Users collection to all clients
  Meteor.publish("users", function () {
    return UsersCollection.find();
  });
});
