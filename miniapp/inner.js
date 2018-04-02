define([
    'jquery',
    '/bower_components/nthen/index.js',
    '/common/sframe-common.js',
    '/common/sframe-app-framework.js',
    '/common/common-util.js',
    '/common/common-hash.js',
    '/common/modes.js',
    '/customize/messages.js'
], function (
    $,
    nThen,
    SFCommon,
    Framework,
    Util,
    Hash,
    Modes,
    Messages) {


    // Add custom Application code


    // Start of the main loop
    var andThen2 = function (framework) {

        // OnReady Function called after init
        framework.onReady(function () {
            // Add specific application initializations
        });

        framework.onContentUpdate(function (newContent) {
            // Need to update the content
            console.log("Content should be updated to " + newContent);
            $("#cp-app-miniapp-content").val(newContent.content);
        });

        framework.setContentGetter(function () {
            var content = $("#cp-app-miniapp-content").val();
            console.log("Content current value is " + content);
            return {
                content: content
            };
        });

        framework.onEditableChange(function () {
            // framework.isLocked() || framework.isReadOnly()
        });

        framework.setTitleRecommender(function () {
            return "new title";
        });

        framework.onReady(function (newPad) {
            $("#cp-app-miniapp-content").focus();
        });

        framework.onDefaultContentNeeded(function () {});

        framework.setNormalizer(function (c) {
            return {
                content: c.content
            };
        });

        // activate being informed of a change in application
        var oldVal = "";
        $("#cp-app-miniapp-content").on("change keyup paste", function () {
            var currentVal = $(this).val();
            if (currentVal === oldVal) {
                return; //check to prevent multiple simultaneous triggers
            }
            oldVal = currentVal;
            // action to be performed on textarea changed
            console.log("Content changed");
            framework.localChange();
        });

        framework.start();
    };

    var getThumbnailContainer = function () {
        var $preview = $('#cp-app-kanban');
        if ($preview.length && $preview.is(':visible')) {
            return $preview[0];
        }
    };

    var main = function () {
        var framework;

        nThen(function (waitFor) {

            // Framework initialization
            Framework.create({
                toolbarContainer: '#cme_toolbox',
                contentContainer: '#cp-app-miniapp-editor',
                thumbnail: {
                    getContainer: getThumbnailContainer,
                    filter: function (el, before) {
                        if (before) {
                            //$(el).parents().css('overflow', 'visible');
                            $(el).css('max-height', Math.max(600, $(el).width()) + 'px');
                            return;
                        }
                        $(el).parents().css('overflow', '');
                        $(el).css('max-height', '');
                    }
                }
            }, waitFor(function (fw) {
                framework = fw;
                andThen2(framework);
            }));
        });
    };
    main();
});
