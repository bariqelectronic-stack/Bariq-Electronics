import type { Product } from "@/types";

/**
 * Category-level buying guidance and SEO copy for product pages.
 *
 * Most live listings have only a name and an image, so this copy describes what
 * a product TYPE is and what a buyer should verify. It must never assert the
 * specifications, capabilities, price, stock or ratings of an individual listing:
 * those come from the product record alone.
 */
export interface ProductSeoGuidance {
  seoTitle: string;
  metaDescription: string;
  /** Null when the slug does not map to a known category; breadcrumbs then omit the level. */
  categoryName: string | null;
  categorySlug: string | null;
  overview: string;
  checklist: string[];
  faqs: { q: string; a: string }[];
  relatedLinks: { label: string; href: string }[];
  relatedProductLinks: { name: string; slug: string; categoryName: string }[];
}

type GuidanceInput = Pick<Product, "slug" | "name" | "sku" | "shortDescription" | "description" | "category">;

const DEMO_DESCRIPTION_PREFIX = "This is a demo product.";

/** Prefers the owner's own copy, skipping the demo placeholder text. */
export function getProductSeoDescription(
  product: Pick<Product, "shortDescription" | "description">,
  guidance: Pick<ProductSeoGuidance, "metaDescription">,
): string {
  const description = product.description?.startsWith(DEMO_DESCRIPTION_PREFIX) ? null : product.description;
  return product.shortDescription || description || guidance.metaDescription;
}

export function getProductSeoGuidance(product: GuidanceInput): ProductSeoGuidance {
  const guidance = buildGuidance(product);
  // Many listings share one name, so the SKU is the only honest differentiator when it exists.
  return product.sku ? { ...guidance, seoTitle: `${guidance.seoTitle} (${product.sku})` } : guidance;
}

