import { useEffect } from "react";

/** Aggiorna titolo e meta description della pagina corrente. */
export function useDocumentMeta(title: string, description?: string): void {
  useEffect(() => {
    document.title = title;

    if (!description) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
  }, [title, description]);
}
