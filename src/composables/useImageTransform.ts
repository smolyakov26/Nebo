/**
 * Composable for transforming image paths to optimized versions.
 * Converts /images/xxx.jpg to /images-optimized/xxx.webp
 */
export function useImageTransform() {
  /**
   * Transform image path to WebP version in optimized folder
   */
  const getImageWebp = (src: string): string => {
    return src
      .replace('/images/', '/images-optimized/')
      .replace('.jpg', '.webp')
      .replace('.png', '.webp')
  }

  /**
   * Transform image path to optimized folder (keeps original format)
   */
  const getImageJpeg = (src: string): string => {
    return src.replace('/images/', '/images-optimized/')
  }

  /**
   * Generate picture element sources for optimized images
   */
  const getOptimizedSrcset = (src: string): { webp: string; original: string } => {
    return {
      webp: getImageWebp(src),
      original: getImageJpeg(src),
    }
  }

  return {
    getImageWebp,
    getImageJpeg,
    getOptimizedSrcset,
  }
}
