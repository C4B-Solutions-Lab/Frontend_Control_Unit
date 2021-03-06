/* eslint-disable no-undef */

/**
 * Model-to-View Binder Factory
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

    /**
     * This is a public object that is requested by the ModelPresenter.
     *
     * It has to have these three "hard-coded" properites called [Data], [DataToViewBinder] and [ListenerToEventBinder].
     *
     * Implementation of the aforementioned props is open to you, i.e. you have to provide valid stuff for these three properties !
     *
     * - [Data] is a property that delivers final view data
     * - [DataToViewBinder.get()] is function that knows the logic of how to "tie" data to HTML template
     * - [ListenerToEventBinder.get()] is function that knows the logic of how to "tie" listeners to events
     *
    */
    var _VIEW_MODEL_EXPOSER = {
        __init__: function(userViewModel_GetData, userViewModel_GetBinder, userViewModel_GetListenerEventBinder) {
            // apply listeners to events
            ebdoAPI.bindListenersWithEvents([_EVENTS_OBJECT.initEvents]);

            // initialize model data getter
            this.Data.__init__(userViewModel_GetData);

            // initialize model data binder getter
            this.DataToViewBinder.__init__(userViewModel_GetBinder);

            // initialize listener event binder getter
            this.ListenerToEventBinder.__init__(userViewModel_GetListenerEventBinder);
        },

        Data: {
            __init__: function(userViewModel_GetData) {
                this._internals_._getGata = userViewModel_GetData;
            },

            get: function() {
                return this._internals_._getGata;
            },

            _internals_: {
                _getGata: null
            }
        },

        DataToViewBinder: {
            __init__: function(userViewModel_GetBinder) {
                this._internals_._getBinder = userViewModel_GetBinder;
            },

            get: function() {
                return this._internals_._getBinder;
            },

            _internals_: {
                _getBinder: null
            }
        },

        ListenerToEventBinder: {
            __init__: function(userViewModel_GetListenerEventBinder) {
                this._internals_._getListenerToEventBinder = userViewModel_GetListenerEventBinder;
            },

            get: function() {
                return this._internals_._getListenerToEventBinder;
            },

            _internals_: {
                _getListenerToEventBinder: null
            }
        }
    };

    /**
     * This is an entry point to this model.
     *
     * It has to have this "hard-coded" event called [OnViewModelExposeYourData].
     *
     * Implementation of this event handler should not be changed !
     *
    */
    var _EVENTS_OBJECT = {
        initEvents: {
            onViewModelExposeYourData: {
                eventName: 'ViewModelExposeYourData',

                eventListener: function(event) {
                    return onViewModelExposeYourData_I_1L(event);



                    /**
                     * Local helper functions
                    */
                    function onViewModelExposeYourData_I_1L(event) {
                        // cache event details
                        var details = event.detail;

                        // access model data callback
                        var handleNextViewModelCallback = details[2];

                        // create kind of "singleton", i.e. you can only capture this event once !
                        unbindExposingModel_I_2L();

                        // return the model data
                        handleNextViewModelCallback(_VIEW_MODEL_EXPOSER, details);



                        /**
                         * Local helper functions
                        */
                        function unbindExposingModel_I_2L() {
                            ebdoAPI.bindListenersWithEvents([_EVENTS_OBJECT.initEvents], true);
                        }
                    }
                }
            }
        },

        bindListenersWithEvents: function(arrayOfEventObjectCollection, unbind) {
            return bindListenersToEvents_I_1L(arrayOfEventObjectCollection, unbind);



            /**
             * Local helper functions
            */
            function bindListenersToEvents_I_1L(arrayOfEventObjectCollection, unbind) {
                // iterate over array of event object collections
                for(var i = 0, length = arrayOfEventObjectCollection.length; i < length; i++) {
                    // access current event object collection
                    var eventObjectCollection = arrayOfEventObjectCollection[i];

                    // iterate over event objects
                    for(var eventObject in eventObjectCollection) {
                        // access current event object
                        var customEventObject = eventObjectCollection[eventObject];

                        // if current event object has appropriate structure, bind its listener to its event
                        if(customEventObject.eventListener)
                            unbind ? removeEventListener_I_2L(customEventObject.eventName, customEventObject.eventListener) : addEventListener_I_2L(customEventObject.eventName, customEventObject.eventListener);
                    }
                }



                /**
                 * Local helper functions
                */
                function addEventListener_I_2L(eventName, eventListener) {
                    document.addEventListener(eventName, eventListener);
                }

                function removeEventListener_I_2L(eventName, eventListener) {
                    document.removeEventListener(eventName, eventListener);
                }
            }
        }
    };

    var _MODEL_TO_VIEW_BINDER_OBJECT_FACTORY = {
        Factory: {
            createNew: function (userViewModel_GetData, userViewModel_GetBinder, userViewModel_GetListenerEventBinder) {
                return createNew_I_1L(userViewModel_GetData, userViewModel_GetBinder, userViewModel_GetListenerEventBinder);



                /**
                 * Local helper functions
                */
                function createNew_I_1L(userViewModel_GetData, userViewModel_GetBinder, userViewModel_GetListenerEventBinder) {
                    // initialize model exposer
                    _VIEW_MODEL_EXPOSER.__init__(userViewModel_GetData, userViewModel_GetBinder, userViewModel_GetListenerEventBinder);

                    // return model exposer
                    return _VIEW_MODEL_EXPOSER;
                }
            }
        }
    };


    // Expose module API to the outside world
    window.baseModelObject = window.baseModelObject || _MODEL_TO_VIEW_BINDER_OBJECT_FACTORY;

})();