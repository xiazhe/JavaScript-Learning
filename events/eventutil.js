/**
         * event handle module
         * IE Event handle: attachEvent, detachEvent 
         */
(function (window) {
    if (!window.eventUtil) {
        window.eventUtil = {};
    }

    function addEventHandler(element, eventType, handler) {
        if (element.addEventListener) {
            element.addEventListenser(eventType, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventType, handler);
        } else {
            element['on' + eventType] = handler;
        }
    };

    function removeEventHandler(element, eventType, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(eventType, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + eventType, handler);
        } else {
            element['on' + eventType] = null;
        }
    };

    function formatEvent(oEvent) {
        if (typeof oEvent.charCode == "undefined") {
            oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
            oEvent.isChar = (oEvent.charCode > 0);
        }

        if (oEvent.srcElement && !oEvent.target) {
            oEvent.eventPhase = 2;
            oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
            oEvent.pageY = oEvent.clientY + document.body.scrollTop;

            if (!oEvent.preventDefault) {
                oEvent.preventDefault = function () {
                    this.returnValue = false;
                };
            }

            if (oEvent.type == "mouseout") {
                oEvent.relatedTarget = oEvent.toElement;
            } else if (oEvent.type == "mouseover") {
                oEvent.relatedTarget = oEvent.fromElement;
            }

            if (!oEvent.stopPropagation) {
                oEvent.stopPropagation = function () {
                    this.cancelBubble = true;
                };
            }

            oEvent.target = oEvent.srcElement;
            oEvent.time = (new Date).getTime();

        }

        return oEvent;
    };

    function getEvent() {
        if (window.event) {
            return this.formatEvent(window.event);
        } else {
            return getEvent.caller.arguments[0];
        }
    };

    function extend(dest, src, merge) {
        for (var key in src) {
            if (dest[key] !== undefined && merge) {
                continue;
            }
            dest[key] = src[key];
        }
        return dest;
    };

    extend(window.eventUtil, {
        addEventHandler: addEventHandler,
        removeEventHandler: removeEventHandler,
        formatEvent: formatEvent,
        getEvent: getEvent,
        extend: extend
    });

})(window); 