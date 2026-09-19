import sharp from "sharp";
import fs from "fs";

const sizes = [192, 512];
const inputFile = "public/logo.png";
const outputDir = "public/icons";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach((size) => {
  sharp(inputFile)
    .resize(size, size)
    .toFile(`${outputDir}/icon-${size}x${size}.png`)
    .then(() => console.log(`Generated ${size}x${size} icon`))
    .catch((err) => console.error(err));
});
