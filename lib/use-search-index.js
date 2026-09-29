"use client";

import { useEffect, useMemo, useState } from "react";
import { mergeDocuments, prepareIndex } from "@/lib/search";

let cachedIndex = null;
let pendingIndex = null;
let cachedDocs = null;
let pendingDocs = null;

function loadIndex() {
  if (cachedIndex) return Promise.resolve(cachedIndex);
  if (!pendingIndex) {
    pendingIndex = fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Search index failed to load");
        return res.json();
      })
      .then((data) => {
        cachedIndex = prepareIndex(data);
        return cachedIndex;
      })
      .catch((err) => {
        pendingIndex = null;
        throw err;
      });
  }
  return pendingIndex;
}

// The text inside PDFs is a larger file, so it loads separately and only when
// a search actually needs it.
function loadDocs() {
  if (cachedDocs) return Promise.resolve(cachedDocs);
  if (!pendingDocs) {
    pendingDocs = fetch("/search-documents.json")
      .then((res) => {
        if (!res.ok) throw new Error("Document index failed to load");
        return res.json();
      })
      .then((data) => {
        cachedDocs = data;
        return cachedDocs;
      })
      .catch((err) => {
        pendingDocs = null;
        throw err;
      });
  }
  return pendingDocs;
}

// enabled: load the site index. withDocuments: also load the PDF text.
export function useSearchIndex(enabled = true, withDocuments = false) {
  const [base, setBase] = useState(cachedIndex);
  const [docs, setDocs] = useState(cachedDocs);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled || cachedIndex) return;
    let live = true;
    loadIndex()
      .then((data) => live && setBase(data))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, [enabled]);

  useEffect(() => {
    if (!withDocuments || cachedDocs) return;
    let live = true;
    // If the PDF text cannot load, search still works on everything else.
    loadDocs()
      .then((data) => live && setDocs(data))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [withDocuments]);

  const baseIndex = base || cachedIndex;
  const documents = docs || cachedDocs;
  const index = useMemo(
    () => (baseIndex && documents ? mergeDocuments(baseIndex, documents) : baseIndex),
    [baseIndex, documents]
  );

  return { index, error, docsLoading: withDocuments && !documents };
}
