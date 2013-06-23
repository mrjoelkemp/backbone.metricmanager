Backbone.MetricManager
===

Backbone view analytics/metrics organized

### Motivation

Firing 3rd party analytics events within views typically has no organization. You either have a global wrapper for your analytics objects or you embed `_gaq` calls throughout your app.

This plugin attempts to add some organization to firing analytics events for Google Analytics and Mixpanel.

### Usage

	SomeView = Backbone.View.extend({
		// Standard backbone stuff
		events: {
			'click .my-button': 'doSomething'
		},
		
		// Need to define metrics on the view
		metrics: {
			// A trackable action
			twitterShare: {
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
			
		initialize: function () {
			// Register this view with the metric manager
			Backbone.MetricManager.addMetricsManager(this);
		},
		
		// Track the metric
		doSomething: function () {
			this.triggerMetric('twitterShare');
		}
	});

### Getting Started

To get started, your page must contain the tracking codes for Google Analytics or Mixpanel.

#### The `metrics` object

You can then define a `metrics` attribute on a view. This metrics object will contain trackable actions. 

Every action object like `twitterShare` can contain **optional**customizable event information. 

 * For Google Analytics, it's possible to supply `category`, `label`, and `value` attributes. 
 * For Mixpanel, `purchase` will be the event name and any supplied attibutes will be sent along.

*Note:* If you use **both** Google Analytics and Mixpanel in your app, then you can specify (per-action) where the metric should go – either to Google Analytics or Mixpanel. This is done by setting the `engine` attribute (supplying `ga` or `mixpanel`) for the action:

	metrics: {
		twitterShare: {
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
	}

In the example above, the `twitterShare` action will only be sent to Google Analytics.

**By default, without specifying the engine for actions, the engine will be Google Analytics. Mixpanel will be used if google analytics is not found.**

#### Registering the view

Once your `metrics` object is set up, you need to register the view with the metrics manager. This can be done in your `initialize()` method:

	initialize: function () {
		// Register this view with the metric manager
		Backbone.MetricManager.addMetricsManager(this);
	}

#### Triggering a Metric

Triggering a metric is as simple as calling `triggerMetric(metricName)` with the metric's name (like `'twitterShare'`, for example).

	this.triggerMetric('twitterShare');

Note: You can also supply a callback as a second param to `triggerMetric`. This will be supplied to the analytics provider and called on success.
	
	this.triggerMetric('twitterShare', function () {
		console.log("Yeaaaaa");
	});

### License
MIT