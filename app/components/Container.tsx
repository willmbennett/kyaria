import clsx from 'clsx'

interface ContainerProps {
  className?: string; // Make this optional
  [x: string]: any;   // For other props
}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    />
  )
}
