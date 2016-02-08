module.exports = __console_tests;

// Tests
// Highly incomplete
function __console_tests() {
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