(function(window) {
    var MyObject = {
        doSomething: function() {
            var event = document.createEvent("Events"); // generic event
            event.initEvent("x-lovely-message", true, true);
            window.dispatchEvent(event);
        }
    };

    window.MyObject = MyObject;
})(this);
