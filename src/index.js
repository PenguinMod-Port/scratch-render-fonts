// Synchronously load TTF fonts.
// First, have Webpack load their data as Base 64 strings.
let FONTS;

const getFonts = function () {
    if (FONTS) return FONTS;
    /* eslint-disable global-require */
    FONTS = {
        'Sans Serif': require('base64-loader!./NotoSans-Medium.woff2'),
        'Serif': require('base64-loader!./SourceSerifPro-Regular.woff2'),
        'Handwriting': require('base64-loader!./handlee-regular.woff2'),
        'Marker': require('base64-loader!./Knewave.woff2'),
        'Curly': require('base64-loader!./Griffy-Regular.woff2'),
        'Pixel': require('base64-loader!./Grand9K-Pixel.woff2'),
        'Scratch': require('base64-loader!./ScratchSavers_b2.woff2'),
        'Technological': require('base64-loader!./MonospaceBold.woff2'),
        'Bubbly': require('base64-loader!./QTKooper.woff2'),
        'Bits and Bytes': require('base64-loader!./freecam-v2.woff2'),
        'Playful': require('base64-loader!./BadComic-Regular.woff2'),
        'Arcade': require('base64-loader!./PressStart2P.woff2'),
        'Archivo': require('base64-loader!./Archivo-Regular.woff2'),
        'Archivo Black': require('base64-loader!./Archivo-Black.woff2'),
        'Thin': require('base64-loader!./Xtraflexidisc.woff2'),
    };
    /* eslint-enable global-require */

    // For each Base 64 string,
    // 1. Replace each with a usable @font-face tag that points to a Data URI.
    // 2. Inject the font into a style on `document.body`, so measurements
    //    can be accurately taken in SvgRenderer._transformMeasurements.
    for (const fontName in FONTS) {
        const fontData = FONTS[fontName];
        FONTS[fontName] = '@font-face {' +
            `font-family: "${fontName}";src: url("data:font/woff2;base64,${fontData}");}`;
    }

    if (!document.getElementById('scratch-font-styles')) {
        let css = '';
        for (const fontName in FONTS) {
            css += FONTS[fontName];
        }

        const documentStyleTag = document.createElement('style');
        documentStyleTag.id = 'scratch-font-styles';
        documentStyleTag.textContent = css;
        document.body.insertBefore(documentStyleTag, document.body.firstChild);
    }

    return FONTS;
};

module.exports = getFonts;
