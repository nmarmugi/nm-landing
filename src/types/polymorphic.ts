import type { ComponentPropsWithRef, ElementType, PropsWithChildren } from "react";

/** Prop `as` che permette a un componente di cambiare tag mantenendo lo stile. */
export interface AsProp<C extends ElementType> {
  as?: C;
}

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

/**
 * Props di un componente polimorfico: le sue prop proprie più quelle native del
 * tag scelto con `as`.
 */
export type PolymorphicProps<
  C extends ElementType,
  Props = Record<never, never>,
> = PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithRef<C>, PropsToOmit<C, Props>>;