function buildGuidance(product: GuidanceInput): ProductSeoGuidance {
  const slug = product.slug.toLowerCase();

  // 1. LVDS cables (/products/lvds, /products/4k-lvds, /products/lvds-1)
  if (slug === "lvds" || slug === "4k-lvds" || slug.startsWith("lvds-")) {
    return {
      seoTitle: `${product.name} Cable for LCD & LED Display Repair`,
      metaDescription:
        "LVDS display cable from Bariq Electronics for LCD and LED repair work. Check pin count, connector style, pin-1 orientation and cable length before ordering.",
      categoryName: "LVDS",
      categorySlug: "lvds",
      overview:
        "LVDS (Low-Voltage Differential Signaling) cables carry differential video and clock signals between the display main board, T-CON (Timing Controller) board, and compatible LCD or LED panels. Choosing a replacement means matching the connector housing, pin count, pin-1 power/ground assignment, channel configuration, and working length for your specific panel and board models.",
      checklist: [
        "Match the original LVDS cable part number along with the exact display panel and main board/T-CON model numbers",
        "Count the pins and inspect the connector housing shape and locking mechanism at both ends of the cable",
        "Verify single-channel vs dual-channel or 4K signal lane layout and confirm pin-1 (VCC/power and ground) orientation",
        "Confirm the required cable length so it reaches cleanly without tension or excess folding inside the chassis",
      ],
      faqs: [
        {
          q: "How do I identify a compatible LVDS cable?",
          a: "Check the exact panel model number and main board/T-CON part numbers first, then verify the pin count, connector body style at both ends, pin-1 power orientation, and cable length. Matching pin counts alone do not guarantee identical wiring.",
        },
        {
          q: "How can I confirm LVDS compatibility before ordering?",
          a: "Share your display panel model number, board model number, or a clear photo of the existing LVDS connector with Bariq Electronics on WhatsApp (03009445230) or via our Contact page before ordering.",
        },
      ],
      relatedLinks: [
        { label: "LVDS Cable Guide: Connectors, Pinouts & Compatibility", href: "/learn/understanding-lvds-cables" },
        { label: "Browse All LVDS Products", href: "/categories/lvds" },
        { label: "How to Choose the Right T-CON Board", href: "/learn/how-to-choose-t-con-board" },
        { label: "LCD Panel Repair Solutions", href: "/solutions/lcd-panel-repair" },
      ],
      relatedProductLinks: [
        ...(slug !== "lvds" ? [{ name: "LVDS", slug: "lvds", categoryName: "LVDS" }] : []),
        ...(slug !== "4k-lvds" ? [{ name: "4K LVDS", slug: "4k-lvds", categoryName: "LVDS" }] : []),
        { name: "T-CON", slug: "t-con", categoryName: "T-CON" },
      ],
    };
  }

  // 2. ACF remover (/products/acf-remover)
  if (slug.startsWith("acf-remover")) {
    return {
      seoTitle: "ACF Remover for LCD & LED Panel Repair",
      metaDescription:
        "ACF remover from Bariq Electronics for LCD and LED panel repair, used to clean old ACF adhesive residue from bonding areas before COF re-bonding.",
      categoryName: "ACF REMOVER",
      categorySlug: "acf-remover",
      overview:
        "During COF (Chip-on-Film) replacement, old or cured Anisotropic Conductive Film (ACF) adhesive left on the glass ITO traces or source PCB pads can prevent proper electrical contact when new ACF tape is applied. ACF remover is used to soften cured residue so the bonding surface can be cleaned before re-bonding, reducing the need for mechanical scraping near delicate traces.",
      checklist: [
        "Read the product label and safety instructions, and check suitability for your panel glass, ITO traces, and nearby polariser layers",
        "Apply in controlled amounts using clean, lint-free swabs or wipes suitable for panel-level work",
        "Remove all softened adhesive residue completely before placing new ACF conductive tape",
        "Allow the cleaned bonding area to dry fully before applying new ACF tape and bonding",
      ],
      faqs: [
        {
          q: "What is ACF remover used for?",
          a: "ACF remover is used to soften and remove hardened Anisotropic Conductive Film (ACF) adhesive residue from display panel glass and PCB bonding areas before applying fresh ACF tape and bonding a COF component.",
        },
        {
          q: "Is ACF remover the same as ACF remover solution?",
          a: "Both phrases are generally used for liquid cleaners that soften old ACF adhesive during panel preparation, but formulations vary, so check the product label. Message Bariq Electronics on WhatsApp (03009445230) to confirm whether our ACF Remover suits your repair.",
        },
      ],
      relatedLinks: [
        { label: "ACF Remover Category", href: "/categories/acf-remover" },
        { label: "Essential Parts for COF & ACF Repair Guide", href: "/learn/essential-parts-cof-acf-repair" },
        { label: "ACF Tape Application Guide", href: "/learn/acf-tape-application-guide" },
        { label: "COF & ACF Repair Solutions", href: "/solutions/cof-acf-repair" },
      ],
      relatedProductLinks: [
        { name: "ACF Tape", slug: "acf-tape", categoryName: "ACF TAPE" },
        { name: "ACF Tape (7813)", slug: "acf-tape-7813", categoryName: "ACF TAPE" },
        { name: "COF Cutter", slug: "cof-cutter", categoryName: "COF CUTTER" },
        { name: "COFS", slug: "cofs", categoryName: "COFS" },
      ],
    };
  }

  // 3. ACF tape (/products/acf-tape, /products/acf-tape-7813)
  if (slug.startsWith("acf-tape")) {
    const is7813 = slug.includes("7813");
    return {
      seoTitle: is7813 ? "ACF Tape (7813) for LCD & LED Panel Bonding" : "ACF Tape for LCD & LED Panel Bonding",
      metaDescription: is7813
        ? "ACF Tape (7813) from Bariq Electronics for LCD and LED panel COF bonding. Check tape width, thickness, substrate and storage requirements before ordering."
        : "Anisotropic Conductive Film (ACF) tape from Bariq Electronics for bonding COF components to LCD and LED panel substrates and source PCBs.",
      categoryName: "ACF TAPE",
      categorySlug: "acf-tape",
      overview:
        "ACF (Anisotropic Conductive Film) tape provides adhesive bonding and directional electrical conductivity between Chip-on-Film (COF) driver tabs and display panel glass substrates or source PCBs. Choosing the right tape means checking tape width, film thickness, the bonding surface (glass or PCB), and the bonding temperature and pressure the tape requires.",
      checklist: [
        "Verify the required tape width and thickness for your COF bonding pad area",
        "Confirm whether your bonding step is COF-to-glass or COF-to-PCB and select a tape specified for it",
        "Clean all old adhesive residue thoroughly using ACF remover before placing new tape",
        "Follow the tape manufacturer's storage and handling guidance; ACF tape is typically stored refrigerated",
      ],
      faqs: [
        {
          q: "What should I check before ordering ACF tape?",
          a: "Measure the width of the bonding area, check whether the application is glass-side or PCB-side bonding, and confirm compatibility with your bonding head assembly temperature and pressure settings.",
        },
        {
          q: "How should surface preparation be performed before applying ACF tape?",
          a: "Remove all cured adhesive residue using ACF remover, clean the pad area with lint-free swabs, and let the surface dry completely before placing the tape.",
        },
      ],
      relatedLinks: [
        { label: "ACF Tape Application Guide for Panel Repair", href: "/learn/acf-tape-application-guide" },
        { label: "Essential Parts for COF & ACF Repair", href: "/learn/essential-parts-cof-acf-repair" },
        { label: "ACF Tape Category", href: "/categories/acf-tape" },
        { label: "COF & ACF Repair Solutions", href: "/solutions/cof-acf-repair" },
      ],
      relatedProductLinks: [
        ...(slug !== "acf-tape" ? [{ name: "ACF Tape", slug: "acf-tape", categoryName: "ACF TAPE" }] : []),
        ...(slug !== "acf-tape-7813" ? [{ name: "ACF Tape (7813)", slug: "acf-tape-7813", categoryName: "ACF TAPE" }] : []),
        { name: "ACF Remover", slug: "acf-remover", categoryName: "ACF REMOVER" },
        { name: "COFS", slug: "cofs", categoryName: "COFS" },
      ],
    };
  }

  // 4. COF cutter (/products/cof-cutter)
  if (slug.includes("cof-cutter")) {
    return {
      seoTitle: "COF Cutter for LCD & LED Panel Repair",
      metaDescription:
        "COF cutter from Bariq Electronics, used for trimming and preparing Chip-on-Film (COF) tabs during LCD and LED display panel bonding and repair.",
      categoryName: "COF CUTTER",
      categorySlug: "cof-cutter",
      overview:
        "During COF replacement and panel bonding, technicians need clean, accurate cuts on delicate Chip-on-Film flex tabs without deforming fine-pitch conductive traces. A dedicated COF cutter helps with edge quality and alignment before ACF tape placement and bonding.",
      checklist: [
        "Confirm the cutter configuration and blade profile match the COF tab dimensions used on your bench",
        "Inspect blade sharpness and alignment regularly to avoid burrs or torn flex edges",
        "Use on a stable, ESD-safe work surface during panel and COF preparation",
      ],
      faqs: [
        {
          q: "What should I check before purchasing a COF cutter?",
          a: "Check that the blade geometry, cutting width, and handling control match the COF packages you service in your workshop so tabs can be trimmed cleanly without damaging fine-pitch traces.",
        },
      ],
      relatedLinks: [
        { label: "Essential Parts for COF & ACF Repair", href: "/learn/essential-parts-cof-acf-repair" },
        { label: "COF Cutters Category", href: "/categories/cof-cutter" },
        { label: "COFS Category", href: "/categories/cofs" },
        { label: "COF & ACF Repair Solutions", href: "/solutions/cof-acf-repair" },
      ],
      relatedProductLinks: [
        { name: "COFS", slug: "cofs", categoryName: "COFS" },
        { name: "ACF Tape", slug: "acf-tape", categoryName: "ACF TAPE" },
        { name: "ACF Remover", slug: "acf-remover", categoryName: "ACF REMOVER" },
        { name: "HEAD 68mm, 50mm, X1.2/1.4", slug: "head-68mm-50mm-x1214", categoryName: "HEAD ASSEMBLY" },
      ],
    };
  }

  // 5. COFS (/products/cofs)
  if (slug === "cofs" || slug.startsWith("cof-")) {
    return {
      seoTitle: "COFS (Chip-on-Film) for LCD & LED Panel Repair",
      metaDescription:
        "COF (Chip-on-Film) components from Bariq Electronics for LCD and LED panel bonding and repair. Match the part number printed on the original COF before ordering.",
      categoryName: "COFS",
      categorySlug: "cofs",
      overview:
        "COF (Chip-on-Film) packages mount display source or gate driver ICs on a flexible film carrier bonded between the panel glass and source PCB. Vertical lines, missing bands, or corroded flex tabs can point to a faulty COF. Replacement typically involves a part with the matching number, ACF tape, and a bonding machine; the outcome depends on the fault and the panel.",
      checklist: [
        "Match the exact COF IC part number printed on the original flex tab",
        "Verify compatibility with the target LCD or LED panel model number",
        "Prepare the bonding pads using ACF remover and the correct width of ACF tape",
      ],
      faqs: [
        {
          q: "How do I confirm COF part compatibility?",
          a: "Read the exact alphanumeric code printed on the original COF tab and the panel model sticker, then share both with Bariq Electronics on WhatsApp (03009445230) to check availability and compatibility.",
        },
      ],
      relatedLinks: [
        { label: "Essential Parts for COF & ACF Repair", href: "/learn/essential-parts-cof-acf-repair" },
        { label: "ACF Tape Application Guide", href: "/learn/acf-tape-application-guide" },
        { label: "COFS Category", href: "/categories/cofs" },
      ],
      relatedProductLinks: [
        { name: "ACF Tape", slug: "acf-tape", categoryName: "ACF TAPE" },
        { name: "ACF Remover", slug: "acf-remover", categoryName: "ACF REMOVER" },
        { name: "COF Cutter", slug: "cof-cutter", categoryName: "COF CUTTER" },
        { name: "HEAD 68mm, 50mm, X1.2/1.4", slug: "head-68mm-50mm-x1214", categoryName: "HEAD ASSEMBLY" },
      ],
    };
  }

  // 6. T-CON programmer (/products/t-con-programmer)
  if (slug.startsWith("t-con-programmer")) {
    return {
      seoTitle: "T-CON Programmer for LCD & LED Board Repair",
      metaDescription:
        "T-CON programmer from Bariq Electronics for LCD and LED board repair work. Confirm supported boards, memory chips and connection type before ordering.",
      categoryName: "T-CON PROGRAMMER",
      categorySlug: "t-con-programmer",
      overview:
        "T-CON programmers are used by display repair technicians to read, back up, and write firmware on compatible Timing Controller (T-CON) boards, for example when firmware is corrupted or a replacement board must be configured for a panel. Supported boards and memory chips differ between programmers, so confirm support for your board before ordering.",
      checklist: [
        "Confirm that the programmer hardware and software support the target T-CON board family and memory chip types",
        "Check the required connection interfaces (such as ISP header cables or IC clip adapters)",
        "Always save a verified backup of the original board firmware before erasing or flashing",
      ],
      faqs: [
        {
          q: "When is a T-CON programmer needed in display repair?",
          a: "A T-CON programmer is typically used when a T-CON board has corrupted firmware, when a replacement board must be configured for a specific panel revision, or when backing up working firmware during board-level diagnostics.",
        },
      ],
      relatedLinks: [
        { label: "T-CON Programming: A Complete Guide for Display Repair", href: "/learn/t-con-programming-guide" },
        { label: "How to Choose the Right T-CON Board", href: "/learn/how-to-choose-t-con-board" },
        { label: "T-CON Programmers Category", href: "/categories/t-con-programmer" },
      ],
      relatedProductLinks: [
        { name: "T-CON", slug: "t-con", categoryName: "T-CON" },
        { name: "LVDS", slug: "lvds", categoryName: "LVDS" },
        { name: "SCALAR", slug: "scalar", categoryName: "SCALLER" },
      ],
    };
  }

  // 7. T-CON boards (/products/t-con, /products/t-con-1..4)
  if (slug === "t-con" || slug.startsWith("t-con-")) {
    return {
      seoTitle: `${product.name} Board for LCD & LED Display Repair`,
      metaDescription:
        "T-CON (Timing Controller) board from Bariq Electronics for LCD and LED display repair. Match the board part number, panel model and connector layout before ordering.",
      categoryName: "T-CON",
      categorySlug: "t-con",
      overview:
        "The T-CON (Timing Controller) board converts video signals from the main board into the row and column timing signals required by the LCD or LED panel. Choosing a compatible replacement means matching the exact board part number, panel model number, LVDS input connector, and panel ribbon outputs.",
      checklist: [
        "Locate and match the full model/part number printed directly on the original T-CON board",
        "Verify compatibility with the exact LCD or LED panel model number, screen size, and resolution",
        "Inspect the LVDS input connector position and output FFC/ribbon pin counts",
      ],
      faqs: [
        {
          q: "How do I choose a compatible T-CON board?",
          a: "Always match the full part number printed on the original T-CON board and verify your display panel model number and connector configuration before ordering.",
        },
      ],
      relatedLinks: [
        { label: "How to Choose the Right T-CON Board", href: "/learn/how-to-choose-t-con-board" },
        { label: "T-CON Programming Guide", href: "/learn/t-con-programming-guide" },
        { label: "T-CON Category", href: "/categories/t-con" },
        { label: "Display Board Repair Solutions", href: "/solutions/display-board-repair" },
      ],
      relatedProductLinks: [
        ...(slug !== "t-con" ? [{ name: "T-CON", slug: "t-con", categoryName: "T-CON" }] : []),
        { name: "T-CON Programmer", slug: "t-con-programmer", categoryName: "T-CON PROGRAMMER" },
        { name: "LVDS", slug: "lvds", categoryName: "LVDS" },
      ],
    };
  }

  // 8. Head assembly (/products/head-68mm-50mm-x1214)
  if (slug.startsWith("head-")) {
    return {
      seoTitle: `${product.name} — Head Assembly`,
      metaDescription:
        `${product.name} head assembly from Bariq Electronics for display repair and COF bonding workflows. Confirm the dimensions and fit for your machine before ordering.`,
      categoryName: "HEAD ASSEMBLY",
      categorySlug: "head-assembly",
      overview:
        "Head assemblies are used on bonding equipment to apply heat and pressure across the COF tab and ACF tape during display panel bonding. The right head depends on your bonding machine and the width of the COF being serviced.",
      checklist: [
        "Verify the required head width and profile against your bonding machine specifications",
        "Confirm mounting and heating compatibility with your machine",
        "Inspect head flatness and use appropriate protective tape during bonding",
      ],
      faqs: [
        {
          q: "What should I check before ordering a head assembly?",
          a: "Check your bonding machine model and compare it with the dimensions listed for the head, then message Bariq Electronics on WhatsApp (03009445230) if you need to confirm the fit.",
        },
      ],
      relatedLinks: [
        { label: "Essential Parts for COF & ACF Repair", href: "/learn/essential-parts-cof-acf-repair" },
        { label: "Head Assembly Category", href: "/categories/head-assembly" },
        { label: "COF & ACF Repair Solutions", href: "/solutions/cof-acf-repair" },
      ],
      relatedProductLinks: [
        { name: "COFS", slug: "cofs", categoryName: "COFS" },
        { name: "ACF Tape", slug: "acf-tape", categoryName: "ACF TAPE" },
        { name: "Taflon Tape", slug: "taflon-tape", categoryName: "TAPE" },
      ],
    };
  }

  // 9. Repair tapes (/products/taflon-tape, /products/cotton-tape)
  if (slug === "taflon-tape" || slug === "cotton-tape") {
    const isTeflon = slug === "taflon-tape";
    return {
      seoTitle: isTeflon ? "Taflon (Teflon) Tape for Display Panel Repair" : "Cotton Tape for LCD & LED Display Repair",
      metaDescription: isTeflon
        ? "Taflon (Teflon) tape from Bariq Electronics for LCD and LED display repair and COF bonding work. Check the width and temperature rating before ordering."
        : "Cotton tape from Bariq Electronics for LCD and LED display and electronics repair work. Check the width and intended use before ordering.",
      categoryName: "TAPE",
      categorySlug: "tape",
      overview:
        "Repair tapes are chosen by adhesion, thickness, temperature resistance, and intended use. Teflon (PTFE) tapes are commonly used around heated bonding work, while cotton tapes are commonly used for general workshop tasks such as securing wiring. Check the listed details or ask us to confirm suitability for your repair.",
      checklist: [
        "Check required tape width and thickness for your repair application",
        "Verify temperature resistance when working near heating elements or bonding heads",
      ],
      faqs: [],
      relatedLinks: [
        { label: "Tape Category", href: "/categories/tape" },
        { label: "Essential Parts for COF & ACF Repair", href: "/learn/essential-parts-cof-acf-repair" },
      ],
      relatedProductLinks: [
        { name: isTeflon ? "Cotton Tape" : "Taflon Tape", slug: isTeflon ? "cotton-tape" : "taflon-tape", categoryName: "TAPE" },
        { name: "ACF Tape", slug: "acf-tape", categoryName: "ACF TAPE" },
        { name: "Foam", slug: "foam", categoryName: "FOAM" },
      ],
    };
  }

  // 10. Ink category (/products/blue-ink-bonding-bonds-imported, /products/g-450)
  if (slug === "blue-ink-bonding-bonds-imported" || slug === "g-450") {
    return {
      seoTitle: `${product.name} — Display Repair`,
      metaDescription:
        `${product.name} from Bariq Electronics, listed for LCD and LED display repair. Contact us on WhatsApp to confirm its details and suitability for your repair.`,
      categoryName: "INK",
      categorySlug: "ink",
      overview:
        `${product.name} is listed in the Bariq Electronics ink category for display repair work. Contact us to confirm its details and whether it suits your panel and repair process.`,
      checklist: [
        "Verify the curing method and compatibility with the target panel and COF substrate",
        "Ensure the repair area is clean and dry before application",
      ],
      faqs: [],
      relatedLinks: [
        { label: "Ink Category", href: "/categories/ink" },
        { label: "Essential Parts for COF & ACF Repair", href: "/learn/essential-parts-cof-acf-repair" },
        { label: "COF & ACF Repair Solutions", href: "/solutions/cof-acf-repair" },
      ],
      relatedProductLinks: [
        { name: "COFS", slug: "cofs", categoryName: "COFS" },
        { name: "ACF Tape", slug: "acf-tape", categoryName: "ACF TAPE" },
        { name: "ACF Remover", slug: "acf-remover", categoryName: "ACF REMOVER" },
      ],
    };
  }

  // 11. Main boards, scaler boards, QUARD, panels, foam
  if (slug.includes("main-board") || slug.startsWith("scalar") || slug === "quard" || slug.startsWith("panel") || slug === "foam") {
    const isBoard = slug.includes("main-board") || slug.startsWith("scalar");
    const [catSlug, catName] = slug.startsWith("scalar")
      ? ["scaller", "SCALLER"]
      : slug === "quard"
        ? ["quard", "QUARD"]
        : slug === "foam"
          ? ["foam", "FOAM"]
          : slug.startsWith("panel")
            ? ["panel", "PANEL"]
            : ["led-lcd-boards", "LED & LCD BOARDS"];

    return {
      seoTitle: `${product.name} for LCD & LED Display Repair`,
      metaDescription:
        `${product.name} from Bariq Electronics for LCD and LED display repair. Contact us with your board and panel model numbers to verify compatibility before ordering.`,
      categoryName: catName,
      categorySlug: catSlug,
      overview: isBoard
        ? `${product.name} is listed for LCD and LED television and display board servicing. Before ordering a replacement, confirm the board part number, target panel model number, LVDS/signal connector layout, and power requirements.`
        : `${product.name} is listed for LCD and LED display repair and workshop servicing. Contact Bariq Electronics with your panel model and repair requirements to confirm suitability.`,
      checklist: [
        "Check the exact board or panel model number before ordering",
        ...(isBoard ? ["Verify connector layout, signal interface (e.g., LVDS pinout), and voltage specifications"] : []),
        "Contact Bariq Electronics on WhatsApp (03009445230) with photos or part numbers to confirm compatibility",
      ],
      faqs: [],
      relatedLinks: [
        { label: `Browse ${catName}`, href: `/categories/${catSlug}` },
        { label: "Display Board Repair Solutions", href: "/solutions/display-board-repair" },
        { label: "Professional Display Repair Bench Setup", href: "/learn/lcd-led-display-repair-bench-setup" },
      ],
      relatedProductLinks: [
        { name: "LVDS", slug: "lvds", categoryName: "LVDS" },
        { name: "T-CON", slug: "t-con", categoryName: "T-CON" },
        { name: "T-CON Programmer", slug: "t-con-programmer", categoryName: "T-CON PROGRAMMER" },
      ],
    };
  }

  // Fallback for any product added later under a slug not mapped above
  return {
    seoTitle: `${product.name} — LCD & LED Display Repair Parts`,
    metaDescription:
      `${product.name} from Bariq Electronics for LCD and LED display repair. Contact us on WhatsApp to confirm compatibility with your panel or board model.`,
    categoryName: product.category?.name ?? null,
    categorySlug: product.category?.slug ?? null,
    overview:
      `${product.name} is part of the Bariq Electronics catalog of LCD and LED display repair parts and workshop tools. Contact our team on WhatsApp or via our Contact page to verify compatibility with your panel or board model.`,
    checklist: [
      "Confirm compatibility with your target display panel or board model before ordering",
      "Share part numbers or connector photos via WhatsApp (03009445230) for technical verification",
    ],
    faqs: [],
    relatedLinks: [
      { label: "Browse All Categories", href: "/categories" },
      { label: "Display Repair Guides", href: "/learn" },
    ],
    relatedProductLinks: [
      { name: "LVDS", slug: "lvds", categoryName: "LVDS" },
      { name: "ACF Remover", slug: "acf-remover", categoryName: "ACF REMOVER" },
      { name: "COF Cutter", slug: "cof-cutter", categoryName: "COF CUTTER" },
      { name: "T-CON", slug: "t-con", categoryName: "T-CON" },
    ],
  };
}
