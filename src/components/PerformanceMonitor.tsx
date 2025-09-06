"use client";
import { useEffect } from 'react';

// Sadece development ortamında çalışır
export default function PerformanceMonitor() {
  useEffect(() => {
    // Production'da hiçbir şey yapma
    if (process.env.NODE_ENV !== 'development') return;
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const metrics: Record<string, number> = {};
      
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
        if (entry.entryType === 'largest-contentful-paint') {
          metrics.lcp = entry.startTime;
        }
      });

      // Sadece önemli metrikleri logla
      if (Object.keys(metrics).length > 0) {
        console.log('� Performance:', metrics);
      }
    });

    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    } catch {
      // Sessizce devam et
    }

    return () => observer.disconnect();
  }, []);

  // Production'da render bile etme
  if (process.env.NODE_ENV !== 'development') return null;
  return null;
}
