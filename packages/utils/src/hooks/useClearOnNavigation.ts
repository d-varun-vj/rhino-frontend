import { useEffect, useRef } from 'react';

type UseClearOnNavigationArgs = {
  onNavigate: (destinationPath: string) => void;
  enableUnmountFallback?: boolean;
  deps?: unknown[];
};

export const useClearOnNavigation = ({
  onNavigate,
  enableUnmountFallback = true,
  deps = [],
}: UseClearOnNavigationArgs) => {
  const onNavigateRef = useRef(onNavigate);

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate, ...deps]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor?.href) {
        return;
      }

      try {
        const destinationPath = new URL(anchor.href, window.location.origin)
          .pathname;
        onNavigateRef.current(destinationPath);
      } catch (error) {
        console.error(
          `[useClearOnNavigation] Failed to parse malformed href: "${anchor.href}"`,
          error
        );
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);

      if (enableUnmountFallback) {
        window.setTimeout(() => {
          onNavigateRef.current(window.location.pathname);
        }, 0);
      }
    };
  }, [enableUnmountFallback]);
};
