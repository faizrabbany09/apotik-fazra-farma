'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  ShoppingBag,
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function HeroSection() {
  const [imgSrc, setImgSrc] = useState('/apotik.jpeg');

  const whatsappUrl = `https://wa.me/6281361708899?text=${encodeURIComponent(
    'Halo Apotek Fazra, saya ingin tebus resep'
  )}`;

  return (
    <section className="hero-animated-bg relative w-full pt-8 sm:pt-14 overflow-hidden">
      {/* ── CUSTOM ANIMATION, PHOTO FRAME & RESPONSIVE GRID STYLES ── */}
      <style>{`
        @keyframes heroBgMotion {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes heroEntranceFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroEntranceFadeRight {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes heroGlowPulse {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.06);
          }
        }

        @keyframes heroKenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.04);
          }
        }

        @keyframes heroTwinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.15);
          }
        }

        /* LATAR GRADASI BERGERAK (Hijau lebih dalam & elegan) */
        .hero-animated-bg {
          background:
            radial-gradient(520px 380px at 88% 30%, rgba(130, 215, 150, 0.45), transparent 70%),
            radial-gradient(700px 480px at 70% 20%, rgba(10, 150, 100, 0.55), transparent 70%),
            radial-gradient(560px 420px at 10% 95%, rgba(15, 145, 130, 0.45), transparent 70%),
            linear-gradient(135deg, #CEEEDD 0%, #82CFA7 45%, #248C5E 100%);
          background-size: 200% 200%;
          animation: heroBgMotion 18s ease-in-out infinite;
          overflow-x: clip;
        }

        .hero-layout-grid {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .hero-col-left {
          display: contents;
        }

        /* ── ENTRANCE ANIMATIONS ── */
        .hero-enter-badge {
          animation: heroEntranceFadeUp 0.7s ease-out 0s both;
        }
        .hero-enter-title {
          animation: heroEntranceFadeUp 0.7s ease-out 0.08s both;
        }
        .hero-enter-desc {
          animation: heroEntranceFadeUp 0.7s ease-out 0.16s both;
        }
        .hero-enter-actions {
          animation: heroEntranceFadeUp 0.7s ease-out 0.24s both;
        }
        .hero-enter-photo {
          animation: heroEntranceFadeRight 0.7s ease-out 0.32s both;
        }

        /* ── WADAH FOTO & GLOW ── */
        .hero-photo-container {
          position: relative;
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-photo-glow {
          position: absolute;
          inset: -12%;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(closest-side, rgba(10, 145, 95, 0.7), transparent 70%);
          filter: blur(40px);
          animation: heroGlowPulse 8s ease-in-out infinite alternate;
        }

        /* BINGKAI FOTO MURNI */
        .hero-photo-frame {
          position: relative;
          z-index: 2;
          width: 100%;
          border-radius: 14px;
          overflow: hidden;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        @media (min-width: 768px) {
          .hero-photo-frame {
            border-radius: 22px;
            border: 3px solid rgba(255,255,255,.7);
            box-shadow: 0 30px 60px -24px rgba(6,61,42,.5), 0 0 0 10px rgba(255,255,255,.18);
            background: #ffffff;
          }
        }

        /* Foto 100% Murni & Tajam, Tanpa Fade / Mask / Hue-rotate */
        .hero-photo-img {
          width: 100% !important;
          height: auto !important;
          display: block !important;
          opacity: 1 !important;
          filter: saturate(1.1) contrast(1.05) !important;
          transform-origin: 50% 50%;
          animation: heroKenBurns 24s ease-in-out infinite alternate;
          user-select: none;
        }

        /* DEKORASI DAUN, PLUS & SPARKLE */
        .hero-leaf {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }
        .hero-leaf-1 {
          top: -24px;
          left: -20px;
          transform: rotate(-15deg);
        }
        .hero-leaf-2 {
          top: 36px;
          left: -32px;
          transform: rotate(25deg);
        }
        .hero-leaf-3 {
          top: -30px;
          left: 45px;
          transform: rotate(-55deg);
        }

        .hero-deco-plus {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          opacity: 0.5;
        }
        .hero-plus-1 {
          top: -18px;
          right: 140px;
          animation: heroTwinkle 3.8s ease-in-out infinite 0.4s;
        }
        .hero-plus-2 {
          top: 130px;
          right: -22px;
          animation: heroTwinkle 4.5s ease-in-out infinite 1.8s;
        }

        .hero-sparkle {
          position: absolute;
          border-radius: 9999px;
          background: #10B981;
          box-shadow: 0 0 10px 2px rgba(16, 185, 129, 0.7);
          pointer-events: none;
          z-index: 1;
          opacity: 0.5;
        }
        .hero-sparkle-1 {
          width: 6px;
          height: 6px;
          top: -10px;
          right: 70px;
          animation: heroTwinkle 3.4s ease-in-out infinite 0.2s;
        }
        .hero-sparkle-2 {
          width: 5px;
          height: 5px;
          top: 75px;
          right: -16px;
          animation: heroTwinkle 4.2s ease-in-out infinite 1.5s;
        }
        .hero-sparkle-3 {
          width: 7px;
          height: 7px;
          bottom: 110px;
          right: -20px;
          animation: heroTwinkle 3.6s ease-in-out infinite 2.6s;
        }
        .hero-sparkle-4 {
          width: 5px;
          height: 5px;
          bottom: -12px;
          right: 80px;
          animation: heroTwinkle 4.8s ease-in-out infinite 1.1s;
        }

        /* ── DESKTOP LAYOUT (>= 960px) ── */
        @media (min-width: 960px) {
          .hero-layout-grid {
            display: grid;
            grid-template-columns: 0.95fr 1.15fr;
            gap: 40px;
            align-items: center;
          }

          .hero-col-left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            width: 100%;
          }

          .hero-photo-container {
            max-width: 800px;
            margin: 0 0 0 auto;
            justify-content: flex-end;
          }
        }

        /* ── PREFERS REDUCED MOTION ── */
        @media (prefers-reduced-motion: reduce) {
          .hero-animated-bg,
          .hero-photo-glow,
          .hero-photo-img,
          .hero-sparkle,
          .hero-deco-plus,
          .hero-enter-badge,
          .hero-enter-title,
          .hero-enter-desc,
          .hero-enter-actions,
          .hero-enter-photo {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {/* ── CONTAINER UTAMA HERO SECTION (max-w-[1280px], px-4 sm:px-6) ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-0 md:pb-12">
        <div className="hero-layout-grid flex flex-col lg:grid lg:grid-cols-[0.95fr_1.15fr] lg:gap-10 lg:items-center w-full">

          {/* ══════════════════════════════════════════════════════════
              KOLOM KIRI: TEKS & CALL TO ACTION (0.95fr Desktop)
              Di mobile: contents agar urutan elemen diatur dengan order-*
          ══════════════════════════════════════════════════════════ */}
          <div className="hero-col-left contents lg:flex lg:flex-col lg:items-start lg:text-left lg:w-full">

            {/* 1. Badge Pill (Mobile Order 1) */}
            <div className="hero-enter-badge order-1 lg:order-none inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 sm:mb-5 rounded-full bg-white border border-[#DCE9E3] shadow-2xs self-start">
              <Shield className="w-3.5 h-3.5 text-[#0A7A4F] stroke-[2.5]" />
              <span className="text-[13px] font-semibold text-[#0A7A4F]">
                Apotek resmi berizin · Dilayani apoteker
              </span>
            </div>

            {/* 2. Heading H1 Rapi & Proporsional (Mobile Order 2) */}
            <h1
              className="hero-enter-title order-2 lg:order-none font-extrabold text-[#0B2A1E] mb-3 sm:mb-5 text-[28px] sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.18] sm:leading-[1.16] tracking-tight text-left"
            >
              Pesan obat lebih<br className="hidden sm:inline" /> cepat,{' '}
              <span className="text-[#0A7A4F]">tanpa antre.</span>
            </h1>

            {/* 3. Paragraf Deskripsi (Mobile Order 3) */}
            <p className="hero-enter-desc order-3 lg:order-none text-[15px] sm:text-[16px] md:text-[17px] text-[#264A3A] leading-relaxed max-w-[520px] mb-2 lg:mb-6 font-normal text-left">
              Obat resmi, vitamin harian, dan tebus resep dokter di Apotek Fazra Farma Batam. Pesan dari rumah, apoteker kami siapkan dan antar langsung ke pintu Anda.
            </p>

            {/* 5. Dua Tombol CTA (Mobile Order 5 - Di bawah gambar apotek) */}
            <div className="hero-enter-actions order-5 lg:order-none flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto mt-8 mb-10 md:my-0">
              {/* Tombol Primer: Belanja Sekarang */}
              <Link
                href="/produk"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-[26px] py-3 sm:py-[13px] bg-[#0A7A4F] hover:bg-[#063D2A] text-white font-bold text-sm sm:text-[15px] rounded-[12px] shadow-[0_10px_22px_-6px_rgba(10,122,79,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full md:w-auto text-center"
              >
                <span>Belanja Sekarang</span>
                <ShoppingBag className="w-4 h-4 stroke-[2.2] shrink-0" />
              </Link>

              {/* Tombol Sekunder: Kirim Resep via WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-[26px] py-3 sm:py-[13px] bg-white hover:bg-emerald-50/40 text-[#0E2019] hover:text-[#0A7A4F] font-bold text-sm sm:text-[15px] rounded-[12px] border-[1.5px] border-[#DCE9E3] hover:border-[#0A7A4F] transition-all duration-200 cursor-pointer shadow-2xs w-full md:w-auto text-center"
              >
                <FileText className="w-4 h-4 stroke-[2.2] text-[#0A7A4F] shrink-0" />
                <span>Kirim Resep via WhatsApp</span>
              </a>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════
              KOLOM KANAN: WADAH FOTO MODERN (1.15fr Desktop)
              Di mobile: Order 4 (di antara paragraf dan tombol CTA)
          ══════════════════════════════════════════════════════════ */}
          <div className="hero-photo-container hero-enter-photo order-4 lg:order-none my-6 lg:my-0 w-full h-auto relative bg-transparent p-0 border-0">
            {/* Glow hijau di belakang foto */}
            <div className="hero-photo-glow" aria-hidden="true" />

            {/* SVG Daun di sekitar pojok kiri atas (di belakang foto) */}
            <svg
              className="hero-leaf hero-leaf-1"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 62C10 62 16 30 44 14C72 -2 72 -2 72 -2C72 -2 60 28 40 46C20 64 10 62 10 62Z"
                fill="#0A7A4F"
                fillOpacity="0.35"
              />
              <path
                d="M10 62C28 46 50 26 72 -2"
                stroke="#0A7A4F"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
            </svg>
            <svg
              className="hero-leaf hero-leaf-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 46C8 46 12 24 34 10C56 -4 56 -4 56 -4C56 -4 46 22 30 36C14 50 8 46 8 46Z"
                fill="#0A7A4F"
                fillOpacity="0.35"
              />
              <path
                d="M8 46C22 34 38 18 56 -4"
                stroke="#0A7A4F"
                strokeWidth="1.2"
                strokeOpacity="0.35"
              />
            </svg>
            <svg
              className="hero-leaf hero-leaf-3"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 52C8 52 14 26 38 12C62 -2 62 -2 62 -2C62 -2 52 24 36 40C20 56 8 52 8 52Z"
                fill="#0A7A4F"
                fillOpacity="0.3"
              />
              <path
                d="M8 52C24 38 44 22 62 -2"
                stroke="#0A7A4F"
                strokeWidth="1.2"
                strokeOpacity="0.3"
              />
            </svg>

            {/* Tanda plus (+) dan kilau twinkle di area latar kanan */}
            <svg
              className="hero-deco-plus hero-plus-1"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 1V13M1 7H13"
                stroke="#0A7A4F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="hero-deco-plus hero-plus-2"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 1V11M1 6H11"
                stroke="#0A7A4F"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="hero-sparkle hero-sparkle-1" aria-hidden="true" />
            <div className="hero-sparkle hero-sparkle-2" aria-hidden="true" />
            <div className="hero-sparkle hero-sparkle-3" aria-hidden="true" />
            <div className="hero-sparkle hero-sparkle-4" aria-hidden="true" />

            {/* Wadah Bingkai Foto Modern: Tanpa frame putih di mobile, frame putih di desktop */}
            <div className="hero-photo-frame w-full h-auto relative bg-transparent border-0 p-0 shadow-none md:bg-white md:border-[3px] md:border-white/70 md:shadow-[0_30px_60px_-24px_rgba(6,61,42,0.5),0_0_0_10px_rgba(255,255,255,0.18)] rounded-xl md:rounded-[22px] overflow-hidden">
              <Image
                src={imgSrc}
                alt="Tampak depan Apotek Fazra Farma Batam"
                width={800}
                height={468}
                priority
                onError={() => setImgSrc('/apotik.jpeg')}
                className="hero-photo-img w-full h-auto object-cover rounded-xl md:rounded-none"
              />
            </div>

          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BARIS INFO DI BAWAH HERO (CONTAINER TUNGGAL PUTIH BERSIH)
          Kontras bersih dengan background hero yang bergradasi
      ══════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-0">
        <div className="bg-white border border-[#DCE9E3] border-b-0 rounded-t-[20px] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DCE9E3]">

            {/* Kartu 1: 100% Produk Original */}
            <div className="p-5 sm:p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-[10px] bg-[#E3F5EC] text-[#0A7A4F] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-[#0E2019]">
                  100% Produk Original
                </h3>
                <p className="text-[12px] text-[#51655D] mt-1 leading-relaxed">
                  Semua obat &amp; vitamin bersumber langsung dari distributor resmi BPOM.
                </p>
              </div>
            </div>

            {/* Kartu 2: Pengiriman Instant via Grab */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[10px] bg-[#E3F5EC] text-[#0A7A4F] flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[14px] text-[#0E2019]">
                    Pengiriman Instant via Grab
                  </h3>
                  <p className="text-[12px] text-[#51655D] mt-1 leading-relaxed">
                    Layanan pesan antar obat eksklusif dan aman menggunakan kurir Grab.
                  </p>
                </div>
              </div>

              <div className="mt-3.5 pl-14">
                <a
                  href="https://app.grab.com/s/eiuIBBV3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-bold text-white bg-[#0A7A4F] hover:bg-[#063D2A] rounded-lg transition-colors shadow-2xs"
                >
                  <span>Pesan via GrabMart</span>
                  <ExternalLink className="w-3 h-3 opacity-90" />
                </a>
              </div>
            </div>

            {/* Kartu 3: Informasi Operasional */}
            <div className="p-5 sm:p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-[10px] bg-[#E3F5EC] text-[#0A7A4F] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-[12px] text-[#51655D] space-y-1">
                <h3 className="font-bold text-[14px] text-[#0E2019] mb-1">
                  Informasi Operasional
                </h3>
                <p>
                  <strong className="text-[#0E2019] font-semibold">Alamat:</strong> Komplek Pertokoan Legenda Malaka No.6, Batam.
                </p>
                <p>
                  <strong className="text-[#0E2019] font-semibold">Telp:</strong> 0813-6170-8899.
                </p>
                <p>
                  <strong className="text-[#0E2019] font-semibold">Jam Buka:</strong> Setiap Hari (08.30 - 22.30 WIB).
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
