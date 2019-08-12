/* eslint-disable no-empty */

/**
 * Module Flow Control Unit manages the mainstream flow of the module's logic
 *
 *
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 *
 * (c) C4B Solutions
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(function () {

    var _CORE_OBJECT = {
        __init__: function () {
            // setup event flow
            ebdoAPI.bindListenersWithEvents([_EVENTS_OBJECT.initEvents, _EVENTS_OBJECT.statefulEvents]);
        },

        Variables: {
            resource_path: './../.mcu/.conf/MCU.resources.txt',  // path relative to View/Index.html

            resource_type: 'js',

            resource_separator: ',',

            resource_isJSONFormat: false,

            resource_isHTMLFormat: false,

            resilient_attempt_time_interval: 50
        },

        Functions: {
            run: function () {
                return run_I_1L();



                /**
                 * Local helper functions
                */
                function run_I_1L() {
                    flatFileAPI.Factory.LoadObject.createNew(
                                                                _CORE_OBJECT.Variables.resource_type,
                                                                _CORE_OBJECT.Variables.resource_separator,
                                                                _EVENTS_OBJECT.initEvents.onFlowControlUnitReady.eventName,
                                                                _CORE_OBJECT.Variables.resource_isJSONFormat,
                                                                _CORE_OBJECT.Variables.resource_isHTMLFormat,
                                                                _CORE_OBJECT.Variables.resilient_attempt_time_interval
                                                            )
                                                            .Functions.loadFlatFile(_CORE_OBJECT.Variables.resource_path);
                }
            }
        }
    };

    var _EVENTS_OBJECT = {
        initEvents: {
            onInitFlowControlUnit: {
                eventName: 'InitFlowControlUnit',

                eventListener: function() {
                    return loadYourOwnResources_I_1L();



                    /**
                     * Local helper functions
                    */
                    function loadYourOwnResources_I_1L() {
                        // kick off the load of core resources
                        _CORE_OBJECT.Functions.run();
                    }
                }
            },

            onFlowControlUnitReady: {
                eventName: 'FlowControlUnitReady',

                eventListener: function() {
                    return dispatchLoadOrders_I_1L();



                    /**
                     * Local helper functions
                    */
                    function dispatchLoadOrders_I_1L() {
                        // call on Presenter and Model to load their own resources
                        ebdoAPI.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onLoadYourOwnResources.eventName);
                    }
                }
            }
        },

        statelessEvents: {
            onLoadYourOwnResources: {
                eventName: 'LoadYourOwnResources'
            },

            onGetNextView: {
                eventName: 'GetNextView'
            }
        },

        statefulEvents: {
            onPresenterReady: {
                eventName: 'PresenterReady',

                eventListener: function() {
                    return onPresenterReady_I_1L(_EVENTS_OBJECT.statefulEvents.onPresenterReady);



                    /**
                     * Local helper functions
                    */
                    function onPresenterReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onModelReady.hasCompleted) {
                            // call on PresenterManager to dispatch orders to prepare the next view (separate flow of logic managed by ModelPresenter and ViewPresenter)
                            ebdoAPI.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGetNextView.eventName);
                        }
                    }
                },

                hasCompleted: false
            },

            onModelReady: {
                eventName: 'ModelReady',

                eventListener: function() {
                    return onModelReady_I_1L(_EVENTS_OBJECT.statefulEvents.onModelReady);



                    /**
                     * Local helper functions
                    */
                    function onModelReady_I_1L(self) {
                        // update event completion state
                        self.hasCompleted = true;

                        // check if all stateful events completed successfully by this time
                        if(_EVENTS_OBJECT.statefulEvents.onPresenterReady.hasCompleted) {
                            // call on PresenterManager to dispatch orders to prepare the next view (separate flow of logic managed by ModelPresenter and ViewPresenter)
                            ebdoAPI.dispatchEvent(_EVENTS_OBJECT.statelessEvents.onGetNextView.eventName);
                        }
                    }
                },

                hasCompleted: false
            }
        }
    };


    // kick of self-init
    _CORE_OBJECT.__init__();

})();