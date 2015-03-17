$(document).foundation();

(function($) {
    $.fn.hitch = function(ev, fn, scope) {
	return this.bind(ev, function() {
	    return fn.apply(scope || this, Array.prototype.slice.call(arguments));
	});
    };
})(jQuery);

function Gallery(selector, prev, next) {
    this.selector = $(selector);
    this.prev_selector = $(prev);
    this.next_selector = $(next);
    this.current = this.selector.first();
    this.tie();
    this.redraw();
};
Gallery.prototype.tie = function() {
    this.prev_selector.hitch('click', this.prev, this);
    this.next_selector.hitch('click', this.next, this);
};
Gallery.prototype.redraw = function() {
    this.selector.hide();
    this.current.show();
    this.next_selector.removeClass('active');
    this.prev_selector.removeClass('active');
    if (this.hasNext()) {
	this.next_selector.addClass('active');
    };
    if (this.hasPrev()) {
	this.prev_selector.addClass('active');
    };
};
Gallery.prototype.hasNext = function() {
    return this.current.next().length != 0;
};
Gallery.prototype.hasPrev = function() {
    return this.current.prev().length !== 0;
};
Gallery.prototype.next = function() {
    if (this.hasNext()) {
	this.current = this.current.next();
	this.redraw();
    };
};
Gallery.prototype.prev = function() {
    if (this.hasPrev()) {
	this.current = this.current.prev();
	this.redraw();
    };
};

$(document).ready(function() {
    var isMobile = window.matchMedia("only screen and (max-width: 40em)");
    if (!isMobile.matches) {
        new Gallery('#gallery_images img', '#gallery .prev', '#gallery .next');
    }
});
