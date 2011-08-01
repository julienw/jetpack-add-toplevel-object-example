/**
* Module for using an external editor.
*
* Example where the user will be prompted for the path
* to their editor of choice. The callback is passed the
* entirety of the changed contents, whenever a change is
* detected.
*
* const extEditor = require("ext-editor");
*
* let editor = new extEditor.Editor();
*
* editor.launch("foo\nbar\nbaz\n", function(changedText) {
* console.log(changedText);
* });
*
* You can get the editor path as a string, after the user has chosen one:
*
* console.log(editor.editorPath);
*
* You can pass the editor path to the Editor constructor, so that
* applications can cache it, and the user is only prompted the
* initial time.
*
* let editor = new extEditor.Editor(stringPathToEditor);
*
*/

const { Ci, Cc, Cu } = require("chrome");

exports.launch = function launch(process) {
    var executable = (Cc["@mozilla.org/file/local;1"]
                      .createInstance(Ci.nsILocalFile));
    executable.followLinks = true;
    executable.initWithPath(process);
    if (executable.exists()) {
        try {
            let process = (Cc["@mozilla.org/process/util;1"]
                           .createInstance(Ci.nsIProcess));
            process.init(executable);
            //let args = [file.path];
            let args = [];
            let ret = process.run(false, args, args.length);
        } catch (e) {
            Cu.reportError(e);
            throw new Error("Error running editor : " + e);
        }
    } else {
        throw new Error(process + " is not an executable");
    }
};


