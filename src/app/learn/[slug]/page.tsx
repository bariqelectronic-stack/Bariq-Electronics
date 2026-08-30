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
  "how-to-choose-t-con-board": {
    title: "How to Choose the Right T-CON Board for LCD & LED Repair",
    excerpt: "A practical guide to selecting the correct T-CON board for your display repair — covering compatibility, connector configuration and panel specifications.",
    category: "Buying Guides",
    readTime: "6 min read",
    emoji: "🔲",
    relatedSlugs: ["t-con"],
    content: `
## Why T-CON Board Selection Matters

The T-CON (Timing Controller) board manages signal communication between the main board and the LCD/LED panel. Selecting the wrong T-CON board can result in display failure, missing image, or signal errors even after installation.

## Key Factors to Consider

### 1. Board Model Number

Every T-CON board has a specific model number printed on the board itself. This is the most reliable way to find a compatible replacement:

- Locate the model number directly on the original T-CON board
- Search using the exact model number to find a match
- Partial model numbers may return incorrect results — use the full string

### 2. Panel Compatibility

T-CON boards are designed for specific panel types and sizes:

- **Panel size:** Verify the board is rated for the correct screen size
- **Resolution:** Confirm the board supports the panel resolution
- **Panel model:** Where possible, match by panel model number

### 3. Connector Configuration

Before ordering a replacement, check the connector layout on the original board:

- Count and verify LVDS connector positions
- Check ribbon connector pin counts
- Confirm connector direction and spacing match

### 4. Signal Requirements

Different panels use different signal specifications:

- **LVDS signals:** Single-channel vs dual-channel
- **Signal voltage:** Verify compatible operating voltage
- **Refresh rate support:** Confirm the board supports the required rate

### 5. Build Quality

For professional repair use:

- Look for boards from established manufacturers
- Avoid boards with visible component damage or poor soldering
- Test-before-ship where possible

## Common T-CON Symptoms to Diagnose

Before replacing a T-CON board, confirm the board is actually faulty:

- Vertical or horizontal lines on display
- Half-screen image
- No image with backlight on
- Flickering or unstable image

## Browse T-CON Products

Visit our [T-CON category](/categories/t-con) to view available boards, or see [T-CON Programmers](/categories/t-con-programmer) for programming tools.
    `,
  },
  "lcd-led-display-repair-bench-setup": {
    title: "Professional LCD & LED Display Repair Bench Setup",
    excerpt: "What every professional display repair technician needs on their bench — from panel handling and board diagnostics to COF repair equipment.",
    category: "Repair Guides",
    readTime: "8 min read",
    emoji: "🖥️",
    relatedSlugs: ["led-lcd-boards", "t-con"],
    content: `
## Setting Up a Professional Display Repair Bench

A well-organised display repair bench helps you work efficiently, handle panels safely, and keep track of boards and components throughout the repair process.

## Panel Handling

Handling large LCD and LED panels requires care to avoid damage:

- Use a padded, clean surface for panel placement
- ESD-safe mat to protect sensitive display electronics
- Foam and cushioning materials for safe panel storage and transport
- Panel stands or holders where needed for upright work

## Board Diagnostics

Display board repair requires basic diagnostic capability:

- **LVDS connections:** Check signal continuity and connection quality
- **T-CON board inspection:** Inspect for visible component damage
- **LED & LCD board testing:** Verify board power and signal output
- **T-CON programmer:** For board flashing and diagnostics

## COF and ACF Repair Equipment

For technicians performing COF and ACF repair work:

- **COF cutters:** For precise cutting during panel preparation
- **ACF tape:** Selection of appropriate tape for the panel type
- **ACF remover:** For clean residue removal
- **Head assembly:** For bonding work

## Workspace Organisation

- Keep boards separated and labelled to avoid mixing
- Store ACF tape according to manufacturer requirements
- Organise LVDS cables by length and connector type
- Keep COF cutters maintained and sharp

## Summary

Start a professional display repair bench with:

1. Clean, padded work surface with ESD protection
2. Panel handling materials (foam, cushioning)
3. T-CON and LED/LCD board stock for common models
4. LVDS cable selection
5. COF and ACF repair materials

Browse our [full product range](/shop) to equip your repair bench.
    `,
  },
  "essential-parts-cof-acf-repair": {
    title: "Essential Parts for COF and ACF Repair",
    excerpt: "The core components and materials required for professional COF bonding, ACF tape application and ACF removal on LCD and LED display panels.",
    category: "Tool Guides",
    readTime: "5 min read",
    emoji: "✂️",
    relatedSlugs: ["cofs", "acf-tape", "acf-remover", "cof-cutter"],
    content: `
## COF and ACF Repair Essentials

COF (Chip on Film) and ACF (Anisotropic Conductive Film) repair is a specialised area of LCD and LED panel servicing. Having the correct materials and tools is critical for consistent, professional results.

## COF Products

### COF Components

COF components connect driver chips to the LCD panel substrate. When these fail or become damaged, accurate replacement or repair is required:

- Source COF components that match the original specification
- Verify compatibility with the panel before installation
- Handle carefully to avoid static damage

### COF Cutters

Precision cutting is required during COF preparation and panel work:

- **Blade sharpness:** A sharp, clean cut is essential
- **Cutting precision:** Select cutters appropriate for the panel and COF dimensions
- **Controlled cutting:** Avoid damage to adjacent panel areas

## ACF Tape

ACF tape creates the conductive bond between the COF and panel substrate. Selecting the right ACF tape is critical:

### Selection Factors

- **Tape width:** Must match the COF and panel connection area
- **Thickness:** Affects bonding pressure and connection quality
- **Adhesion type:** Check compatibility with the panel substrate
- **Storage:** ACF tape must be stored correctly — typically refrigerated — to maintain properties

## ACF Remover

Before applying new ACF tape, old or damaged ACF residue must be cleanly removed:

- **Removal method:** Chemical or mechanical, depending on the panel and residue type
- **Panel compatibility:** Ensure the remover is safe for the specific panel materials
- **Precision handling:** Avoid damage to panel substrate during removal
- **Thorough removal:** Residue left behind can affect new ACF bond quality

## Head Assembly

Bonding tools and head assemblies are used to apply heat and pressure during COF bonding:

- Match the head assembly to the bonding width required
- Verify temperature and pressure settings for the specific ACF tape

## Browse COF & ACF Products

- [COFS](/categories/cofs) — COF components and repair solutions
- [ACF Tape](/categories/acf-tape) — Tape for display panel bonding
- [ACF Remover](/categories/acf-remover) — Residue removal solutions
- [COF Cutters](/categories/cof-cutter) — Precision cutting tools
    `,
  },
  "understanding-lvds-cables": {
    title: "Understanding LVDS Cables and Display Connections",
    excerpt: "A guide to LVDS connectors, cable configurations and compatibility for LCD and LED display repair and board replacement work.",
    category: "Technical Guides",
    readTime: "4 min read",
    emoji: "🔗",
    relatedSlugs: ["lvds"],
    content: `
## What is LVDS?

LVDS (Low-Voltage Differential Signaling) is the standard interface used to carry display signals between the main board and the LCD/LED panel or T-CON board. Most LCD and LED televisions and monitors use LVDS connections.

## Why LVDS Selection Matters

An incorrect LVDS cable can result in:

- No image on display
- Partial image or half-screen
- Image noise or interference
- No signal detected by panel

## Key LVDS Specifications

### Connector Type

LVDS connectors vary by manufacturer and panel generation:

- Count the pins on both ends of the cable
- Verify the connector body style matches
- Check connector locking mechanism

### Pin Configuration

Pin arrangement must match exactly:

- Single-channel configurations (typically 20–30 pin)
- Dual-channel configurations (typically 30–51 pin)
- Verify pin 1 orientation and direction

### Cable Length

Select an appropriate cable length for your repair setup:

- Too short restricts panel positioning
- Too long creates cable management issues
- Match original cable length where possible

### Display Compatibility

Always verify compatibility:

- Check the main board connector and the T-CON or panel connector
- Some boards require specific LVDS cable configurations
- Refer to board documentation where available

## Troubleshooting LVDS Issues

Before replacing an LVDS cable, check:

- Connector seating on both ends
- Physical cable damage (kinks, cuts, crushing)
- Correct cable orientation

Browse our [LVDS category](/categories/lvds) for available cables and connections.
    `,
  },
  "t-con-programming-guide": {
    title: "T-CON Programming: A Complete Guide for Display Repair",
    excerpt: "How T-CON programmer tools work, which boards they support, and how to use them in professional LCD and LED display repair workflows.",
    category: "Technical Guides",
    readTime: "5 min read",
    emoji: "💾",
    relatedSlugs: ["t-con-programmer", "t-con"],
    content: `
## What is T-CON Programming?

T-CON (Timing Controller) boards sometimes require firmware programming or re-flashing to restore correct operation. A T-CON programmer is a dedicated tool that connects to the T-CON board and reads, erases, or writes firmware to the board's flash memory.

## When T-CON Programming is Required

Programming or re-flashing a T-CON board may be needed when:

- The board has corrupted firmware
- A replacement board requires configuration for the specific panel
- Board-level repair requires firmware restoration
- Upgrading or replacing flash memory chips

## How T-CON Programmers Work

T-CON programmer tools typically:

1. Connect to the T-CON board via a dedicated interface (ISP or direct flash connection)
2. Read the existing firmware from the board's flash chip
3. Allow backup, modification, or replacement of the firmware
4. Write the new or restored firmware back to the board

## Key Considerations

### Board Compatibility

Always verify the programmer supports your specific T-CON board model:

- Check the supported board list for the programmer
- Verify firmware files match the exact board revision
- Incorrect firmware can permanently damage the board

### Connection Method

Different programmers use different interfaces:

- Direct ISP programming via header pins
- Clip-on connections to flash memory chips
- Dedicated cable interfaces for specific board families

### Software

Most T-CON programmers include software for:

- Board identification
- Firmware reading and backup
- Firmware writing and verification

## Safety Precautions

- Always back up the original firmware before any changes
- Verify firmware compatibility before writing
- Use ESD precautions when handling T-CON boards

Browse [T-CON Programmers](/categories/t-con-programmer) and [T-CON Boards](/categories/t-con) in our product range.
    `,
  },
  "acf-tape-application-guide": {
    title: "ACF Tape Application Guide for Panel Repair",
    excerpt: "A step-by-step overview of ACF tape selection, handling and application for professional display panel bonding and COF repair.",
    category: "Repair Guides",
    readTime: "4 min read",
    emoji: "🎞️",
    relatedSlugs: ["acf-tape", "acf-remover"],
    content: `
## ACF Tape in Display Panel Repair

ACF (Anisotropic Conductive Film) tape is used in professional LCD and LED panel repair to create reliable conductive bonds between COF components and the panel substrate. Correct selection and application is essential for a lasting repair.

## Selecting the Right ACF Tape

### Width

The tape width must match the bonding area precisely:

- Measure the COF bonding area before ordering
- Tape that is too narrow may result in incomplete bonding
- Tape that is too wide must be trimmed, which adds risk

### Thickness

Tape thickness affects:

- Bond gap and pressure requirements
- Conductivity and connection quality
- Compatibility with specific bonding equipment

### Adhesion Properties

Different ACF tapes have different adhesion and conductivity properties:

- Verify the tape is compatible with the panel substrate material
- Check the bonding temperature range of the tape
- Confirm compatibility with your head assembly equipment

## Handling and Storage

ACF tape is sensitive to temperature and moisture:

- Store according to manufacturer instructions — typically refrigerated
- Allow tape to reach working temperature before use
- Handle with care to avoid contamination
- Do not touch the adhesive surface directly

## Application Process

### 1. Surface Preparation

Before applying ACF tape:

- Remove all old ACF residue using appropriate [ACF remover](/categories/acf-remover)
- Clean the bonding area thoroughly
- Allow the surface to dry completely

### 2. Tape Placement

- Cut the tape to the required length
- Position carefully on the bonding area
- Apply initial pressure to secure placement

### 3. Bonding

- Use appropriate head assembly at the correct temperature and pressure
- Follow tape manufacturer specifications for bonding parameters
- Allow adequate cooling time before handling

## After Bonding

- Inspect the bond visually under magnification
- Test display function before completing the repair
- Document the tape specification used for future reference

Browse [ACF Tape](/categories/acf-tape) and [ACF Remover](/categories/acf-remover) in our product range.
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
              <p className="text-xs text-[#9E9E9E] mb-4">Our team can help you select the right display repair parts.</p>
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

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}
