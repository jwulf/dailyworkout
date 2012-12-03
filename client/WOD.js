
wods = new Meteor.Collection('wods');

Template.wods.wods = function () {
    return wods.find({}, {sort: {stackOrder: -1}});
};

Template.wods.exercise = function () {
    return this.exercises;
};


