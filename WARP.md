# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The Product Papers (TPP) website is a Next.js 15 application built with React 19, TypeScript, and Tailwind CSS 4. The project uses Turbopack for faster builds and development, and the Geist font family for typography.

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
```
Development server runs on http://localhost:3000

### Build & Production
```bash
npm run build        # Build for production with Turbopack
npm run start        # Start production server
```

### Package Management
```bash
npm install          # Install dependencies
npm install <package> # Add new dependency
```

## Architecture & Code Structure

### Next.js App Router Structure
- **`src/app/`** - App Router directory (Next.js 13+ structure)
  - **`layout.tsx`** - Root layout with font configuration and global styles
  - **`page.tsx`** - Homepage component
  - **`globals.css`** - Global styles with Tailwind CSS imports and CSS custom properties

### Key Technology Stack
- **Next.js 15** with App Router
- **React 19** (latest version)
- **TypeScript 5** with strict mode enabled
- **Tailwind CSS 4** with PostCSS integration
- **Turbopack** for faster builds and development
- **Geist font family** (Sans & Mono variants)

### Styling Approach
- Uses Tailwind CSS 4 with `@import "tailwindcss"` syntax
- CSS custom properties for theming (light/dark mode support)
- Font variables configured in layout.tsx: `--font-geist-sans` and `--font-geist-mono`
- Responsive design with mobile-first approach

### TypeScript Configuration
- Path aliases configured: `@/*` maps to `./src/*`
- Strict mode enabled
- Module resolution set to "bundler"
- Next.js plugin included for enhanced TypeScript support

## Development Patterns

### Component Development
- Functional components with TypeScript
- Server Components by default (App Router)
- Use `"use client"` directive only when client-side interactivity is needed

### Image Handling
- Use Next.js `Image` component from `next/image`
- SVG assets stored in `/public/` directory
- Optimize images with Next.js built-in optimization

### Styling Guidelines
- Use Tailwind utility classes for styling
- Leverage CSS custom properties for theming
- Follow mobile-first responsive design patterns
- Use the configured Geist fonts via CSS variables

## File Organization

### Static Assets
- **`public/`** - Static files (SVGs, icons, etc.)
- All public assets accessible at root URL path

### Source Code
- **`src/app/`** - All application code using App Router structure
- Components, pages, and layouts follow Next.js App Router conventions

## Build Configuration

- **Turbopack**: Enabled for both development and production builds
- **PostCSS**: Configured with Tailwind CSS plugin
- **TypeScript**: Strict configuration with Next.js optimizations
- **Font Optimization**: Automatic optimization for Geist fonts via `next/font/google`