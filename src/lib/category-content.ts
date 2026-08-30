/**
 * Category feature section content.
 *
 * Each slug maps to the editorial content shown in the CategoryFeatureSection
 * on the category page. This file is the single source of copy/content;
 * the Supabase `categories` table remains the source of truth for which
 * categories *exist* and their display names.
 */

export type CategoryContent = {
  /** Eyebrow label shown above the headline (uppercase). */
  label: string;
  /** Non-accented part of the headline. */
  headlinePart1: string;
  /** Orange-accented part of the headline. */
  headlineAccent: string;
  /** Body description paragraph. */
  description: string;
  /** Four bullet points with title + detail. */
  bullets: { title: string; desc: string }[];
  /** Seven comparison factors shown in the right panel. */
  factors: { label: string; desc: string }[];
  /** CTA button label (uppercase). */
  ctaLabel: string;
};

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  cofs: {
    label: "COFS",
    headlinePart1: "Precision COF Repair Starts With ",
    headlineAccent: "the Right Tools.",
    description:
      "Professional COF repair requires precision, control and reliable equipment. Explore tools and products designed for COF bonding, cutting, handling and panel-level repair applications.",
    bullets: [
      {
        title: "COF Bonding & Repair",
        desc: "Support precision COF-related repair and bonding work on display panels.",
      },
      {
        title: "Panel-Level Precision",
        desc: "Designed for technicians working on delicate display connections and panel circuitry.",
      },
      {
        title: "Professional Repair Workflow",
        desc: "Improve accuracy and consistency across demanding COF repair procedures.",
      },
      {
        title: "Electronics Technician Use",
        desc: "Suitable for professional TV, LED and LCD repair workshops.",
      },
    ],
    factors: [
      { label: "Application", desc: "COF bonding, panel repair and display servicing" },
      { label: "Compatibility", desc: "Check compatibility with your panel and repair setup" },
      { label: "Precision", desc: "Evaluate control and accuracy for delicate COF work" },
      { label: "Working Method", desc: "Select products according to your repair process" },
      { label: "Technician Requirements", desc: "Choose equipment based on workshop usage" },
      { label: "Build Quality", desc: "Consider durability for repeated professional use" },
      { label: "Repair Type", desc: "Panel repair, COF servicing and related applications" },
    ],
    ctaLabel: "SHOP COF PRODUCTS",
  },

  lvds: {
    label: "LVDS",
    headlinePart1: "Reliable LVDS Solutions ",
    headlineAccent: "for Display Repair.",
    description:
      "Find professional LVDS products for LED and LCD display servicing, signal connections and panel troubleshooting. Built around the practical needs of TV and electronics repair technicians.",
    bullets: [
      {
        title: "Display Signal Connections",
        desc: "Support reliable connections between display components and control boards.",
      },
      {
        title: "LED & LCD Applications",
        desc: "Suitable for troubleshooting and servicing modern display systems.",
      },
      {
        title: "Panel Compatibility",
        desc: "Check connector type, pin configuration and cable compatibility before installation.",
      },
      {
        title: "Technician-Ready Solutions",
        desc: "Designed for professional repair benches and electronics workshops.",
      },
    ],
    factors: [
      { label: "Connector Type", desc: "Check connector style and configuration" },
      { label: "Pin Configuration", desc: "Verify pin arrangement before installation" },
      { label: "Cable Length", desc: "Choose the appropriate working length" },
      { label: "Display Compatibility", desc: "Confirm compatibility with the target panel" },
      { label: "Signal Requirements", desc: "Check the required display signal configuration" },
      { label: "Build Quality", desc: "Consider durability and connection reliability" },
      { label: "Application", desc: "TV, LED and LCD display repair" },
    ],
    ctaLabel: "SHOP LVDS PRODUCTS",
  },

  "led-lcd-boards": {
    label: "LED & LCD BOARDS",
    headlinePart1: "The Right Board ",
    headlineAccent: "for Every Display Repair.",
    description:
      "Explore LED and LCD boards designed for professional display repair and replacement applications. Find practical solutions for technicians working on modern television and display systems.",
    bullets: [
      {
        title: "Display Board Solutions",
        desc: "Products for professional LED and LCD repair applications.",
      },
      {
        title: "Replacement & Repair",
        desc: "Support board replacement and troubleshooting workflows.",
      },
      {
        title: "TV Repair Applications",
        desc: "Designed around common display servicing requirements.",
      },
      {
        title: "Workshop Ready",
        desc: "Suitable for professional technicians and repair centers.",
      },
    ],
    factors: [
      { label: "Board Type", desc: "Identify the required LED or LCD board" },
      { label: "Model Compatibility", desc: "Verify compatibility with the target display" },
      { label: "Connector Layout", desc: "Check connector positions and configuration" },
      { label: "Panel Compatibility", desc: "Confirm panel specifications" },
      { label: "Function", desc: "Identify the board's intended display function" },
      { label: "Build Quality", desc: "Evaluate reliability for professional use" },
      { label: "Application", desc: "LED/LCD TV and display repair" },
    ],
    ctaLabel: "SHOP LED & LCD BOARDS",
  },

  "t-con": {
    label: "T-CON",
    headlinePart1: "Precision T-CON Solutions ",
    headlineAccent: "for Display Repair.",
    description:
      "Find T-CON products for professional LED and LCD display troubleshooting, replacement and repair. Built for technicians diagnosing panel signal and image-related problems.",
    bullets: [
      {
        title: "Display Signal Processing",
        desc: "Support display signal control between the main board and panel.",
      },
      {
        title: "Panel Repair",
        desc: "Suitable for troubleshooting and replacing faulty T-CON boards.",
      },
      {
        title: "LED & LCD Compatibility",
        desc: "Check panel and board compatibility before installation.",
      },
      {
        title: "Professional Diagnostics",
        desc: "Designed for technicians working on display-level faults.",
      },
    ],
    factors: [
      { label: "Board Model", desc: "Verify the exact T-CON model" },
      { label: "Panel Compatibility", desc: "Confirm compatibility with the display panel" },
      { label: "Connector Configuration", desc: "Check connector type and arrangement" },
      { label: "Signal Requirements", desc: "Verify required display signal specifications" },
      { label: "Board Function", desc: "Identify the intended panel-control application" },
      { label: "Build Quality", desc: "Consider reliability for professional repair" },
      { label: "Application", desc: "LED/LCD TV and display repair" },
    ],
    ctaLabel: "SHOP T-CON PRODUCTS",
  },

  scaller: {
    label: "SCALLER",
    headlinePart1: "Professional Scaller Solutions ",
    headlineAccent: "for Display Technicians.",
    description:
      "Explore scaller products designed for display conversion, signal processing and LED/LCD repair applications. Choose solutions that match your panel and repair requirements.",
    bullets: [
      {
        title: "Display Signal Conversion",
        desc: "Support display signal conversion and processing requirements.",
      },
      {
        title: "LED & LCD Applications",
        desc: "Designed for various display repair and conversion workflows.",
      },
      {
        title: "Panel Compatibility",
        desc: "Verify panel specifications before selecting a scaller.",
      },
      {
        title: "Technician Workflow",
        desc: "Practical solutions for professional electronics repair benches.",
      },
    ],
    factors: [
      { label: "Input Signal", desc: "Check supported input formats" },
      { label: "Output Signal", desc: "Verify required display output" },
      { label: "Resolution", desc: "Match supported resolution to the target panel" },
      { label: "Panel Compatibility", desc: "Confirm compatibility with the display" },
      { label: "Connector Type", desc: "Check required connections" },
      { label: "Features", desc: "Compare available control and display functions" },
      { label: "Application", desc: "Display conversion and repair" },
    ],
    ctaLabel: "SHOP SCALLER PRODUCTS",
  },

  quard: {
    label: "QUARD",
    headlinePart1: "Professional QUARD Solutions ",
    headlineAccent: "for Display Repair.",
    description:
      "Explore QUARD products selected for professional LED/LCD and electronics repair applications. Choose the right solution based on compatibility, functionality and your workshop requirements.",
    bullets: [
      {
        title: "Professional Repair Use",
        desc: "Designed for electronics and display repair environments.",
      },
      {
        title: "Display Applications",
        desc: "Suitable for LED and LCD servicing workflows.",
      },
      {
        title: "Compatibility Focus",
        desc: "Select products according to your specific equipment and panel requirements.",
      },
      {
        title: "Workshop Efficiency",
        desc: "Support faster and more organised repair processes.",
      },
    ],
    factors: [
      { label: "Product Type", desc: "Identify the correct QUARD product" },
      { label: "Compatibility", desc: "Check equipment and panel compatibility" },
      { label: "Application", desc: "Select according to repair requirements" },
      { label: "Connection", desc: "Verify connector and interface requirements" },
      { label: "Function", desc: "Check intended operating function" },
      { label: "Build Quality", desc: "Consider durability and reliability" },
      { label: "Technician Use", desc: "Choose according to workshop requirements" },
    ],
    ctaLabel: "SHOP QUARD PRODUCTS",
  },

  foam: {
    label: "FOAM",
    headlinePart1: "Reliable Foam Solutions ",
    headlineAccent: "for Professional Panel Repair.",
    description:
      "Explore repair-grade foam products used in display and electronics servicing. Choose suitable materials for insulation, spacing, protection and controlled panel-level repair applications.",
    bullets: [
      {
        title: "Panel Protection",
        desc: "Support controlled handling and protection during repair.",
      },
      {
        title: "Insulation & Spacing",
        desc: "Useful for applications requiring separation or cushioning.",
      },
      {
        title: "Repair Bench Applications",
        desc: "Suitable for professional display and electronics workflows.",
      },
      {
        title: "Practical Workshop Material",
        desc: "Designed for technicians who require dependable repair materials.",
      },
    ],
    factors: [
      { label: "Foam Type", desc: "Select the appropriate material type" },
      { label: "Thickness", desc: "Choose according to the application" },
      { label: "Adhesion", desc: "Check required bonding characteristics" },
      { label: "Flexibility", desc: "Consider flexibility for the repair application" },
      { label: "Heat Resistance", desc: "Evaluate suitability for the working environment" },
      { label: "Size", desc: "Select the appropriate dimensions" },
      { label: "Application", desc: "Panel repair and electronics servicing" },
    ],
    ctaLabel: "SHOP FOAM PRODUCTS",
  },

  "t-con-programmer": {
    label: "T-CON PROGRAMMER",
    headlinePart1: "Advanced Programming Solutions ",
    headlineAccent: "for T-CON Repair.",
    description:
      "Professional T-CON repair often requires accurate programming and configuration. Explore programmer solutions designed for technicians working with display boards and panel repair workflows.",
    bullets: [
      {
        title: "T-CON Programming",
        desc: "Support programming and configuration workflows for compatible T-CON boards.",
      },
      {
        title: "Board-Level Repair",
        desc: "Designed for technicians performing advanced display-board servicing.",
      },
      {
        title: "Professional Diagnostics",
        desc: "Useful for troubleshooting and restoring compatible display systems.",
      },
      {
        title: "Workshop Efficiency",
        desc: "Streamline programming tasks within professional repair workflows.",
      },
    ],
    factors: [
      { label: "Supported Boards", desc: "Check compatible T-CON models" },
      { label: "Programming Functions", desc: "Review supported programming operations" },
      { label: "Compatibility", desc: "Verify software and hardware compatibility" },
      { label: "Connection Method", desc: "Check required interface and connection type" },
      { label: "Supported Panels", desc: "Confirm target panel compatibility" },
      { label: "Update Support", desc: "Check firmware/software update capabilities" },
      { label: "Application", desc: "T-CON programming and display repair" },
    ],
    ctaLabel: "SHOP T-CON PROGRAMMERS",
  },

  "head-assembly": {
    label: "HEAD ASSEMBLY",
    headlinePart1: "Precision Head Assemblies ",
    headlineAccent: "for Professional Repair.",
    description:
      "Explore head assembly products designed for specialised display and electronics repair workflows. Select the right configuration for precision work and workshop requirements.",
    bullets: [
      {
        title: "Precision Repair",
        desc: "Support accurate work on delicate repair applications.",
      },
      {
        title: "Professional Components",
        desc: "Designed for technicians requiring dependable repair equipment.",
      },
      {
        title: "Workshop Compatibility",
        desc: "Select configurations based on your existing repair setup.",
      },
      {
        title: "Specialised Applications",
        desc: "Suitable for professional electronics and display repair environments.",
      },
    ],
    factors: [
      { label: "Assembly Type", desc: "Identify the correct head assembly" },
      { label: "Compatibility", desc: "Check equipment compatibility" },
      { label: "Working Configuration", desc: "Verify the required setup" },
      { label: "Precision", desc: "Evaluate suitability for detailed repair" },
      { label: "Build Quality", desc: "Consider durability" },
      { label: "Replacement Requirements", desc: "Match the assembly to the existing equipment" },
      { label: "Application", desc: "Professional electronics repair" },
    ],
    ctaLabel: "SHOP HEAD ASSEMBLIES",
  },

  "acf-tape": {
    label: "ACF TAPE",
    headlinePart1: "Reliable ACF Tape ",
    headlineAccent: "for Precision Panel Repair.",
    description:
      "Explore ACF tape products for professional display and panel repair applications. Select suitable tape based on bonding requirements, dimensions and repair workflow.",
    bullets: [
      {
        title: "Panel Bonding",
        desc: "Designed for specialised display-panel bonding applications.",
      },
      {
        title: "Precision Application",
        desc: "Support accurate placement during professional repair.",
      },
      {
        title: "Display Repair",
        desc: "Suitable for LED/LCD panel and related repair workflows.",
      },
      {
        title: "Technician Use",
        desc: "Designed for professional panel repair environments.",
      },
    ],
    factors: [
      { label: "Tape Type", desc: "Identify the required ACF tape" },
      { label: "Width", desc: "Choose the correct tape width" },
      { label: "Thickness", desc: "Match thickness to the application" },
      { label: "Bonding Requirements", desc: "Check required bonding specifications" },
      { label: "Compatibility", desc: "Verify panel and repair compatibility" },
      { label: "Handling", desc: "Consider application and storage requirements" },
      { label: "Application", desc: "ACF and display panel repair" },
    ],
    ctaLabel: "SHOP ACF TAPE",
  },

  "acf-remover": {
    label: "ACF REMOVER",
    headlinePart1: "Controlled ACF Removal ",
    headlineAccent: "for Professional Repair.",
    description:
      "Explore ACF remover products designed to help technicians safely and efficiently handle ACF removal during professional display and panel repair processes.",
    bullets: [
      {
        title: "ACF Removal",
        desc: "Designed for controlled removal during panel repair.",
      },
      {
        title: "Panel-Level Applications",
        desc: "Suitable for professional display repair workflows.",
      },
      {
        title: "Precision Handling",
        desc: "Supports careful work around delicate panel components.",
      },
      {
        title: "Technician Workflow",
        desc: "Built around practical requirements of professional repair benches.",
      },
    ],
    factors: [
      { label: "Remover Type", desc: "Select the appropriate ACF removal solution" },
      { label: "Application Method", desc: "Check the required removal process" },
      { label: "Panel Compatibility", desc: "Verify suitability for the target panel" },
      { label: "Working Temperature", desc: "Check applicable operating requirements" },
      { label: "Precision", desc: "Evaluate control during removal" },
      { label: "Material Compatibility", desc: "Ensure compatibility with surrounding components" },
      { label: "Application", desc: "ACF and panel repair" },
    ],
    ctaLabel: "SHOP ACF REMOVER",
  },

  "cof-cutter": {
    label: "COF CUTTER",
    headlinePart1: "Precision Cutting ",
    headlineAccent: "for Professional COF Repair.",
    description:
      "Explore COF cutter products designed for precise cutting and preparation during professional display panel repair. Choose equipment suited to your specific COF workflow.",
    bullets: [
      {
        title: "Precision COF Cutting",
        desc: "Support accurate cutting during panel repair procedures.",
      },
      {
        title: "Controlled Operation",
        desc: "Designed for detailed work on delicate display components.",
      },
      {
        title: "Panel Repair Applications",
        desc: "Suitable for professional COF and LED/LCD servicing.",
      },
      {
        title: "Repair Bench Ready",
        desc: "Built for technicians working on demanding panel repair tasks.",
      },
    ],
    factors: [
      { label: "Cutter Type", desc: "Identify the appropriate COF cutter" },
      { label: "Cutting Precision", desc: "Evaluate accuracy for your application" },
      { label: "Blade Configuration", desc: "Check blade and cutting configuration" },
      { label: "Compatibility", desc: "Confirm suitability for the target repair process" },
      { label: "Handling", desc: "Consider control and ease of operation" },
      { label: "Build Quality", desc: "Evaluate durability" },
      { label: "Application", desc: "COF cutting and panel repair" },
    ],
    ctaLabel: "SHOP COF CUTTERS",
  },

  tape: {
    label: "TAPE",
    headlinePart1: "Professional Repair Tape ",
    headlineAccent: "for Electronics & Display Work.",
    description:
      "Explore tapes selected for electronics, LED/LCD and professional repair applications. Choose the right tape based on adhesion, thickness, temperature resistance and intended use.",
    bullets: [
      {
        title: "Electronics Repair",
        desc: "Suitable for various professional electronics repair applications.",
      },
      {
        title: "Display Applications",
        desc: "Useful for LED/LCD and panel servicing workflows.",
      },
      {
        title: "Reliable Adhesion",
        desc: "Select tape according to required bonding strength.",
      },
      {
        title: "Workshop Essential",
        desc: "Practical consumables for professional repair technicians.",
      },
    ],
    factors: [
      { label: "Tape Type", desc: "Identify the appropriate tape" },
      { label: "Width", desc: "Choose the required width" },
      { label: "Thickness", desc: "Match thickness to the application" },
      { label: "Adhesion", desc: "Evaluate required bonding strength" },
      { label: "Temperature Resistance", desc: "Check suitability for the working environment" },
      { label: "Surface Compatibility", desc: "Verify compatibility with the target surface" },
      { label: "Application", desc: "Electronics, display and repair work" },
    ],
    ctaLabel: "SHOP TAPE PRODUCTS",
  },
};
