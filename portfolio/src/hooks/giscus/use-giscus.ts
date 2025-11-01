import { useEffect, useRef } from "react";
import { useUiStore } from "@/stores/ui/use-ui-store";
import { GISCUS_CONFIG } from "@/lib/giscus-config";

export function useGiscus() {
  const { isDarkMode } = useUiStore();
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentsRef.current && !commentsRef.current.querySelector(".giscus")) {
      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", GISCUS_CONFIG.repo);
      script.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
      script.setAttribute("data-category", GISCUS_CONFIG.category);
      script.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
      script.setAttribute("data-mapping", GISCUS_CONFIG.mapping);
      script.setAttribute("data-strict", GISCUS_CONFIG.strict);
      script.setAttribute("data-reactions-enabled",GISCUS_CONFIG.reactionsEnabled);
      script.setAttribute("data-emit-metadata", GISCUS_CONFIG.emitMetadata);
      script.setAttribute("data-input-position", GISCUS_CONFIG.inputPosition);
      script.setAttribute("data-theme", isDarkMode ? "dark" : "light");
      script.setAttribute("data-lang", GISCUS_CONFIG.lang);
      script.setAttribute("data-loading", GISCUS_CONFIG.loading);
      script.crossOrigin = "anonymous";
      script.async = true;

      commentsRef.current.appendChild(script);
    }
  }, [isDarkMode]);

  // Sync Giscus theme with dark mode toggle
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: isDarkMode ? "dark" : "light",
            },
          },
        },
        "*"
      );
    }
  }, [isDarkMode]);

  return { commentsRef };
}
