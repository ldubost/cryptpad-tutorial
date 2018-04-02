// This is the initialization loading the CryptPad libraries
define([
    'jquery',
    '/bower_components/nthen/index.js',
    '/common/sframe-common.js',
    '/common/sframe-app-framework.js',
    '/common/common-util.js',
    '/common/common-hash.js',
    '/common/modes.js',
    '/customize/messages.js'
    /* Here you can add your own javascript or css to load */
], function (
    $,
    nThen,
    SFCommon,
    Framework,
    Util,
    Hash,
    Modes,
    Messages) {


    /* Here you can initialize your own functions and objects */

    // This is the main initialization loop
    var andThen2 = function (framework) {
        // Here you can load the objects or call the functions you have defined

        // This is the function from which you will receive updates from CryptPad
        // In this example we update the textarea with the data received
        framework.onContentUpdate(function (newContent) {
            console.log("Content should be updated to " + newContent);
            $("#cp-app-miniapp-content").val(newContent.content);
        });

        // This is the function called to get the current state of the data in your app
        // Here we read the data from the textarea and put it in a javascript object
        framework.setContentGetter(function () {
            var content = $("#cp-app-miniapp-content").val();
            console.log("Content current value is " + content);
            return {
                content: content
            };
        });

        // This is called when the system is ready to start editing
        // We focus the textarea
        framework.onReady(function (newPad) {
            $("#cp-app-miniapp-content").focus();
        });

        // We add some code to our application to be informed of changes from the textarea
        var oldVal = "";
        $("#cp-app-miniapp-content").on("change keyup paste", function () {
            var currentVal = $(this).val();
            if (currentVal === oldVal) {
                return; //check to prevent multiple simultaneous triggers
            }
            oldVal = currentVal;
            // action to be performed on textarea changed
            console.log("Content changed");
            // we call back the cryptpad framework to inform data has changes
            framework.localChange();
        });

        // starting the CryptPad framework
        framework.start();
    };

    // This is the main starting loop
    var main = function () {
        var framework;

        nThen(function (waitFor) {

            // Framework initialization
            Framework.create({
                toolbarContainer: '#cme_toolbox',
                contentContainer: '#cp-app-miniapp-editor'
                }
            }, waitFor(function (fw) {
                framework = fw;
                andThen2(framework);
            }));
        });
    };
    main();
});
