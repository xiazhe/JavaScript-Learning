/**
 * event handle module
 * IE Event handle: attachEvent, detachEvent 
 */
(function (window) {
    if (!window.eventUtil) {
        window.eventUtil = {};
    };

    function addEventHandler(element, eventType, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventType, handler, false);
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

    function getRelatedTarget(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    };

    function getbutton(event) {
        if (document.implementation.hasFeature('MouseEvents', '2.0')) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:

                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }

        }
    };

    function getWheelDelta(ev) {
        if (event.wheelDelta) {
            //opera
            // return (client.engine.opera && client.engine.opera < 9.5 ?
            //     -event.wheelDelta : event.wheelDelta);
            return -event.wheelDelta;
        } else {
            return -event.wheelDelta * 40;
        }
    };
    
    function getCharCode(ev){
        if(typeof event.charCode == 'number'){
            return ev.charCode;
        } else {
            return ev.keyCode;
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
        getRelatedTarget: getRelatedTarget,
        extend: extend
    });

})(window); 