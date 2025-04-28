import { cn } from '@/lib/utils'

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function Image({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: ImageProps) {
  // Ensure src starts with / for static images
  const imageSrc = src.startsWith('/') ? src : `/${src}`
  
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
} 