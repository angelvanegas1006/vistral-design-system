/**
 * TypeScript types for Vistral Design Tokens
 *
 * These types are generated from vistral-tokens.json
 * Do not edit manually - use npm run tokens:generate
 */

export interface VistralTokens {
  colors: {
    primary: Record<never, string>
    semantic: Record<never, string>
    product: Record<'white', string>
    [key: string]: Record<string, string>
  }
  typography: {
    fontFamily: Record<'font1', string>
    fontSize: Record<'header-3xl-semibold', string>
    fontWeight: Record<string, number>
    lineHeight: Record<string, string>
  }
  spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl', string>
  radius: Record<'sm' | 'md' | 'lg' | 'xl' | 'full', string>
  shadows?: Record<string, string>
  breakpoints?: Record<'sm' | 'md' | 'lg' | 'xl' | '2xl', string>
}

// Tokens object (imported from JSON)
// Note: In ESM environments, you may need to use dynamic import
// import tokensJson from './vistral-tokens.json'
// export const tokens: VistralTokens = tokensJson as VistralTokens
