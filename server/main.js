import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/roles";
import { createUser, UsersCollection } from "../imports/api/users";
import { FilesCollection, seedFiles } from "/imports/api/files";
import { ROLES } from "../imports/api/rolesDefinations";

// Import our API files
import "/imports/api/methods";
import "/imports/api/publications";

async function seedUsers() {
  const dummyUsers = [
    {
      email: "john@example.com",
      name: "John Doe",
      color: "#FF5733",
      password: "Deligence@234",
    },
    {
      email: "jane@example.com",
      name: "Jane Smith",
      color: "#33FF57",
      password: "Deligence@234",
    },
    {
      email: "bob@example.com",
      name: "Bob Johnson",
      color: "#3357FF",
      password: "Deligence@234",
    },
  ];

  for (const role of Object.values(ROLES)) {
    await Roles.createRoleAsync(role);
  }

  for (const user of dummyUsers) {
    const userId = await createUser(user);
    // Assign appropriate roles
    if (user.email === "john@example.com") {
      await Roles.addUsersToRolesAsync(userId, [ROLES.ADMIN]);
    } else if (user.email === "jane@example.com") {
      await Roles.addUsersToRolesAsync(userId, [ROLES.VIEWER]);
    } else {
      await Roles.addUsersToRolesAsync(userId, [ROLES.GUEST]);
    }
  }
}

Meteor.startup(async () => {

  // Seed users if no users exist
  if ((await Meteor.users.find().countAsync()) === 0) {
    await seedUsers();
  }

  // Seed files if the collection is empty
  if ((await FilesCollection.find().countAsync()) === 0) {
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
