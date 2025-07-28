"use client";
import React, { useRef, useEffect } from "react";

export default function AutocompleteInput({ value, onChange, placeholder, name }) {
  const inputRef = useRef();

  // Autocomplete’i sadece bir kere kur
  useEffect(() => {
    if (!window.google || !window.google.maps) return;
    if (!inputRef.current) return;

    let autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "tr" }
    });

    // Place seçilince
    const handlePlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) onChange(place.formatted_address);
      else if (place && place.name) onChange(place.name);
      else if (inputRef.current) onChange(inputRef.current.value);
    };

    autocomplete.addListener("place_changed", handlePlaceChanged);

    return () => {
      // Temizle
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  // Değer dışarıdan güncellenirse inputa yansıt
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value || "";
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      name={name}
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
      className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
      spellCheck={false}
    />
  );
}
