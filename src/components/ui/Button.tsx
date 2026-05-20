import React from 'react'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    href?: string
}

export function Button({
    className = '',
    variant = 'primary',
    size = 'md',
    href,
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-sans transition-all duration-250 ease-in-out uppercase tracking-wider text-xs font-semibold'

    const variants = {
        primary: 'bg-espresso text-cream hover:bg-espresso-light shadow-md hover:shadow-lg',
        secondary: 'bg-gold text-espresso hover:bg-gold-light',
        outline: 'border-2 border-gold text-espresso hover:bg-gold hover:text-cream',
        ghost: 'text-espresso hover:text-gold hover:bg-black/5',
    }

    const sizes = {
        sm: 'px-4 py-2',
        md: 'px-8 py-3.5',
        lg: 'px-10 py-4 text-sm',
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        )
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}
