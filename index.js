

var createHSL = (function() {
    // Abstraction of a color 

    function HSL(h, s, l) {
        this.hue(h)
            .saturation(s)
            .lightness(l);
    }

    // Getters and setters 
    HSL.prototype.hue = function(h) {
        if (!arguments.length) return this._h;
        this._h = this.validateHue(h);
        return this;
    }
    HSL.prototype.h = HSL.prototype.hue;


    HSL.prototype.saturation = function(s) {
        if (!arguments.length) return this._s;
        this._s = this.validateSaturation(s);
        return this;
    }
    HSL.prototype.sat = HSL.prototype.saturation;
    HSL.prototype.s = HSL.prototype.saturation;

    HSL.prototype.lightness = function(l) {
        if (!arguments.length) return this._l;
        this._l = this.validateLightness(l);
        return this;
    }

    HSL.prototype.lit = HSL.prototype.lightness;
    HSL.prototype.l = HSL.prototype.lightness;


    // Validation
    HSL.prototype.validateHue = function(hue) {
        this._numbersOnly(hue);
        while (hue < 0) hue += 360;
        return hue % 360;
    }

    HSL.prototype.validateSaturation = function(saturation) {
        return this.validatePercent(saturation);
    }

    HSL.prototype.validateLightness = function(lightness) {
        return this.validatePercent(lightness);
    }

    HSL.prototype.validatePercent = function(p) {
        this._numbersOnly(p);
        if (p < 0) return 0;
        if (p > 100) return 100;
        return p;
    }

    HSL.prototype._numbersOnly = function(n) {
        if (typeof n !== "number")
            throw new Error("Hue must be a number");
    }


    // Serialization
    HSL.prototype.toString = function() {
        return "hsl(" + [this.hue(), this.saturation() + "%", this.lightness() + "%"] + ")";
    }


    // Public interface
    return function createHSL(h, s, l) {
        return new HSL(h, s, l);
    }
})();


var createPanel = (function() {
    function Panel(options) {
        if (options.hasOwnProperty("element"))
            this.element(options.element);

        if (options.hasOwnProperty("color"))
            this.color(options.color);

        if (options.hasOwnProperty("transition"))
            this.transition(options.transition);
    }


    // Getters and setters
    Panel.prototype.color = function(c) {
        if (!arguments.length) return this._color;
        this._color = c.toString();
        return this;
    }

    Panel.prototype.element = function(elt) {
        if (!arguments.length) return this._element;
        this._element = elt;
        return this;
    }

    Panel.prototype.transition = function(t) {
        if (!arguments.length) return this.element().style.transition;
        this.element().style.transition = t;
        return this;
    }

    // Actions
    Panel.prototype.draw = function() {
        var elt = this.element();
        var color = this.color();
        elt.style.background = color;
        return this;
    }

    Panel.prototype.changeColor = function(color) {
        this.color(color).draw();
    }


    // Public interface
    return function createPanel(options) {
        return new Panel(options);
    }
})();

function mutateHSL(hsl) {
    throw new Error("NYI");
}

// *** main *** //
if (typeof window === "undefined") __tests();
else __do_it();
// ************ //

function __do_it() {

    var opal = createHSL(154.29, 25.93, 73.53);
    var celtic = createHSL(160, 18, 19.61);
    var white = createHSL(0, 0, 100);
    var black = createHSL(0, 0, 0);

    var transition = "background 200ms ease-in-out";

    var elts = document.querySelectorAll("li");
    var panel1 = createPanel({ color: celtic, element: elts[0], transition: transition });
    var panel2 = createPanel({ color: opal, element: elts[1], transition: transition });
    var panel3 = createPanel({ color: black, element: elts[2], transition: transition });

    function tick() {
        var panel1Color = panel1.color();
        panel1.color(panel2.color()).draw();
        panel2.color(panel3.color()).draw();
        panel3.color(panel1Color).draw();
    }

    setTimeout(tick, 100);
    setTimeout(tick, 600);
    document.body.addEventListener("click", tick);
}


// Test
function __tests() {
    var blanketColors = [
        createHSL(154.29, 25.93, 73.53), // opal
        createHSL(167.5, 19.05, 50.59), // gumbo
        createHSL(160, 18, 19.61), // celtic
    ];
    var t;

    console.log("...");

    t = blanketColors[0]; // Opal
    console.log("Hue should be 154.29", t.hue());
    console.log("Sat should be 25.93", t.saturation());
    console.log("Lightness should be 73.53", t.lightness());
    console.log("toString()", t.toString());  

    console.log("...");

    tc = blanketColors[0];
    t = createPanel({ color: tc });
    console.log("Color should be " + tc.toString(), t.color());

    console.log("...");
}