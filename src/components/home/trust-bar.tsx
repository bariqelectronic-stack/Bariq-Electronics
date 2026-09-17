import Image from "next/image";

export function TrustBar() {
  return (
    <section className="border-b border-[#1E1E1E] bg-[#090909]">
      <div className="container-site py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          <div className="group relative overflow-hidden rounded-[14px] border border-[#2A2A2A] bg-[#0D0D0D]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(182,92,32,0.14),transparent_58%)]" />
            <div className="relative h-[300px] sm:h-[360px] lg:h-[420px]">
              <Image
                src="/images/bariq-machine-1-new.png"
                alt="Bariq Electronics repair machine"
                fill
                className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative border-t border-[#232323] px-5 py-4 sm:px-6 sm:py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B65C20]">
                Professional Equipment
              </p>
              <h3 className="mt-1 text-lg sm:text-xl font-bold text-white">
                Advanced Display Repair Machinery
              </h3>
              <p className="mt-1 text-sm text-[#8A8A8A]">
                Precision equipment built for professional repair workflows.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[14px] border border-[#2A2A2A] bg-[#0D0D0D]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(182,92,32,0.14),transparent_58%)]" />
            <div className="relative h-[300px] sm:h-[360px] lg:h-[420px]">
              <Image
                src="/images/bariq-machine-2.png"
                alt="Bariq Electronics display repair machine"
                fill
                className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative border-t border-[#232323] px-5 py-4 sm:px-6 sm:py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B65C20]">
                Technician Focused
              </p>
              <h3 className="mt-1 text-lg sm:text-xl font-bold text-white">
                Professional Panel Repair Solutions
              </h3>
              <p className="mt-1 text-sm text-[#8A8A8A]">
                Designed around real-world workshop requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}