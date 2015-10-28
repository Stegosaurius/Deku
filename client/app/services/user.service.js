(function() {
  'use strict';

  angular.module('app')
    .factory('User', User);

  User.$inject = ['$http', '$window', '$state'];

  function User($http, $window, $state) {

    var services = {
      signin: signin,
      signout: signout,
      signup: signup,
      getAvatar: getAvatar,
      getPhotos: getPhotos,
      addPhotoByPath: addPhotoByPath,
      deletePhoto: deletePhoto,
      getFollowers: getFollowers,
      getFollowees: getFollowees,
      follow: follow,
      unfollow: unfollow,
      deleteNotification: deleteNotification,
      getNotifications: getNotifications,
      getProfile: getProfile,
      updateProfile: updateProfile,
      getRecentThreads: getRecentThreads,
      addStatus: addStatus,
      deleteStatus: deleteStatus,
      getStatuses: getStatuses,
      addTag: addTag,
      getTags: getTags,
      removeTag: removeTag
    };

    return services;

    function signin(data) {
      return $http.post('/auth/signin', data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          throw res.status;
        });
    }

    function signout() {
      delete $window.localStorage.token;
      delete $window.localStorage.username;
      $state.transitionTo('signin');
    }

    function signup(data) {
      return $http.post('/auth/signup', data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          throw res.status;
        });
    }

    // retrieve a user's profile photo
    function getAvatar(username) {
      return $http.get('/users/avatarpath/' + username)
        .then(function successCallback(res) {
          return res.data.avatarURL;
        }, function errorCallback(res) {
          console.log('Error retrieving avatar');
        });
    }

    function getPhotos(username) {
      return $http.get('/users/photos/' + username) 
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving user photos');
        })
    }

    function addPhotoByPath(userID, path) {
      return $http.post('/users/photos/path/' + userID, { photo: path }) 
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error posting photo by path');
        });
    }

    function deletePhoto(userID, photoID) {
      return $http.delete('/users/photos/' + userID + '/' + photoID)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error deleting photo');
        })
    }

    // retrieve followers AND following lists 
    function getFollowers (username) {
      return $http.get('/follow/followers/' + username)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving followers');
        });
    }

    function getFollowees (username) {
      return $http.get('/follow/followees/' + username)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log("Error retrieving followees");
        });
    }

    function follow (followerID, followeeName) {
      return $http.post('/follow/' + followerID + '/' + followeeName)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log("Error adding follower");
        });
    }

    function unfollow (followerID, followeeName) {
      return $http.delete('/follow/' + followerID + '/' + followeeName) 
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log("Error deleting follower");
        });
    }

    function deleteNotification(notificationID) {
      return $http.delete('/notifications/' + notificationID)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error deleting notification');
        });
    }

    function getNotifications(userID) {
      return $http.get('/notifications/' + userID)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving notifications');
        });
    }

    // retrieve user profile information
    function getProfile(username) {
      return $http.get('/users/' + username)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving user profile');
        });
    }

    // update an existing user's profile info
    function updateProfile(data, id) {
      var url = '/users/' + id;
      return $http.put(url, data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error updating user profile');
        });
    }

    // retrieve user's most recent forum posts
    function getRecentThreads(username) {
      return $http.get('/threads/recent/' + username)
        .then(function successCallback(res) {
          return res.data.threads;
        }, function errorCallback(res) {
          console.log('Error retrieving recent threads');
        });
    }

    function addStatus(status, id) {
      return $http.post('/status/' + id, { status: status })
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error posting status');
        });
    }

    function deleteStatus(id) {
      return $http.delete('/status/' + id)
        .then(function successCallback(res) {
          return res;
        }, function errorCallback(res) {
          console.log('Error deleting status');
        });
    }

    // retrieve user statuses
    function getStatuses(username) {
      return $http.get('/status/' + username)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving statuses');
        });
    }

    function addTag(tag, id) {
      return $http.post('/users/tags/' + id, {tag: tag}) 
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log("Error posting status");
        });
    }

    // retrieve user's tags
    function getTags(username) {
      return $http.get('/users/tags/' + username)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving tags');
        });
    }

    function removeTag(tag_id, user_id) {
      return $http.delete('/users/tags/' + tag_id + '/' + user_id)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log("Error deleting tag");
        });
    }
  }
})();
