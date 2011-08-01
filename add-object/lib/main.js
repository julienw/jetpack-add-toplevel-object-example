// Import the APIs we need.
const data = require("self").data,
      pageMod = require("page-mod");
 
exports.main = function(options, callbacks) {
    console.log(options.loadReason);

    function gotLovelyMessage() {
        console.log("I got a lovely message from unprivileged script, but I am in a privileged script !");
    }

    pageMod.PageMod({
        include: "*", /* something meaningful here */
        contentScriptFile: data.url('ObjectProxy.js'),
        contentScriptWhen: "ready",
        onAttach: function(worker) {
            console.log("Attaching content scripts");
            worker.port.on("lovely-message", gotLovelyMessage);
            worker.port.emit("attach", data.url('addToPage.js'));
        }
    });
};
 
exports.onUnload = function (reason) {
  console.log(reason);
};

