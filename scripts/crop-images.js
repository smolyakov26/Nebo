import sharp from 'sharp'
import { readdir, mkdir, stat } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { existsSync } from 'fs'

const INPUT_DIR = join(process.cwd(), 'public', 'images-optimized')
const OUTPUT_DIR = join(process.cwd(), 'public', 'images-cropped')

// Define target sizes (width x height)
const SIZES = [
  { width: 1920, height: 1080, suffix: 'xl' },
  { width: 1280, height: 720, suffix: 'lg' },
  { width: 800, height: 450, suffix: 'md' },
  { width: 400, height: 225, suffix: 'sm' },
]

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
}

async function processImage(inputPath, relativePath) {
  const ext = extname(inputPath).toLowerCase()
  const baseName = basename(inputPath, ext)
  const outputSubDir = join(OUTPUT_DIR, dirname(relativePath).replace(INPUT_DIR, ''))
  await ensureDir(outputSubDir)

  try {
    const metadata = await sharp(inputPath).metadata()
    console.log(`Processing ${relativePath} (${metadata.width}x${metadata.height})`)

    for (const size of SIZES) {
      // Skip upscaling: only generate if target dimensions are not larger than original
      if (size.width > metadata.width || size.height > metadata.height) {
        console.log(
          `  - Skipped ${size.suffix}: target ${size.width}x${size.height} > original ${metadata.width}x${metadata.height}`,
        )
        continue
      }
      // Calculate crop to maintain aspect ratio and cover the target size
      const resizeOptions = {
        width: size.width,
        height: size.height,
        fit: 'cover',
        position: 'attention', // smart crop to focus on interesting region
      }

      // For each size, generate JPEG and WebP
      const jpegOutput = join(outputSubDir, `${baseName}-${size.suffix}.jpg`)
      const webpOutput = join(outputSubDir, `${baseName}-${size.suffix}.webp`)

      await sharp(inputPath)
        .resize(resizeOptions)
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(jpegOutput)

      await sharp(inputPath).resize(resizeOptions).webp({ quality: 80 }).toFile(webpOutput)

      console.log(`  - Created ${size.suffix}: ${size.width}x${size.height}`)
    }

    // Also keep original ratio but resize to max width 1920 (preserve aspect)
    const originalOutput = join(outputSubDir, `${baseName}-original.jpg`)
    const originalWebp = join(outputSubDir, `${baseName}-original.webp`)

    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(originalOutput)

    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(originalWebp)

    console.log(`  - Created original ratio (max 1920 width)`)

    return true
  } catch (error) {
    console.error(`✗ Failed to process ${inputPath}:`, error.message)
    return false
  }
}

async function walkDir(dir, callback) {
  const items = await readdir(dir)
  for (const item of items) {
    const fullPath = join(dir, item)
    const stats = await stat(fullPath)
    if (stats.isDirectory()) {
      await walkDir(fullPath, callback)
    } else {
      await callback(fullPath)
    }
  }
}

async function main() {
  console.log('Starting image cropping...')
  console.log(`Input directory: ${INPUT_DIR}`)
  console.log(`Output directory: ${OUTPUT_DIR}`)

  await ensureDir(OUTPUT_DIR)

  const imageExtensions = new Set([
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.JPG',
    '.JPEG',
    '.PNG',
    '.WEBP',
  ])
  let processed = 0

  await walkDir(INPUT_DIR, async (filePath) => {
    const ext = extname(filePath)
    if (imageExtensions.has(ext)) {
      const success = await processImage(filePath, filePath)
      if (success) processed++
    }
  })

  console.log('\n=== Cropping Complete ===')
  console.log(`Processed ${processed} images`)
  console.log('\nCropped images are in public/images-cropped/')
  console.log('You can now update components to use responsive images with srcset.')
}

main().catch(console.error)
