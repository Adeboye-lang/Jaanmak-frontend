import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Jimp, intToRGBA } = require('jimp');

async function removeBackground() {
    try {
        console.log('Reading image...');
        const image = await Jimp.read('/Users/adeboyebello/Downloads/New Jaanmak/jaanmak-app/public/logo.jpg');

        console.log('Image read successfully. Processing...');
        // Get the color of the top-left pixel
        const bgColor = image.getPixelColor(0, 0);
        const { r: bgR, g: bgG, b: bgB } = intToRGBA(bgColor);

        const tolerance = 30; // Adjust tolerance as needed

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];

            if (
                Math.abs(r - bgR) < tolerance &&
                Math.abs(g - bgG) < tolerance &&
                Math.abs(b - bgB) < tolerance
            ) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
            }
        });

        console.log('Writing output...');
        await new Promise((resolve, reject) => {
            image.write('/Users/adeboyebello/Downloads/New Jaanmak/jaanmak-app/public/logo.png', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        console.log('Successfully saved transparent logo to public/logo.png');
    } catch (err) {
        console.error('Error:', err);
    }
}

removeBackground();
