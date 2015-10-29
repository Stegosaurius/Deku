// this file will be used to seed our test database with fake data
// run in terminal using npm seed
var faker = require('faker');
var User = require('../models/userModel.js');
var Status = require('../models/statusModel.js');
var Thread = require('../models/threadModel.js');
var Follow = require('../models/followerModel.js');

// these variables will store arrays of all users and tags we add
var allUsers;
var allTags;
var allThreads;

// first start by creating 20 users
// after each function is done, the next one is called in the sequence
generateNewUsers(20, createTags);

function generateNewUsers (n) {
  if (n === 0) {
    return User.getAllUsers(function (err, users) {
      if (err) {
        console.error(err);
      } else {
        console.log("Created users");
        allUsers = users;
        return createTags(50);
      }
    });

  }
  var newUser = {
    username: faker.internet.userName(),
    password: 'helloworld',
    email: faker.internet.email()
  };

  User.addUserByLocal(newUser, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log("Added user:", newUser);
      return generateNewUsers(n-1);
    }
  });
}

function createTags (n) {
  if (n === 0) {
    return User.getAllTags(function (err, tags) {
      if (err) {
        console.error(err);
      } else {
        console.log("Created all tags");
        allTags = tags;
        return updateProfiles(0);
      }
    });

  }
  var tag = faker.lorem.words();
  tag = tag[0];
  User.addTag(tag, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log("Created tag: ", tag);
      createTags(n-1);
    }
  });
}

function updateProfiles (index) {
  if (index === allUsers.length - 1) {
    console.log("Updated user profiles");
    return addAvatars(0);
  }
  var profile = {
    about: faker.lorem.paragraph(),
    email: allUsers[index].email,
    location: faker.address.city() + ', ' + faker.address.state(),
    userID: allUsers[index].id
  };
  User.updateUser(profile, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      updateProfiles(index + 1);
    }
  });
}

function addAvatars (index) {
  if (index === allUsers.length - 1) {
    console.log("Added avatars to users");
    return addPhotos(60);
  }

  User.addProfilePhoto(allUsers[index].id, faker.image.avatar(), function (err, result) {
    if (err) {
      console.error(err);
    } else {
      addAvatars(index + 1);
    }
  });
}

// add greenhouse photos
function addPhotos (n) {
  if (n === 0) {
    console.log("Finished adding greenhouse photos");
    return associateUserTags(60);
  }
  var randomUser = allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
  User.addPhoto(randomUser.id, faker.image.nature(), function (err, result) {
    if (err) {
      console.error(err);
    } else {
      addPhotos(n - 1);
    }
  });
}

function associateUserTags (n) {
  if (n === 0) {
    console.log("Finished making UserTags");
    return makeStatuses(200);
  } 
  var randomUser = allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
  var randomTag = allTags[Math.floor(Math.random() * (allTags.length - 1))];
  var data = {
    userID: randomUser.id,
    tagID: randomTag.id
  }
  User.addUserTag(data, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      associateUserTags(n - 1);
    }
  });
}

function makeStatuses (n) {
  if (n === 0) {
    console.log("Made statuses");
    return addFollowees(50);
  }
  var randomUser = allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
  var newStatus = faker.lorem.sentence();
  var data = {
    userID: randomUser.id,
    status: newStatus
  }
  Status.addStatus(data, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      makeStatuses(n - 1);
    }
  })
}

function addFollowees (n) {
  if (n === 0) {
    console.log("Added followers and followees!!!");
    return addThreads(50);
  } 
  // make sure one user can't follow himself / herself
  do {
    var user1 = allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
    var user2 = allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
  } while (user1.username === user2.username);

  Follow.follow(user1.id, user2.id, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      addFollowees(n - 1);
    }
  });
}

function addThreads (n) {
  if (n === 0) {
    Thread.getAllThreads(function (err, threads) {
      if (err) {
        console.error(err);
      } else {
        console.log("Added threads", threads);
        allThreads = threads;
        return addMessagesToThreads(300); 
      }
    })
  }

  var randomUser = allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
  Thread.createThread(randomUser.id, faker.lorem.sentence(), function (err, result) {
    if (err) {
      console.error(err);
    } else {
      addThreads(n - 1);
    }
  });
}

function addMessagesToThreads (n) {
  if (n === 0) {
    console.log("Added messages to threads!!!");
    console.log("Done!!! Press Ctrl + C to exit");
    return;
  }

  var data = {
    userID: allUsers[Math.floor(Math.random() * (allUsers.length - 1))].id,
    threadID: allThreads[Math.floor(Math.random() * (allThreads.length - 1))].id,
    message: faker.lorem.paragraph()
  };

  Thread.addMessageToThread(data, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      addMessagesToThreads(n - 1);
    }
  })
}









