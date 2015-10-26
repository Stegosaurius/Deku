(function() {
  'use strict';

  angular.module('app')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$window', '$state', 'jwtHelper', 'User'];

  function EditProfileController($window, $state, jwtHelper, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = '';
    vm.avatar = '';
    // vm.followers = '';
    // vm.following = '';
    vm.followers =['john', 'edgar', 'beasta', 'sam', 'watson', 'fred', 'smithy', 'johnson', 'patty', 'ron artest', 'junior'];
    vm.following =['john', 'edgar', 'beasta', 'elon musk', 'bubba', 'gump', 'shrimp', 'fred', 'smithy', 'johnson', 'patty', 'ron artest', 'junior'];
    vm.location = '';
    vm.tags = [];
    // vm.tags = ['tomatos', 'aquaponics', 'kale', 'spruce', 'beans']
    vm.username = $window.localStorage.username;
    // vm.photos = [];

    vm.photos = ['http://www.mnlga.org/slider/rw4Yqd0POkqMUqg.jpg',
                 'http://www.mafc.com/blog/wp-content/uploads/2014/07/Garden-Greenhouse-108.jpg',
                 'http://www.sustainablenantucket.org/wp-content/uploads/2014/03/green_house_77.jpg'];



    //editProfile user actions
    vm.updateProfile = updateProfile;
    vm.addTag = addTag;
    vm.removeTag = removeTag;
    // vm.removeFollower = removeFollower;
    vm.removeFollowing = removeFollowing;
    vm.updateAvatar = updateAvatar;

    //Invoke get profile to prepopulate our view model with 
    //existing data for a user. This way the data object will
    //be complete when we send it to the database.
    getProfile();
    getTags();
    //getFollowers();
    //getAvatar();

    // return active user's ID
    function getID() {
      return jwtHelper.decodeToken($window.localStorage.token).id;
    }

    function getProfile () {
      User.getProfile(vm.username)
        .then(function(data) {
          vm.about = data.about;
          vm.location = data.location;
          // vm.tags = data.plants || ['kale', 'spinach', 'chia'];
          // getPhoto();
        });
    }

    //Update location and about sections of profile
    function updateProfile () {
      User.updateProfile(vm)
        .then(function(data) {
          $state.transitionTo('profile');
        })
        .catch(function(status) {
          vm.message = 'Bad things';
        });
    }

    //Get all of the current user's followers
    function getFollowers () {
      User.getFollowers(vm.username)
        .then(function (data) {
          // vm.followers = data.followers || ['john', 'edgar', 'beasta', 'john', 'edgar', 'beasta','john', 'edgar', 'beasta'];
          // vm.following = data.following || ['john', 'edgar', 'beasta', 'elon musk', 'john', 'edgar', 'beasta', 'john', 'edgar', 'beasta'];
        });
    }

    //Remove a follower when a user clicks the remove
    //button on a specific followers list item
    // function removeFollower (follower) {
    //   //Remove specified follower from the vm.followers
    //   //list and send to the database to update
    //   vm.followers.splice(vm.followers.indexOf(follower), 1);
    // }

    //Remove someone the user is following.
    function removeFollowing (following) {
      vm.following.splice(vm.following.indexOf(following), 1);
    }

    //Get current profile picture(avatar)
    function getAvatar () {
      User.getAvatar(vm.username)
        .then(function (avatar) {
          vm.avatar = avatar;
        });
        //After we get the avatar, we then need to use
        //the url as the src attribute in the image
    }

    //Uploading a new profile picture
    function updateAvatar () {

    }

    //Get all tags for the user and add them to the vm
    function getTags () {
      User.getTags(vm.username)
        .then(function (data) {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            vm.tags.push(data[i].tag);
          }
        });
    }

    //Add tag to the vm tags list and send the new tag to the 
    //server to store the new tag in the database
    function addTag () {
      var id = getID();
      console.log(id);
      vm.tags.push(vm.newTag);
      User.addTag(vm.newTag, id);
      vm.newTag='';
      //Invoke updateTags function
    }

    //Remove a tag when user clicks x on a particular tag item
    function removeTag () {
      //remove a tag from the vm.tags array and send either specified
      //tag or the new tags array to the server to update
    }

    //Get users greenhouse photos from the server
    function getUserPhotos () {
      //get user photos urls from the server
      //load different urls into src attributes
      //for user images.
    }

    function removeUserPhoto () {
      //Delete user photo from the vm photos url list.
      //Send request to server to delete the specified
      //photo url from the database
    }

    function addUserPhoto () {
      //2 options
      //Add a url to a photo which will get added to the
      //src of an img tag and sent to the db for storage.

      //or upload a photo, store the url in the database, 
      //then fetch that url and ad it to the vm.photos array.
    }


    
  }
})();