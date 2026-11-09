declare module "@splidejs/react-splide" {
  import * as React from "react";

  export interface SplideOptions {
    type?: "slide" | "loop" | "fade";
    perPage?: number;
    perMove?: number;
    gap?: string | number;
    arrows?: boolean;
    pagination?: boolean;
    drag?: boolean;
    wheel?: boolean;
    speed?: number;
    rewind?: boolean;
    autoHeight?: boolean;
    breakpoints?: Record<number, Partial<SplideOptions>>;
    [key: string]: unknown;
  }

  export interface SplideProps extends React.HTMLAttributes<HTMLDivElement> {
    options?: SplideOptions;
    hasAutoplay?: boolean;
    tag?: string;
    extensions?: unknown;
  }

  export interface SplideSlideProps extends React.HTMLAttributes<HTMLLIElement> {
    tag?: string;
  }

  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<SplideSlideProps>;
}