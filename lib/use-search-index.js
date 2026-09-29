"use client";

import { useEffect, useState } from "react";
import { prepareIndex } from "@/lib/search";

let cached = null;
let pending = null;

function loadIndex() {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Search index failed to load");
        return res.json();
      })
      .then((data) => {
        cached = prepareIndex(data);
        return cached;
      })
      .catch((err) => {
        pending = null;
        throw err;
      });
  }
  return pending;
}

// Loads the search index once per visit, only when a search is opened.
export function useSearchIndex(enabled = true) {
  const [loaded, setLoaded] = useState(cached);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled || cached) return;
    let live = true;
    loadIndex()
      .then((data) => live && setLoaded(data))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, [enabled]);

  return { index: loaded || cached, error };
}
