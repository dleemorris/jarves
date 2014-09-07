jarves.Directives.Icon = new Class({
    JarvesDirective: {
        name: 'icon',
        options: {
            restrict: 'A',
            controller: true
        }
    },

    link: function(scope, element, attributes) {
        attributes.$observe('icon', function(value) {
            if (this.oldClass) {
                element.removeClass(this.oldClass);
            }
            if (this.oldImg) {
                this.oldImg.destroy();
            }

            if (!value) return;
            if ('#' === value.substr(0, 1)) {
                element.addClass(value.substr(1));
                this.oldClass = value.substr(1);
            } else {
                this.oldImg = new Element('img', {
                    src: _path + value
                }).inject(element[0], 'top');
            }

            if (!attributes.ngBind && !element.text()) {
                element.addClass('icon-no-text');
            } else {
                element.removeClass('icon-no-text');
            }
        }.bind(this));

    }

});