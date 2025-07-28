"use client";
import React, { useEffect, useRef } from "react";

export default function AutocompleteInput({ value, onChange, placeholder, name }) {
  const inputRef = useRef();

  useEffect(() => {
    if (!window.google || !window.google.maps) return;
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "tr" },
    });
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) onChange(place.formatted_address);
      else if (place.name) onChange(place.name);
    });
    // Value dışarıdan değişirse inputa bas
    inputRef.current.value = value || "";
  }, [value]);

  return (
    <input
      ref={inputRef}
      name={name}
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="on"
      className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
    />
  );
}
