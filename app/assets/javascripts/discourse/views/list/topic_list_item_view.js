/**
  This view handles the rendering of a topic in a list

  @class TopicListItemView
  @extends Discourse.View
  @namespace Discourse
  @module Discourse
**/
Discourse.TopicListItemView = Discourse.View.extend({
  tagName: 'tr',
  templateName: 'list/topic_list_item',
  classNameBindings: ['content.archived', ':topic-list-item', 'content.hasExcerpt:has-excerpt'],
  attributeBindings: ['data-topic-id'],

  'data-topic-id': Em.computed.alias('content.id'),

  init: function() {
    this._super();
    this.set('context', this.get('content'));
  },

  highlight: function() {
    var $topic = this.$();
    var originalCol = $topic.css('backgroundColor');
    $topic.css({
      backgroundColor: "#ffffcc"
    }).animate({
      backgroundColor: originalCol
    }, 2500);
  },

  didInsertElement: function() {
    var session = Discourse.Session.current();

    // // highligth the last topic viewed
    if (session.get('lastTopicIdViewed') === this.get('content.id')) {
      session.set('lastTopicIdViewed', null);
      this.highlight();
    } else if (this.get('content.highlight')) {
      // highlight new topics that have been loaded from the server or the one we just created
      this.set('content.highlight', false);
      this.highlight();
    }
  }

});
