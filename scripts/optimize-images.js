import sharp from 'sharp'
import { readdir, mkdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'
import { existsSync } from 'fs'

const INPUT_DIR = join(process.cwd(), 'public', 'images')
const OUTPUT_DIR = join(process.cwd(), 'public', 'images-optimized')

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
}

async function processImage(inputPath, outputPath) {
  const ext = extname(inputPath).toLowerCase()
  const baseName = basename(inputPath, ext)
  const outputExt = ext === '.png' ? '.png' : '.jpg'

  try {
    // Compress original format
    let compressor = sharp(inputPath)
    if (ext === '.png') {
      compressor = compressor.png({ quality: 80, compressionLevel: 9 })
    } else {
      compressor = compressor.jpeg({ quality: 80, mozjpeg: true })
    }

    const compressedPath = join(outputPath, `${baseName}${outputExt}`)
    await compressor.toFile(compressedPath)

    // Convert to WebP
    const webpPath = join(outputPath, `${baseName}.webp`)
    await sharp(inputPath).webp({ quality: 80 }).toFile(webpPath)

    console.log(`✓ Processed: ${inputPath}`)
    console.log(`  - Compressed: ${compressedPath}`)
    console.log(`  - WebP: ${webpPath}`)

    return { original: inputPath, compressed: compressedPath, webp: webpPath }
  } catch (error) {
    console.error(`✗ Failed to process ${inputPath}:`, error.message)
    return null
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
  console.log('Starting image optimization...')
  console.log(`Input directory: ${INPUT_DIR}`)
  console.log(`Output directory: ${OUTPUT_DIR}`)

  await ensureDir(OUTPUT_DIR)

  const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'])
  const results = []

  await walkDir(INPUT_DIR, async (filePath) => {
    const ext = extname(filePath)
    if (imageExtensions.has(ext)) {
      // Create subdirectory structure in output
      const relativePath = filePath.replace(INPUT_DIR, '')
      const outputSubDir = join(OUTPUT_DIR, relativePath.replace(basename(relativePath), ''))
      await ensureDir(outputSubDir)

      const result = await processImage(filePath, outputSubDir)
      if (result) results.push(result)
    }
  })

  console.log('\n=== Optimization Complete ===')
  console.log(`Processed ${results.length} images`)
  console.log('\nNext steps:')
  console.log('1. Update component references to use WebP images')
  console.log('2. Add <picture> elements with fallbacks')
  console.log('3. Add loading="lazy" to images below the fold')

  // Generate mapping file
  const mapping = {}
  results.forEach((r) => {
    mapping[r.original] = {
      compressed: r.compressed.replace(process.cwd(), ''),
      webp: r.webp.replace(process.cwd(), ''),
    }
  })

  const { writeFile } = await import('fs/promises')
  await writeFile(join(process.cwd(), 'image-mapping.json'), JSON.stringify(mapping, null, 2))
  console.log('\nImage mapping saved to image-mapping.json')
}

main().catch(console.error)
