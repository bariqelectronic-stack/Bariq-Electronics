import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { demoProducts } from "@/lib/demo-products";

const articles: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  emoji: string;
  content: string;
  relatedSlugs: string[];
}> = {
  "how-to-choose-a-microscope-for-microsoldering": {
    title: "How to Choose a Microscope for Microsoldering",
    excerpt: "A practical guide to selecting the right magnification, working distance and optical system for microsoldering and mobile repair work.",
    category: "Buying Guides",
    readTime: "6 min read",
    emoji: "🔬",
    relatedSlugs: ["microscopes"],
    content: `
## Why a Microscope Matters for Microsoldering

Modern smartphones and electronics use increasingly small components. Microsoldering — replacing or reworking chips, capacitors, resistors and connectors on mobile phone PCBs — requires consistent, clear magnification to work accurately and safely.

Attempting microsoldering without adequate magnification increases the risk of cold joints, bridge shorts, lifted pads and component damage. A suitable microscope is one of the most important investments a professional repair technician can make.

## Key Factors to Consider

### 1. Magnification Range

For mobile phone repair and microsoldering, a zoom range of approximately 7x–45x covers most work:

- **Lower magnification (7x–15x):** Suitable for general inspection, finding components, and overview work.
- **Mid range (15x–30x):** Good for detailed soldering, joint inspection, and component placement.
- **High magnification (30x–45x):** For fine inspection, detecting micro-cracks, and very small component work.

Consider the specific tasks you perform most often when choosing a magnification range.

### 2. Working Distance

Working distance is the space between the objective lens and your work surface. For microsoldering:

- You need enough space to maneuver your soldering iron or tools under the lens.
- A working distance of **100mm or more** is generally recommended for comfortable microsoldering.
- Shorter working distances limit your movement and make soldering difficult.

### 3. Optical System

There are two main optical configurations:

- **Parallel optics:** Provides a flat, undistorted image. Generally preferred for inspection and precision work.
- **Convergent optics:** A traditional stereo design. Can cause slight distortion at higher magnifications.

For professional repair use, parallel optics tend to offer better image quality and reduced eye strain during extended work sessions.

### 4. Trinocular vs Binocular

- **Binocular:** Two eyepieces. Standard for viewing work in real time.
- **Trinocular:** Two eyepieces plus a third port for a camera. Essential if you want to record repairs, display a live feed on a monitor, or document work.

If you plan to add a digital camera or connect to a monitor, choose trinocular.

### 5. Stand Type

- **Pillar stand:** Basic, stable, limited range of motion. Suitable for fixed bench use.
- **Boom arm stand:** Greater flexibility, can be positioned over larger work areas. Preferred for most repair setups.
- **Table stand with clamp:** Versatile, can be repositioned. Good for multi-purpose workbenches.

### 6. Lighting

Good lighting is essential for repair work:

- **Ring LED light:** Provides even, shadow-free illumination directly around the lens. Most common for repair microscopes.
- **External adjustable lights:** Can be positioned for specific angles.
- **Variable brightness:** Important for adjusting to different surfaces (reflective boards, dark components).

## Recommended Setup for Microsoldering

For a professional microsoldering bench, consider:

- **Zoom range:** 7x–45x
- **Working distance:** 100mm+
- **Head type:** Trinocular (for camera/monitor)
- **Stand:** Boom arm for flexibility
- **Lighting:** Adjustable ring LED

## What Not to Prioritize

- **Maximum magnification alone:** Higher magnification reduces working distance and field of view. Balance is more important.
- **Brand name over specifications:** Focus on the technical specs that match your use case.

## Browse Our Microscopes

Visit our [microscopes category](/categories/microscopes) to see the current product range.
    `,
  },
  "professional-mobile-repair-bench-setup": {
    title: "Professional Mobile Repair Bench Setup",
    excerpt: "What every professional repair technician needs on their bench — from lighting and magnification to organization and ESD safety.",
    category: "Repair Guides",
    readTime: "8 min read",
    emoji: "🔧",
    relatedSlugs: [],
    content: `
## Setting Up a Professional Repair Bench

A well-organized, properly equipped repair bench makes you more efficient, reduces mistakes, and protects both your tools and the devices you work on.

## Essential Equipment

### Magnification

A stereo microscope is the single most impactful piece of equipment on a professional repair bench. For mobile phone repair:

- Choose a microscope with at least 7x–45x zoom range
- Working distance of 100mm or more for comfortable tool access
- Trinocular head if you want to add a monitor or camera
- Good ring lighting included or added

For initial inspection without a microscope, a quality 10x loupe can also be useful.

### Soldering Equipment

For board-level and microsoldering work:

- **Temperature-controlled soldering station:** Precision temperature control is essential. Variable temperature, fast heat-up, and compatibility with fine tips.
- **Hot air station:** Required for chip removal, rework, and component replacement.
- **Fine tips:** Select tips appropriate for the work — knife, chisel, fine point.
- **Flux:** Quality flux is essential for clean solder work. No-clean flux is practical for most repair work.

### ESD Protection

Electrostatic discharge (ESD) can permanently damage sensitive electronic components:

- **ESD mat:** Cover your bench surface with a properly grounded anti-static mat
- **ESD wrist strap:** Wear it and keep it grounded when handling PCBs
- **ESD-safe tweezers:** Non-conductive or dissipative handles
- **ESD-safe screwdrivers:** For disassembly work

### Lighting

Beyond microscope illumination:

- **Overhead lamp:** Adjustable overhead lighting for the overall bench area
- **Magnifying lamp:** Useful for general inspection without a microscope

### Organization

Clutter slows you down and leads to lost parts:

- Component trays and organizers for small screws and parts
- Labeled storage for tools and accessories
- Clean, clear bench surface as a working standard

## Tools for Disassembly

- Precision screwdriver set (Pentalobe, Torx, Phillips, flathead in various sizes)
- Plastic opening picks and spudgers
- Suction cup for display removal
- Heat pad or heat gun for adhesive softening

## Cleaning Tools

- Anti-static brushes for PCB cleaning
- IPA (isopropyl alcohol) for flux and residue removal
- Swabs and wipes

## Summary

A professional repair bench doesn't need to be built all at once. Start with:

1. Quality microscope with good lighting
2. Temperature-controlled soldering station
3. ESD mat and wrist strap
4. Basic precision screwdriver set
5. Tweezers (ESD safe)

Then expand from there based on the specific repairs you perform.
    `,
  },
  "essential-tools-for-pcb-repair": {
    title: "Essential Tools for PCB Repair",
    excerpt: "The core toolkit for printed circuit board repair work — what you need and why.",
    category: "Tool Guides",
    readTime: "5 min read",
    emoji: "⚙️",
    relatedSlugs: [],
    content: `
## PCB Repair Essentials

Board-level repair requires a specific set of tools beyond standard disassembly equipment.

## Visual Inspection Tools

### Microscope

The single most important tool for PCB repair. Without adequate magnification, identifying component damage, trace breaks, cold solder joints, and corrosion is unreliable. Choose a stereo microscope with a suitable zoom range and working distance.

### Multimeter

Essential for electrical diagnostics:
- Continuity testing (checking traces, fuses, connectors)
- Voltage measurements
- Resistance measurements
- Diode testing

A digital multimeter with probes suitable for small PCB pads is required.

### USB Microscope / Camera

For documentation, displaying live images on a monitor, or recording repair processes.

## Soldering Equipment

### Soldering Station

Temperature-controlled station with fine tips for component-level work. Features to look for:
- Precise temperature control
- Fast heat-up time
- Wide tip range compatibility
- ESD safe design

### Hot Air Station

Required for:
- Removing surface-mount components
- BGA rework and reballing
- Reflow of solder joints
- Softening adhesives

### Soldering Tips

Have a range available:
- Fine conical tip for small work
- Chisel/flat tip for through-hole and larger joints
- Knife tip for drag soldering

## Support Tools

### Flux

- No-clean flux paste or liquid for most repair work
- Quality flux reduces surface tension and improves solder flow

### Solder

- Lead-free solder for newer devices
- Small diameter (0.6mm or less) for fine work

### Desoldering Wick and Pump

For removing excess solder and cleaning up joints.

### PCB Holder / Third Hand

Holds the board securely during repair. Look for one with adjustable arms and heat-resistant clips.

## Cleaning

- IPA (isopropyl alcohol 99%)
- Anti-static brush
- Lint-free swabs

## Safety

- ESD mat and wrist strap
- Fume extractor if working in an enclosed space

## Starting Point

If you're setting up for PCB repair for the first time, prioritize:

1. Stereo microscope
2. Quality soldering station
3. Hot air station
4. Multimeter
5. Flux, solder, desoldering tools
6. ESD protection
    `,
  },
  "microsoldering-equipment-checklist": {
    title: "Microsoldering Equipment Checklist",
    excerpt: "A complete checklist of tools and equipment required to begin microsoldering work on modern mobile devices.",
    category: "Microsoldering",
    readTime: "4 min read",
    emoji: "✅",
    relatedSlugs: [],
    content: `
## Microsoldering Equipment Checklist

Before you begin microsoldering work on modern mobile devices, ensure you have the following equipment in place.

## Magnification ✓

- [ ] Stereo microscope (7x–45x zoom range)
- [ ] Working distance suitable for tools (100mm+)
- [ ] Ring LED lighting or equivalent
- [ ] Optional: trinocular head with camera for documentation

## Soldering Equipment ✓

- [ ] Temperature-controlled soldering station
- [ ] Fine soldering tips (conical, knife, chisel)
- [ ] Hot air rework station
- [ ] Quality flux (no-clean or rosin-based)
- [ ] Fine solder wire (0.3mm–0.6mm diameter)
- [ ] Desoldering wick and/or solder pump

## ESD Protection ✓

- [ ] Anti-static bench mat (grounded)
- [ ] ESD wrist strap (grounded)
- [ ] ESD-safe tweezers
- [ ] ESD-safe tool handles

## Measurement & Diagnostics ✓

- [ ] Digital multimeter with fine probes
- [ ] Optional: bench power supply for controlled voltage testing
- [ ] Optional: USB oscilloscope

## Cleaning ✓

- [ ] Isopropyl alcohol (99% purity)
- [ ] Anti-static PCB cleaning brush
- [ ] Lint-free swabs and wipes
- [ ] Cotton swabs

## Physical Tools ✓

- [ ] Precision tweezers (multiple profiles: straight, curved, angled)
- [ ] PCB holder / repair clamp
- [ ] Fine-tip probes for multimeter

## Documentation (Optional but Recommended) ✓

- [ ] Microscope camera or webcam for recording
- [ ] Monitor for live viewing via camera
- [ ] Lighting for documentation quality

## Consumables to Keep Stocked ✓

- [ ] Flux (refill when low)
- [ ] Solder wire
- [ ] Desoldering wick
- [ ] IPA
- [ ] Swabs and wipes

## Notes

- Start with quality magnification and soldering equipment before other items.
- ESD protection is often overlooked but is critical for protecting sensitive components.
- Build your toolkit progressively based on the specific repairs you take on.

Browse related products: [Microscopes](/categories/microscopes) | [Soldering Tools](/categories/soldering-tools) | [Accessories](/categories/accessories)
    `,
  },
  "understanding-microscope-magnification": {
    title: "Understanding Microscope Magnification for Repair Work",
    excerpt: "What does 7x–45x mean? How to choose the right magnification range for your specific repair applications.",
    category: "Buying Guides",
    readTime: "5 min read",
    emoji: "🔍",
    relatedSlugs: ["microscopes"],
    content: `
## Understanding Microscope Magnification

When shopping for a repair microscope, magnification ranges like "7x–45x" appear frequently. Here's what these numbers mean and how to choose the right range.

## What Magnification Numbers Mean

Magnification refers to how many times larger an object appears through the lens compared to the naked eye.

- **7x:** An object appears 7 times larger than normal
- **45x:** An object appears 45 times larger than normal
- **7x–45x:** A zoom microscope that can adjust between these extremes

## The Trade-offs of High Magnification

Higher magnification:
- Provides more detail
- **Reduces field of view** (you see a smaller area)
- **Reduces working distance** (lens gets closer to the work)
- Makes depth of field shallower (focus range narrows)

This is why balance matters more than maximum magnification.

## Practical Ranges for Repair Work

| Magnification | Use Case |
|---|---|
| 7x–15x | General inspection, overview, finding components |
| 15x–30x | Soldering, joint inspection, component placement |
| 30x–45x | Fine inspection, micro-cracks, very small pads |

For most mobile phone repair and microsoldering: **7x–45x covers virtually everything.**

## Zoom vs Fixed Magnification

- **Zoom microscope:** Variable magnification, most practical for repair work
- **Fixed magnification:** Single zoom level, less flexible but potentially sharper

For repair use, zoom is almost always preferred.

## What to Choose

For professional mobile repair and microsoldering:
- **Minimum:** 7x–40x zoom range
- **Recommended:** 7x–45x zoom range
- **Working distance:** 100mm or more at all zoom levels
- **Lighting:** Consistent at all zoom levels

Browse our [microscopes range](/categories/microscopes) to compare specifications.
    `,
  },
  "soldering-tips-guide": {
    title: "Soldering Tips: Types and When to Use Them",
    excerpt: "An overview of common soldering tip profiles and their applications in mobile and PCB repair.",
    category: "Tool Guides",
    readTime: "4 min read",
    emoji: "⚡",
    relatedSlugs: ["soldering-tools"],
    content: `
## Soldering Tips — Types and Applications

The soldering tip you use significantly affects your ability to transfer heat efficiently and make clean solder joints. Here's an overview of common tip types.

## Tip Types

### Conical Tips

- **Shape:** Pointed, tapered
- **Use:** Fine point work, SMD components, through-hole work
- **Pros:** Precise placement, access to tight spaces
- **Cons:** Less heat transfer than flat tips for larger joints

Recommended for: microsoldering, small SMD pads, board-level repair

### Chisel/Flat Tips

- **Shape:** Flat, beveled end
- **Use:** General purpose, through-hole, drag soldering
- **Pros:** Good heat transfer, versatile
- **Cons:** Less precise for very small work

Recommended for: general repair, through-hole components, connector soldering

### Knife Tips

- **Shape:** Angled edge, like a blade
- **Use:** Drag soldering, IC leads, bridge correction
- **Pros:** Excellent for drag soldering rows of pads
- **Cons:** Not suitable for fine point work

Recommended for: chip soldering, IC replacements, SMD rows

### Curved/Bent Tips

- **Shape:** Angled to access otherwise hard-to-reach areas
- **Use:** Specific access situations
- **Pros:** Specialized access
- **Cons:** Limited general use

## Temperature Settings

Temperature depends on:
- Solder type (lead-free requires higher temperatures)
- Component sensitivity (lower temperature for heat-sensitive parts)
- Tip size (smaller tips may need slightly higher temperature)

General guidelines:
- Lead solder: 300°C–350°C
- Lead-free solder: 350°C–400°C
- Sensitive components: Use minimum effective temperature

## Tip Care

- Tin the tip before and after each use
- Clean with wet sponge or brass wool during use
- Store tinned tips to prevent oxidation
- Replace tips when they become pitted or oxidized

Browse [soldering tools](/categories/soldering-tools) for our current range.
    `,
  },
};

