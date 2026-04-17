"use client";

import { useState, useEffect, useCallback } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation tidak didukung oleh browser Anda",
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          loading: false,
          error: null,
        });
      },
      (err) => {
        let message = "Gagal mendapatkan lokasi";
        if (err.code === err.PERMISSION_DENIED) {
          message = "Izin lokasi ditolak. Aktifkan izin lokasi di pengaturan browser.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = "Informasi lokasi tidak tersedia";
        } else if (err.code === err.TIMEOUT) {
          message = "Permintaan lokasi timeout";
        }
        setState((prev) => ({ ...prev, loading: false, error: message }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return { ...state, requestLocation };
}
