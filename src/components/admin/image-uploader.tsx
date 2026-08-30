"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ArrowUp, ArrowDown, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  /** Pre-existing image URLs (for edit page). */
  initialImages?: string[];
  /** Name of the hidden input that carries the JSON array to the form action. */
  name?: string;
}

export function ImageUploader({ initialImages = [], name = "images" }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadOne(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json() as { url?: string; error?: string };
    if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed");
    return data.url;
  }

  async function handleFiles(files: FileList) {
    setError(null);
    setUploading(true);
    const results: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const url = await uploadOne(file);
        results.push(url);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      }
    }
    if (results.length > 0) setImages((prev) => [...prev, ...results]);
    setUploading(false);
  }

  async function remove(index: number) {
    const url = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));
    // Best-effort delete from storage — errors are non-fatal
    if (url) {
      try {
        await fetch("/api/admin/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      } catch {
        // ignore
      }
    }
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setImages((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
      return next;
    });
  }

  function moveDown(index: number) {
    setImages((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1]!, next[index]!];
      return next;
    });
  }

  function makePrimary(index: number) {
    if (index === 0) return;
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.unshift(item!);
      return next;
    });
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      void handleFiles(e.dataTransfer.files);
    }
  }

  return (
    <div>
      {/* Hidden input — carries URL array to the Server Action */}
      <input type="hidden" name={name} value={JSON.stringify(images)} />

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        className="border-2 border-dashed border-[#E5E5E5] rounded-[8px] p-6 text-center cursor-pointer hover:border-[#E65C00] hover:bg-[#FEF9F5] transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-[#6B6B6B]">
            <Loader2 className="w-5 h-5 animate-spin text-[#E65C00]" />
            <span className="text-sm">Uploading…</span>
          </div>
        ) : (
          <>
            <Upload className="w-7 h-7 mx-auto mb-2 text-[#C0C0C0]" />
            <p className="text-sm font-medium text-[#6B6B6B]">
              Click or drag images here
            </p>
            <p className="text-xs text-[#9E9E9E] mt-1">
              PNG, JPG, WebP · up to 5 MB each · multiple allowed
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
            {images.length} image{images.length !== 1 ? "s" : ""} — first is primary
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.map((url, i) => (
              <div key={url + i} className="group relative">
                {/* Thumbnail */}
                <div
                  className={`aspect-square rounded-[8px] overflow-hidden border-2 relative bg-[#F7F7F7] ${
                    i === 0
                      ? "border-[#E65C00]"
                      : "border-[#E5E5E5] hover:border-[#D0D0D0]"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`Product image ${i + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="120px"
                  />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 bg-[#E65C00] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] leading-none">
                      PRIMARY
                    </span>
                  )}
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => void remove(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-white border border-[#E5E5E5] rounded-[4px] flex items-center justify-center text-[#9E9E9E] hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Reorder controls */}
                <div className="flex gap-1 mt-1.5">
                  {i !== 0 && (
                    <button
                      type="button"
                      onClick={() => makePrimary(i)}
                      className="flex-1 text-[10px] py-1 bg-[#F7F7F7] hover:bg-[#E65C00] hover:text-white border border-[#E5E5E5] hover:border-[#E65C00] rounded-[4px] transition-colors text-[#6B6B6B] font-semibold truncate px-1"
                      title="Set as primary image"
                    >
                      ★ Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => moveUp(i)}
                    disabled={i === 0}
                    className="w-7 h-7 flex items-center justify-center bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#9E9E9E] hover:bg-[#F0F0F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move left"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(i)}
                    disabled={i === images.length - 1}
                    className="w-7 h-7 flex items-center justify-center bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#9E9E9E] hover:bg-[#F0F0F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move right"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
