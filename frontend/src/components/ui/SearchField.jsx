"use client";

import React, { useId, useRef, useState, useEffect } from "react";
import { Search, X, Loader2, User, ChevronRight } from "lucide-react";
import Button from "./Button";

export default function SearchField({
    value,
    onChange,
    onClear,
    onSearch,
    results = [],
    showResults = true,
    placeholder = "Search...",
    isLoading = false,
    showButton = true, // Default to true based on image
    buttonText = "Search",
    className = "",
    containerClassName = "",
    onResultClick,
    ...props
}) {
    const id = useId();
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClear = () => {
        if (onClear) onClear();
        else onChange?.({ target: { value: "" } });
        setShowDropdown(false);
        inputRef.current?.focus();
    };

    return (
        <div className={`relative w-full ${containerClassName}`} ref={containerRef}>
            {/* Main Search Container */}
            <div className={`
                flex w-full items-stretch 
                border border-slate-300 rounded-[4px] 
                overflow-hidden bg-white
                focus-within:border-[#2BA3FF] focus-within:ring-0
                transition-all duration-200
                ${className}
            `}>

                <div className="relative flex-1 flex items-center">
                    {/* Input */}
                    <input
                        id={id}
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => {
                            onChange?.(e);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
                        placeholder={placeholder}
                        className="w-full bg-transparent pl-4 pr-10 py-2.5 text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
                        {...props}
                    />

                    {/* Clear Button (Hidden if loading) */}
                    {value && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-2 p-1 text-slate-400 hover:text-slate-600"
                        >
                            <X size={16} />
                        </button>
                    )}

                    {/* Loading Spinner inside input if button is hidden */}
                    {isLoading && !showButton && (
                        <div className="absolute right-3">
                            <Loader2 size={16} className="animate-spin text-slate-400" />
                        </div>
                    )}
                </div>

                {/* Search Button (Matches image exactly) */}
                {showButton && (
                    <Button
                        text={buttonText}
                        icon={<Search size={18} strokeWidth={2.5} />}
                        onClick={() => {
                            onSearch?.();
                            setShowDropdown(false);
                        }}
                        disabled={isLoading}
                        className="
    flex items-center gap-2
    px-5 py-2
    bg-[#2BA3FF] hover:bg-[#1a91ed]
    text-white font-normal text-[15px]
    rounded-none border-none
    transition-colors
  "
                    />
                )}
            </div>

            {/* Results Dropdown (Clean SaaS style) */}
            {showResults && showDropdown && value && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-xl max-h-72 overflow-y-auto overflow-x-hidden">
                    {results.length > 0 ? (
                        <div className="py-2">
                            {results.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    onClick={() => {
                                        onResultClick?.(item);
                                        setShowDropdown(false);
                                    }}
                                    className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-slate-100 rounded text-slate-500 group-hover:text-[#2BA3FF]">
                                            <User size={16} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">
                                            {item.name}
                                        </span>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-[#2BA3FF]" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 text-center">
                            <p className="text-sm text-slate-400 italic">No matches found for "{value}"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}