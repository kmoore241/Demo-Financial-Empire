import { lazy, ComponentType } from "react";

// Enhanced lazy loading with error boundary and retry logic
export const lazyWithRetry = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  maxRetries = 3,
) => {
  return lazy(() => {
    return new Promise<{ default: T }>((resolve, reject) => {
      let retries = 0;

      const tryImport = () => {
        importFn()
          .then(resolve)
          .catch((error) => {
            if (retries < maxRetries) {
              retries++;
              console.warn(
                `Import failed, retrying... (${retries}/${maxRetries})`,
              );
              setTimeout(tryImport, 1000 * retries); // Exponential backoff
            } else {
              reject(error);
            }
          });
      };

      tryImport();
    });
  });
};

// Preload critical resources
export const preloadResources = () => {
  // Preload critical images
  const criticalImages = ["/logo.svg", "/favicon.ico"];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts if any
  const criticalFonts: string[] = [];

  criticalFonts.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.href = src;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
};

// Bundle size analyzer (development only)
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Bundle analysis would run here in development");
  }
};

// Performance monitoring
export interface PerformanceMetric {
  name: string;
  value: number;
  delta?: number;
  id: string;
  navigationType?: string;
}

export const sendToAnalytics = (metric: PerformanceMetric) => {
  // Send to your analytics service
  console.log("Performance metric:", metric);
};

// Enhanced Web Vitals reporting
export const reportWebVitals = (
  onPerfEntry?: (metric: PerformanceMetric) => void,
) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Web vitals would be imported here in a real implementation
    console.log("Web vitals reporting would be active here");
  }
};

// Code splitting utilities
export const createAsyncChunk = (chunkName: string) => {
  return (component: () => Promise<any>) => {
    return lazy(() =>
      component().then((module) => ({
        default: module.default || module,
      })),
    );
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  if ("IntersectionObserver" in window) {
    return new IntersectionObserver(callback, {
      rootMargin: "50px",
      threshold: 0.1,
      ...options,
    });
  }
  return null;
};

// Resource prefetching utilities
export const prefetchRoute = (route: string) => {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = route;
  document.head.appendChild(link);
};

export const preconnectToOrigin = (origin: string) => {
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = origin;
  document.head.appendChild(link);
};
