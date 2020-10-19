const { Text, CalendarDay, Relationship, Checkbox } = require('@keystonejs/fields');

// creating the list model
module.exports = {
  fields: {
    description: {
      	type: Text,
      	isRequired: true,
    },
    isComplete: {
      	type: Checkbox,
      	defaultValue: false,
    },
    // adding the extra attributes, deadline and assignee
    deadline: {
	type: CalendarDay,
	dateFrom: '2020-01-01',
	dateTo: '2027-01-01',
	isRequired: false,
	defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10), // Today's date
    },
    assignee: {
	type: Relationship,
	ref: 'User.tasks',
	isRequired: true,
    },
  },
};
