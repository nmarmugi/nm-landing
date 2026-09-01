import type { ElementType } from "react";
import type { PolymorphicProps } from "../../../types/polymorphic";

export interface VisuallyHiddenOwnProps {
  className?: string;
}

export type VisuallyHiddenProps<C extends ElementType = "span"> = PolymorphicProps<
  C,
  VisuallyHiddenOwnProps
>;
