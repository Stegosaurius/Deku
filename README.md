# Deku

Deku is a social network and climate monitoring tool for gardening and greenhouse enthusiasts. Users have customizable profiles where they can post updates and see a news feed of updates of users they are following. Users can make tags for plants they are growing or technologies/methods they are using to do so. The tags can then be used to easily find other users with similar interests. A forum is also available for communal conversations.

The final piece of Deku is climate monitoring. A pathway is provided for users to set up a [Tessel microcontroller](https://tessel.io). When equipped with the proper sensors, the Tessel can stream data on temperature, humidity, and light conditions straight to a user's Deku profile.

See the currently deployed site at [dekugreen.com](http://dekugreen.com).

![Deku profile page](/screenshots/profile.png)

## Team

**Product Owner**: [Barry Blaha](https://github.com/Beasta)  
**Scrum Master**: [Matt Loftus](https://github.com/MattLoftus)  
**Lead Front End Engineer**: [John Anderson](https://github.com/jfanderson)  
**Lead Back End Engineer**: [Edgar Pabon](https://github.com/shadedprofit)  

## Requirements

* Node.js
* NPM
* Bower
* MySQL
* SASS

## Development

To get a local copy of Deku running, run the following commands after cloning the repo down:

```
$ npm install
$ grunt
```

The Bower dependencies will be installed as a post-install for the `npm install` command. The default Grunt command will build out the distribution folder and compile the SCSS file into CSS before running the server.
