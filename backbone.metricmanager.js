;(function (Backbone, _) {
  'use strict';
  if (! Backbone) throw 'Backbone not found';

  var manager = Backbone.MetricManager = {};

  manager.addMetricManager = function (target) {
    if (! target) throw 'Target must be defined';

    // Force the structure of adding the metrics attribute to the target (view)
    if (! target.metrics) throw 'Metrics object not defined';

    // Give the target the ability to fire off analytics events
    target.triggerMetric = _.bind(manager.triggerMetric, target);
  };

  manager.triggerMetric = function (metricName, callback) {
    if (! metricName) return;

    var metric = this.metrics[metricName];

    // Using _action to avoid overriding a custom attribute named 'action'
    metric._action = metricName;

    // Handle a missing callback
    callback = callback || function () {};

    // Default to google analytics
    if (! metric.engine) metric.engine = 'ga';

    // Extend this switch to add new engines
    // Note: intentionally kept in this function's definition
    switch (metric.engine) {

      case 'ga':
        if (! window._gaq) throw 'Google Analytics missing';
        window._gaq.push(['_trackEvent',
                          metric.category || '',
                          metric._action  || '',
                          metric.label    || '',
                          metric.value    || 0]);
        if (callback) window._gaq.push(['_set', 'hitCallback', callback.call(this)]);
        break;

      case 'mixpanel':
        if (! window.mixpanel) throw 'Mixpanel missing';
        // Only send the user-defined metric attributes
        window.mixpanel.track(metric._action, _.omit(metric, ['_action', 'engine']), callback.call(this));
        break;

      default:
        throw 'No supported engine found';
    }
  };

})(window.Backbone, window._);