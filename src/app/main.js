require([
    "$",
    "App",
    'backbone',
    'routers/MainRouter',
    "init"
], function ($, App, Backbone, Router) {

    console.log('Initialize:main');

    // Treat the jQuery ready function as the entry point to the application.
    // Inside this function, kick-off all initialization, everything up to this
    // point should be definitions.
    $(function() {

        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        App.router = new Router();
        // Trigger the initial route and enable HTML5 History API support
        Backbone.history.start();
    });


    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router.  If the link has a data-bypass
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function(evt) {
        // Get the anchor href and protcol
        var href = $(this).attr("href");
        var protocol = this.protocol + "//";

        evt.preventDefault();

//        // Ensure the protocol is not part of URL, meaning its relative.
//        if (href && href.slice(0, protocol.length) !== protocol &&
//            href.indexOf("javascript:") !== 0) {
//            // Stop the default event to ensure the link will not cause a page
//            // refresh.
//            evt.preventDefault();
//
//            // This uses the default router defined above, and not any routers
//            // that may be placed in modules.  To have this work globally (at the
//            // cost of losing all route events) you can change the following line
//            // to: Backbone.history.navigate(href, true);
//            Insights.router.navigate(href, true);
//        }
    });
});

