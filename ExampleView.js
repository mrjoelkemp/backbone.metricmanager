(function (Backbone, $) {
  'use strict';

  window.ExampleView = Backbone.View.extend({
    el: '.example',

    metrics: {
      shareTwitter: {
        // Optional event information
        category: 'Homepage',
        label: 'Logged-in user',
        value: 0,
        engine: 'ga'
      },
      purchase: {
        itemType: 'hamburger',
        price: 1.50,
        engine: 'mixpanel'
      }
    },

    events: {
      'click .shareTwitter': 'toTwitter',
      'click .purchase': 'purchaseItem'
    },

    initialize: function () {
      Backbone.MetricManager.addMetricManager(this);
    },

    toTwitter: function () {
      this.triggerMetric('shareTwitter', function () {
        $('.result').text("Google Analytics recorded the shareTwitter event");
      });
    },

    purchaseItem: function () {
      this.triggerMetric('purchase', function () {
        $('.result').text("Mixpanel recorded purchase event");
      });
    }

  });

})(window.Backbone, window.$);