const { Keystone } = require('@keystonejs/keystone');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { Text } = require('@keystonejs/fields');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const TodoSchema = require('./lists/Todo.js');
const UserSchema = require('./lists/User.js');
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' }) 

// creating an instance of Keystone with the mongoose adapter to connect project to mongodb
const keystone = new Keystone({
  adapter: new MongooseAdapter({ mongoUri: process.env.MONGO_URI }),
  cookie_secret: process.env.COOKIE_SECRET ||
		[...Array(30)].map(i => ((Math.random() * 36) | 0).toString(36)).join(''),
});

// create a Todo list schema - refer to list
keystone.createList('Todo', TodoSchema);
keystone.createList('User', UserSchema);

// exporting the driver and the GraphQL interface UI app setup on start of project
module.exports = {
  keystone,
  apps: [
	new GraphQLApp(),
	new AdminUIApp({name: 'example-project', enableDefaultRoute: true}),
  ],

};
