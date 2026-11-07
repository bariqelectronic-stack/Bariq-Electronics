import React from "react";
import { Metadata } from "next";
import type { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductCard } from "@/components/shop/product-card";
import { getProductBySlug, demoProducts } from "@/lib/demo-products";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/config";
import { getProductSeoDescription, getProductSeoGuidance } from "@/lib/seo-product-guidance";
import { Check, MessageCircle, Package, ChevronRight, ArrowRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProductForPage(slug: string): Promise<Product | null> {
  const demoProduct = getProductBySlug(slug);
  if (demoProduct) return demoProduct;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    sku: data.sku ?? null,
    description: data.description ?? null,
    shortDescription: data.short_description ?? null,
    price: data.price != null ? String(data.price) : null,
    salePrice: data.sale_price != null ? String(data.sale_price) : null,
    status: data.status ?? null,
    stockStatus: data.stock_status ?? "in_stock",
    images: Array.isArray(data.images) ? data.images : [],
    features: Array.isArray(data.features) ? data.features : [],
    applications: Array.isArray(data.applications) ? data.applications : [],
    compatibility: Array.isArray(data.compatibility) ? data.compatibility : [],
    whatsIncluded: Array.isArray(data.whats_included) ? data.whats_included : [],
    warranty: data.warranty ?? null,
    isFeatured: data.is_featured ?? false,
    isDemo: data.is_demo ?? false,
    category: null,
    brand: null,
    specs: [],
    inventory: null,
    reviews: [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    viewCount: data.view_count ?? 0,
    saleCount: data.sale_count ?? 0,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductForPage(slug);
  if (!product) return { title: "Product Not Found" };
  // Demo placeholders must not be presented to search engines as genuine catalog items.
  if (product.isDemo) {
    return {
      title: `${product.name} (Demo)`,
      description: "Demo placeholder listing. Not a product available from Bariq Electronics.",
      robots: { index: false, follow: true },
    };
  }
  const seoGuidance = getProductSeoGuidance(product);
  const canonicalUrl = `https://www.bariqelectronics.com/products/${encodeURIComponent(slug)}`;
  const metaDescription = getProductSeoDescription(product, seoGuidance);

  return {
    title: seoGuidance.seoTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${seoGuidance.seoTitle} | Bariq Electronics`,
      description: metaDescription,
      url: canonicalUrl,
      type: "website",
      siteName: "Bariq Electronics",
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductForPage(slug);
  if (!product) notFound();

  const price = product.price ? parseFloat(product.price) : null;
  const salePrice = product.salePrice ? parseFloat(product.salePrice) : null;
  const discount = price && salePrice ? calculateDiscount(price, salePrice) : 0;
  const displayPrice = salePrice || price;
  const mainImage = product.images?.[0];

  const relatedProducts = demoProducts
    .filter((p) => p.id !== product.id && p.category?.slug === product.category?.slug)
    .slice(0, 4);

  const seoGuidance = getProductSeoGuidance(product);
  const canonicalUrl = `https://www.bariqelectronics.com/products/${encodeURIComponent(product.slug)}`;
  const schemaDescription = getProductSeoDescription(product, seoGuidance);

  const stockStatusDisplay = {
    in_stock: { label: "In Stock", color: "success" as const },
    low_stock: { label: "Low Stock", color: "warning" as const },
    out_of_stock: { label: "Out of Stock", color: "error" as const },
    preorder: { label: "Pre-order", color: "info" as const },
    discontinued: { label: "Discontinued", color: "default" as const },
  };

  const stockDisplay = stockStatusDisplay[product.stockStatus as keyof typeof stockStatusDisplay] || stockStatusDisplay.in_stock;

  const whatsappMsg = `Hi, I'm interested in: ${product.name}${product.sku ? ` (SKU: ${product.sku})` : ""}. Can you provide more information?`;

  // Mirrors the stock label shown on the page.
  const schemaAvailability = {
    in_stock: "https://schema.org/InStock",
    low_stock: "https://schema.org/LimitedAvailability",
    out_of_stock: "https://schema.org/OutOfStock",
    preorder: "https://schema.org/PreOrder",
    discontinued: "https://schema.org/Discontinued",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: schemaDescription,
    sku: product.sku || undefined,
    category: seoGuidance.categoryName ?? undefined,
    image: product.images.length ? product.images : undefined,
    url: canonicalUrl,
    // No Offer without a real price; never publish a zero or estimated price.
    offers: displayPrice ? {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: displayPrice,
      availability: schemaAvailability[product.stockStatus as keyof typeof schemaAvailability] ?? schemaAvailability.in_stock,
      url: canonicalUrl,
      seller: {
        "@type": "Organization",
        "@id": "https://www.bariqelectronics.com/#organization",
        name: "Bariq Electronics",
        url: "https://www.bariqelectronics.com",
      },
    } : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.bariqelectronics.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://www.bariqelectronics.com/shop",
      },
      ...(seoGuidance.categoryName && seoGuidance.categorySlug
        ? [{
            "@type": "ListItem",
            position: 3,
            name: seoGuidance.categoryName,
            item: `https://www.bariqelectronics.com/categories/${encodeURIComponent(seoGuidance.categorySlug)}`,
          }]
        : []),
      {
        "@type": "ListItem",
        position: seoGuidance.categoryName && seoGuidance.categorySlug ? 4 : 3,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  // Group specs by group name
  const specGroups: Record<string, typeof product.specs> = {};
  (product.specs || []).forEach((spec) => {
    const group = spec.groupName || "Specifications";
    if (!specGroups[group]) specGroups[group] = [];
    specGroups[group]!.push(spec);
  });

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {!product.isDemo && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </>
      )}
      <div className="container-site py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#9E9E9E] mb-6 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[#0A0A0A]">Shop</Link>
          {seoGuidance.categoryName && seoGuidance.categorySlug && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/categories/${seoGuidance.categorySlug}`} className="hover:text-[#0A0A0A]">
                {seoGuidance.categoryName}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0A0A0A] truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Images */}
          <div>
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden aspect-square relative">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#BDBDBD]">
                  <Package className="w-16 h-16 mb-3" />
                  <p className="text-sm">No image yet</p>
                </div>
              )}
              {product.isDemo && (
                <div className="absolute top-3 left-3">
                  <Badge variant="demo">Demo Product</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 flex-shrink-0 bg-white border border-[#E5E5E5] rounded-[6px] overflow-hidden relative"
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-contain p-2" sizes="64px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            {product.category && (
              <Link
                href={`/categories/${product.category.slug}`}
                className="text-xs font-semibold uppercase tracking-wider text-[#E65C00] hover:underline"
              >
                {product.category.name}
              </Link>
            )}

            <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight mt-2 mb-3 leading-tight">
              {product.name}
            </h1>

            {product.sku && (
              <div className="text-xs text-[#9E9E9E] mb-3">SKU: {product.sku}</div>
            )}

            {/* Stock */}
            <div className="mb-4">
              <Badge variant={stockDisplay.color}>{stockDisplay.label}</Badge>
            </div>

            {/* Price */}
            <div className="mb-5">
              {displayPrice !== null ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-[#0A0A0A]">
                    {formatPrice(displayPrice)}
                  </span>
                  {salePrice && price && (
                    <span className="text-base text-[#BDBDBD] line-through">{formatPrice(price)}</span>
                  )}
                  {discount > 0 && (
                    <Badge variant="error">-{discount}% off</Badge>
                  )}
                </div>
              ) : (
                <div className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] px-4 py-3">
                  <p className="text-sm text-[#6B6B6B]">
                    Contact us for pricing and product compatibility.
                  </p>
                </div>
              )}
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5 border-b border-[#F0F0F0] pb-5">
                {product.shortDescription}
              </p>
            )}

            {/* Actions */}
            <div className="space-y-3 mb-6">
              <AddToCartButton product={product} fullWidth />
              <a
                href={getWhatsAppLink(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-[#E5E5E5] rounded-[6px] text-sm font-semibold text-[#0A0A0A] hover:bg-[#F7F7F7] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#16A34A]" />
                Enquire on WhatsApp
              </a>
            </div>

            {/* Key features preview */}
            {product.features && product.features.length > 0 && (
              <div className="bg-[#F7F7F7] border border-[#F0F0F0] rounded-[10px] p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9E9E9E] mb-3">
                  Key Features
                </div>
                <ul className="space-y-2">
                  {product.features.slice(0, 4).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#3D3D3D]">
                      <Check className="w-3.5 h-3.5 text-[#E65C00] mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Description, Specs, Applications, etc. */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] mb-8 overflow-hidden">
          <div className="border-b border-[#E5E5E5] px-6 pt-6 pb-0">
            <h2 className="text-base font-bold text-[#0A0A0A] mb-0 pb-3">Product Details</h2>
          </div>
          <div className="p-6 space-y-8">
            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">Overview</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">Key Features</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#3D3D3D]">
                      <Check className="w-3.5 h-3.5 text-[#E65C00] mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specs */}
            {product.specs && product.specs.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">Technical Specifications</h3>
                {Object.entries(specGroups).map(([group, specs]) => (
                  <div key={group} className="mb-4">
                    {Object.keys(specGroups).length > 1 && (
                      <div className="text-xs font-semibold text-[#9E9E9E] mb-2 uppercase tracking-wider">{group}</div>
                    )}
                    <div className="border border-[#E5E5E5] rounded-[8px] overflow-hidden">
                      {specs?.map((spec, i) => (
                        <div
                          key={spec.id}
                          className={`flex items-start text-sm ${i !== 0 ? "border-t border-[#E5E5E5]" : ""}`}
                        >
                          <div className="w-48 px-4 py-3 bg-[#F7F7F7] font-medium text-[#3D3D3D] flex-shrink-0">
                            {spec.name}
                          </div>
                          <div className="px-4 py-3 text-[#6B6B6B] flex-1">
                            {spec.value || "Specification not provided"}
                            {spec.unit && spec.value && ` ${spec.unit}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, i) => (
                    <span key={i} className="text-xs bg-[#F7F7F7] border border-[#E5E5E5] rounded-full px-3 py-1 text-[#6B6B6B]">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Compatibility */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">Compatibility</h3>
                <ul className="space-y-1">
                  {product.compatibility.map((c, i) => (
                    <li key={i} className="text-sm text-[#6B6B6B] flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#E65C00] rounded-full" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Included */}
            {product.whatsIncluded && product.whatsIncluded.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">What&apos;s Included</h3>
                <ul className="space-y-1">
                  {product.whatsIncluded.map((item, i) => (
                    <li key={i} className="text-sm text-[#6B6B6B] flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warranty */}
            {product.warranty && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-2">Warranty</h3>
                <p className="text-sm text-[#6B6B6B]">{product.warranty}</p>
              </div>
            )}

            {/* Is this right for me? */}
            <div className="bg-[#F7F3EE] border border-[#E65C0020] rounded-[10px] p-5">
              <h3 className="font-semibold text-sm text-[#0A0A0A] mb-2">Is this product right for me?</h3>
              {product.applications && product.applications.length > 0 ? (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">This product is suitable for:</p>
                  <ul className="space-y-1">
                    {product.applications.map((app, i) => (
                      <li key={i} className="text-sm text-[#3D3D3D] flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#E65C00]" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-[#9E9E9E]">
                  Application information not yet available.{" "}
                  <a href={getWhatsAppLink(`Can you tell me if ${product.name} is right for my needs?`)} target="_blank" rel="noopener noreferrer" className="text-[#E65C00] underline">
                    Ask us on WhatsApp
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* General Buying & Compatibility Guidance (AEO/GEO Resource Block) */}
        {!product.isDemo && <div className="bg-white border border-[#E5E5E5] rounded-[12px] mb-8 overflow-hidden">
          <div className="border-b border-[#E5E5E5] px-6 pt-6 pb-0">
            <h2 className="text-base font-bold text-[#0A0A0A] mb-0 pb-3">
              General Buying &amp; Compatibility Guide{seoGuidance.categoryName ? ` (${seoGuidance.categoryName})` : ""}
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-2">
                Category Overview
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{seoGuidance.overview}</p>
            </div>

            {seoGuidance.checklist.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">
                  What to Check Before Ordering
                </h3>
                <ul className="space-y-2">
                  {seoGuidance.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#3D3D3D]">
                      <Check className="w-3.5 h-3.5 text-[#E65C00] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {seoGuidance.faqs.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">
                  Common Technician Questions
                </h3>
                <div className="space-y-3">
                  {seoGuidance.faqs.map((faq, i) => (
                    <div key={i} className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] p-4">
                      <h4 className="font-semibold text-sm text-[#0A0A0A] mb-1">{faq.q}</h4>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {seoGuidance.relatedLinks.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">
                  Related Guides &amp; Categories
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {seoGuidance.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between gap-2 text-sm text-[#3D3D3D] hover:text-[#E65C00] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] px-4 py-2.5 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#E65C00] flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {seoGuidance.relatedProductLinks.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] uppercase tracking-wider mb-3">
                  Explore Related Catalog Pages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {seoGuidance.relatedProductLinks.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/products/${rp.slug}`}
                      className="group bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] p-4 hover:border-[#E65C00] transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-[#E65C00] mb-1">
                          {rp.categoryName}
                        </div>
                        <div className="font-bold text-sm text-[#0A0A0A] group-hover:text-[#E65C00] transition-colors">
                          {rp.name}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#6B6B6B] group-hover:text-[#E65C00] transition-colors">
                        View page <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>}

        {/* Shipping & returns */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "📦", title: "Shipping", desc: "Ask us about delivery options and charges for your location.", link: "/shipping" },
            { icon: "↩️", title: "Returns", desc: "Contact us with any questions about returns before you order.", link: "/returns" },
            { icon: "💬", title: "Wholesale Inquiry", desc: "Buying in bulk? Send us a wholesale enquiry.", link: "/wholesale" },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <div className="text-xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-sm text-[#0A0A0A] mb-1">{item.title}</h4>
              <p className="text-xs text-[#9E9E9E] leading-relaxed mb-2">{item.desc}</p>
              <Link href={item.link} className="text-xs text-[#E65C00] hover:underline">Learn more →</Link>
            </div>
          ))}
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-[#0A0A0A] tracking-tight mb-5">
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Wholesale CTA */}
        <div className="mt-10 bg-[#0A0A0A] rounded-[12px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white mb-1">Need this product in bulk?</h3>
            <p className="text-sm text-[#9E9E9E]">
              Contact us about bulk orders of {product.name} and other products.
            </p>
          </div>
          <Link
            href={`/wholesale?product=${encodeURIComponent(product.name)}`}
            className="flex-shrink-0 bg-[#E65C00] text-white text-sm font-bold px-5 py-2.5 rounded-[6px] hover:bg-[#CC5000] transition-colors whitespace-nowrap"
          >
            Send Wholesale Enquiry
          </Link>
        </div>
      </div>

      {/* Mobile sticky ATC */}
      <div className="fixed bottom-14 left-0 right-0 z-30 p-3 bg-white border-t border-[#E5E5E5] lg:hidden">
        <AddToCartButton product={product} fullWidth />
      </div>
    </div>
  );
}