interface LearnArticleProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LearnArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!.trim();
    if (!line) {
      elements.push(<div key={key++} className="h-3" />);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="text-xl font-bold text-[#0A0A0A] mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="text-base font-bold text-[#0A0A0A] mt-5 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith("- [ ] ")) {
      elements.push(
        <div key={key++} className="flex items-center gap-2 py-1 text-sm text-[#3D3D3D]">
          <div className="w-4 h-4 border-2 border-[#E5E5E5] rounded-[3px] flex-shrink-0" />
          {line.slice(6)}
        </div>
      );
    } else if (line.startsWith("- **") || line.startsWith("- ")) {
      const text = line.slice(2);
      elements.push(
        <div key={key++} className="flex items-start gap-2 py-1 text-sm text-[#3D3D3D]">
          <div className="w-1.5 h-1.5 bg-[#E65C00] rounded-full mt-1.5 flex-shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#E65C00] underline">$1</a>') }} />
        </div>
      );
    } else if (line.startsWith("|")) {
      // Skip table lines (simplified)
    } else if (line.startsWith("#")) {
      elements.push(<h1 key={key++} className="text-2xl font-black text-[#0A0A0A] mb-4">{line.replace(/^#+\s/, "")}</h1>);
    } else {
      elements.push(
        <p key={key++} className="text-sm text-[#3D3D3D] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#E65C00] underline">$1</a>') }}
        />
      );
    }
  }

  return elements;
}

export default async function LearnArticlePage({ params }: LearnArticleProps) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const relatedProducts = demoProducts.filter((p) =>
    article.relatedSlugs.some((s) => p.category?.slug === s)
  ).slice(0, 4);

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-[#0A0A0A]">Learn</Link>
            <span>/</span>
            <span className="text-[#0A0A0A] truncate max-w-[200px]">{article.title}</span>
          </nav>
          <Badge variant="outline" className="mb-3">{article.category}</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight leading-tight max-w-2xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 mt-3 text-xs text-[#9E9E9E]">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
            <span>Bariq Electronics</span>
          </div>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 bg-white border border-[#E5E5E5] rounded-[12px] p-6 sm:p-8">
            <p className="text-base text-[#3D3D3D] leading-relaxed mb-6 font-medium border-b border-[#E5E5E5] pb-6">
              {article.excerpt}
            </p>
            <div className="space-y-1">
              {renderContent(article.content)}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-4">
            <Link href="/learn" className="flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#E65C00] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to guides
            </Link>

            {relatedProducts.length > 0 && (
              <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-4">
                <h3 className="font-bold text-[#0A0A0A] text-sm mb-3">Related Products</h3>
                <div className="space-y-2">
                  {relatedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className="block text-sm text-[#6B6B6B] hover:text-[#E65C00] transition-colors py-1 border-b border-[#F0F0F0] last:border-0"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#0A0A0A] rounded-[10px] p-5 text-center">
              <p className="text-sm text-white font-semibold mb-2">Need help choosing?</p>
              <p className="text-xs text-[#9E9E9E] mb-4">Our team can help you select the right equipment.</p>
              <Link href="/contact" className="inline-block bg-[#E65C00] text-white text-xs font-bold px-4 py-2 rounded-[5px] hover:bg-[#CC5000] transition-colors">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
