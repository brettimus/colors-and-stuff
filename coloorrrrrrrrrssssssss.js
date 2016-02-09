// *** Hello! *** //
// * 
// * Welcome to the code.
// * 
// *
// *** Goodbye! *** //

var createHSL = (function() {
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
        this._numbersOnly(hue, "hue");
        while (hue < 0) hue += 360;
        return hue % 360;
    }

    HSL.prototype.validateSaturation = function(saturation) {
        return this.validatePercent(saturation, "saturation");
    }

    HSL.prototype.validateLightness = function(lightness) {
        return this.validatePercent(lightness, "lightness");
    }

    HSL.prototype.validatePercent = function(p, name) {
        this._numbersOnly(p, name);
        if (p < 0) return 0;
        if (p > 100) return 100;
        return p;
    }

    HSL.prototype._numbersOnly = function(n, name) {
        if (name === undefined) name = "";
        var message = "[HSL input error] " + name + " must be a number";
        if (typeof n !== "number")
            throw new Error(message);
    }


    // Comparison
    HSL.prototype.distanceFrom = function(c) {
        // We want the minimum angle between the hues
        var angle = this.validateHue(this.hue() - c.hue());
        if (angle < 180) return angle;
        return this.validateHue(c.hue() - this.hue())
    }


    // Serialization
    HSL.prototype.toString = function() {
        return "hsl(" + [this.hue(), this.saturation() + "%", this.lightness() + "%"] + ")";
    }


    // Public interface
    function createHSL(h, s, l) {
        return new HSL(h, s, l);
    }

    createHSL.random = function() {
        var h = Math.floor(Math.random()*360);
        var s = Math.floor(Math.random()*101);
        var l = Math.floor(Math.random()*101);
        return createHSL(h, s, l);
    }

    createHSL.mix = function(c1, c2) {
        // Averages each value
        var h = (c1.hue() + c2.hue()) / 2;
        var s = (c1.saturation() + c2.saturation()) / 2;
        var l = (c1.lightness() + c2.lightness()) / 2;
        return createHSL(h, s, l);
    }

    return createHSL;
})();

var createPalette = (function(createColor) {
    function Palette(colors) {
        this.colors(colors);
    }

    // The getter should return an array of colors 
    // (Static methods depend on that)
    Palette.prototype.colors = function(colors) {
        if (!arguments.length) return this._colors;
        this._colors = colors;
        return this;
    }

    function createPalette(colors) {
        return new Palette(colors);
    }

    createPalette.random = function(n) {
        var i = n || 2, // default to two random colors
            randomColors = [];
        while (i--) randomColors.push(createColor.random());
        return createPalette(randomColors);
    }

    createPalette.mix = function(p1, p2) {
        var colors1 = p1.colors();
        var colors2 = p2.colors();

        if (colors1.length !== colors2.length)
            throw new Error("Cannot mix palettes of unequal size.")

        var newColors = colors1.map(function(c1, i) {
            var c2 = colors2[i];
            return createColor.mix(c1, c2);
        });

        return createPalette(newColors);
    }

    return createPalette;
})(createHSL);


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

function geneticAlgorithm() {

    var state = getInitialState(10)
                .map(createFitnessWrapper)
                .sort(byFitnessDescending); // A collection of palettes

    evolve(state);
    visualize(state);

    function evolve(state) {
        var LOOP_COUNT = 0;
        var MAX_LOOPS = 400; // what if this grew with the number of taps?? that way more taps => better colors :D 
        while (!isSteady(state) && !(LOOP_COUNT >= MAX_LOOPS)) {

            // breed top six
            state.push.apply(state, breedTopSix(state));

            // mutate one palette from top six
            state.push(randomlyMutateOne(state.slice(0, 6)));

            // mutate one palette from bottom four
            state.push(randomlyMutateOne(state.slice(6, 10)));

            // Chop off the least fitting members of this generation
            state = state.sort(byFitnessDescending).slice(0, 10);

            LOOP_COUNT++;
        }
        console.log("Loop count:", LOOP_COUNT);
        console.log("Top palette:", state[0].palette);
    }

    function visualize(state) {
        var colors = state[0].palette.colors();
        var transition = "background 200ms ease-in-out";
        var elts = document.querySelectorAll("li");
        var panel1 = createPanel({ color: colors[0], element: elts[0], transition: transition });
        var panel2 = createPanel({ color: colors[1], element: elts[1], transition: transition });

        panel1.draw();
        panel2.draw();
    }

    function breedTopSix(state) {
        return [
            createFitnessWrapper(
                breedPalettes(state[0].palette, state[1].palette)
            ),
            createFitnessWrapper(
                breedPalettes(state[2].palette, state[3].palette)
            ),
            createFitnessWrapper(
                breedPalettes(state[4].palette, state[5].palette)
            ),
        ];
    }

    function randomlyMutateOne(state) {
        var i = Math.floor(Math.random() * state.length);
        return createFitnessWrapper(mutatePalette(state[i].palette))
    }

    function getInitialState(N) {
       var i = N;
       var palettes = [];
       while (i--) palettes.push(createPalette.random());
       return palettes;
    }

    function createFitnessWrapper(p) {
        return {
            fitness: calculatePaletteFitness(p),
            palette: p,
        };
    }

    function byFitnessDescending(p1, p2) {
        return p2.fitness - p1.fitness;   
    }

    function calculatePaletteFitness(p) {
        // Uses 
        //  * the squared minimum angle between the two colors's hues
        //  * 0 if lightness is below 5% or above 95%
        //  * 0 if saturation is below 5%

        var colors = p.colors();
        var c1 = colors[0];
        var c2 = colors[1];

        var minSquaredAngle = Math.pow(c1.distanceFrom(c2), 2),
            lightnessMultiplier = 1,
            saturationMultiplier = 1,
            lightnessRange = [5, 95],
            saturationRange = [5, 100];

        if ([c1.l(), c2.l()].some(_isNotInRange(lightnessRange)))
            lightnessMultiplier = 0;

        if ([c1.s(), c2.s()].some(_isNotInRange(saturationRange)))            
            saturationMultiplier = 0;

        return minSquaredAngle * lightnessMultiplier * saturationMultiplier;
    }

    function isSteady(state) {
        printDummyMethodWarning("Running dummy version of #isSteadyState");
        return false;
    }

    function mutatePalette(p) {
        printDummyMethodWarning("Running dummy version of #mutatePalette");
        return createPalette.random();
    }

    function breedPalettes(p1, p2) {
        return createPalette.mix(p1, p2);
    }

    function printDummyMethodWarning(message) {
        console.log("[Warning] %c" + message, "color: deeppink; font-weight: 700; font-size: 135%;");
    }

    function _isNotInRange(range) {
        return function(n) {
            return n < range[0] || n > range[1];            
        };
    }
}


// *** main *** //
if (typeof window === "undefined") {
    require("./test")();
}
else __browser_tests();
// ************ //


function __browser_tests() {
    document.body.addEventListener("click", interactionHandler);
    document.body.addEventListener("touchend", interactionHandler);

    function interactionHandler(event) {
        event.stopPropagation();
        event.preventDefault();
        geneticAlgorithm();
    }

    setTimeout(geneticAlgorithm, 80);
}