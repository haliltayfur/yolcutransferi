"use client";
import React, { useState, useRef, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function AutocompleteInput({ value, onChange, placeholder, name }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef();

  // Fetch autocomplete suggestions
  useEffect(() => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&language=tr&components=country:tr&key=${API_KEY}`,
      { signal: controller.signal }
    )
      .then(res => res.json())
      .then(data => setSuggestions(data.predictions || []))
      .catch(() => setSuggestions([]))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [query]);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Value dışarıdan değişirse inputa yansıt
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  function handleSelect(prediction) {
    setQuery(prediction.description);
    setShowList(false);
    if (onChange) onChange(prediction.description);
  }

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <input
        name={name}
        autoComplete="off"
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
        value={query}
        placeholder={placeholder}
        onChange={e => {
          setQuery(e.target.value);
          setShowList(true);
          if (onChange) onChange(e.target.value);
        }}
        onFocus={() => setShowList(true)}
        spellCheck={false}
      />
      {showList && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 20,
            top: "100%",
            left: 0,
            right: 0,
            background: "#222112",
            border: "1px solid #bfa658",
            borderTop: "none",
            maxHeight: 250,
            overflowY: "auto",
            color: "#ffeec2",
            fontSize: 15,
            borderRadius: "0 0 10px 10px"
          }}
        >
          {suggestions.map(suggestion => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              style={{
                padding: "12px 18px",
                cursor: "pointer",
                borderBottom: "1px solid #bfa65833"
              }}
              onMouseDown={e => e.preventDefault()} // Input'a tekrar focus olmasın
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, background: "#222112", color: "#ffd700", fontSize: 14, padding: "8px 16px", borderRadius: "0 0 10px 10px"
        }}>
          Yükleniyor...
        </div>
      )}
    </div>
  );
}
