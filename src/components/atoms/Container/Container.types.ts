import type { ElementType } from "react";
import type { PolymorphicProps } from "../../../types/polymorphic";

export interface ContainerOwnProps {
  /** `page` 48px desktop (home) · `inner` 44px (pagine interne) · `flush` senza padding. */
  gutter?: "page" | "inner" | "flush";
  className?: string;
}

export type ContainerProps<C extends ElementType = "div"> = PolymorphicProps<
  C,
  ContainerOwnProps
>;
