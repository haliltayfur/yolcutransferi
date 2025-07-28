"use client";
import React, { useEffect, useRef } from "react";

export default function GooglePlacePicker({ onChange }) {
  const ref = useRef();

  useEffect(() => {
    // Google'ın Web Component'ini yükle
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";
    document.head.appendChild(script);

    // Etkinlik dinle (adres seçildiğinde)
    const picker = ref.current;
    function handlePlaceChange(e) {
      const address = e.detail?.place?.formattedAddress;
      if (address && onChange) onChange(address);
    }
    if (picker) picker.addEventListener("gmpx-place-picker-place-change", handlePlaceChange);

    return () => {
      if (picker) picker.removeEventListener("gmpx-place-picker-place-change", handlePlaceChange);
      document.head.removeChild(script);
    };
  }, [onChange]);

  return (
    <gmpx-api-loader
      key="AIzaSyAN0-jrzYMAMK6rKrcgnCz5FB1mbxSqGh0"
      solution-channel="GMP_GE_placepicker_v2"
    ></gmpx-api-loader>
    /* React JSX'te custom element için ref ile erişip event dinleyebilirsin */
    <gmpx-place-picker ref={ref} placeholder="Adres girin" style={{ width: "100%" }}></gmpx-place-picker>
  );
}
