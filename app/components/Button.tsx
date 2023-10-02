import Link from 'next/link'
import clsx from 'clsx'

const baseStyles =
  'duration-150 ease-in-out inline-flex items-center justify-center font-medium group'
const styles = {
  solid: '',
  ghost: 'border',
  secondary: '',
}

const sizeStyles = {
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 xl:px-7 xl:py-4 text-base xl:text-lg',
}

const colors = {
  solid: {
    dark: 'bg-slate-700 text-white hover:bg-slate-900',
    light: '',
  },

  ghost: {
    dark: 'text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white',
    light:
      'border-slate-300 text-white hover:border-white hover:bg-white hover:text-slate-900',
  },

  secondary: {
    dark: 'text-slate-900 bg-gray-secondary-100 hover:bg-gray-secondary-200/70',
    light: '',
  },
}

interface ButtonProps {
  variant?: 'solid' | 'ghost' | 'secondary';
  size?: 'md' | 'lg';
  color?: 'dark' | 'light';
  className?: string;
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;  // Step 1: Add this line
}

export function  Button({
  variant = 'solid',
  size = 'lg',
  color = 'dark',
  className,
  href,
  children,
  onClick,  // Destructure the onClick prop
  ...props
}: ButtonProps) {
  className = clsx(
    baseStyles,
    styles[variant],
    sizeStyles[size],
    colors[variant][color],
    className,
  )

  return href ? (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
