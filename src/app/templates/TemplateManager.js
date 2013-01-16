define(['handlebars'], function (Handlebars) {

    var regex = /\.(html)$/i;
    var instance = null;

    var TemplateManager = function () {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()");
        }

        this.initialize();
    };

    TemplateManager.prototype = {

        initialize: function () {
            this.JST = window.JST || {};
        },

        _cacheTemplate: function (path, template) {
            this.JST[path] = template;
        },

        _getTemplateName: function (path) {
            return regex.test(path) ? path : path + '.html';
        },

        hasTemplate: function (path) {
            var templatePath = this._getTemplateName(path);
            return !!this._getTemplate(templatePath);
        },

        _getTemplate: function (path) {
            return this.JST[path];
        },

        getTemplate: function (path) {
            var templateName = this._getTemplateName(path);
            return Handlebars.template(this._getTemplate(templateName))
        },

        compile: function (path, contents) {
            var template = Handlebars.compile(contents);
            var templateName = this._getTemplateName(path);
            this._cacheTemplate(templateName, template);
            return template;
        }
    };

    TemplateManager.getInstance = function () {
        if (instance === null) {
            instance = new TemplateManager();
        }
        return instance;
    };

    return TemplateManager.getInstance();
});