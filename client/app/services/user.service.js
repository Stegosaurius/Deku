(function() {
  'use strict';

  angular.module('app')
    .factory('User', User);

  User.$inject = ['$http', '$window', '$state'];

  function User($http, $window, $state) {

    var services = {
      addStatus: addStatus,
      deleteStatus: deleteStatus,
      getStatuses: getStatuses,
      signin: signin,
      signout: signout,
      signup: signup,
      getFollowers: getFollowers,
      getFollowees: getFollowees,
      follow: follow,
      unfollow: unfollow,
      getAvatar: getAvatar,
      getProfile: getProfile,
      updateProfile: updateProfile,
      getRecentThreads: getRecentThreads,
      getTags: getTags,
      addTag: addTag,
      removeTag: removeTag
    };

    return services;

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
      return $http.get('/follow/followees' + username)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log("Error retrieving followees");
        })
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
        })
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

    // retrieve user profile information
    function getProfile(username) {
      return $http.get('/users/' + username)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving user profile');
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

    // retrieve user statuses
    function getStatuses(username) {
      return $http.get('/status/' + username)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving statuses');
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

    function addTag(tag, id) {
      return $http.post('/users/tags/' + id, {tag: tag}) 
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log("Error posting status");
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
  }
})();
