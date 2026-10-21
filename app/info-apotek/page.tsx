import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  ArrowLeft,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   HALAMAN INFO APOTEK — Apotek Fazra Farma
   ─────────────────────────────────────────────────────────────────────────────
   • Profil lengkap apotek: alamat, jam operasional, kontak
   • Embed iframe Google Maps lokasi apotek di Batam
   • Informasi legalitas dan izin resmi (SIA, SIPA, STRA)
   • Galeri foto apotek
 ═══════════════════════════════════════════════════════════════════════════════ */

export default function InfoApotekPage() {
  return (
    <section className="flex-1 flex-grow space-y-8 pb-8">

      {/* Header Halaman */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-3 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Kembali ke Beranda
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Info Apotek Fazra Farma
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Informasi lengkap lokasi, jam operasional, dan kontak apotek kami di Batam.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          1. HERO CARD — Foto & Profil Apotek
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Foto Apotek */}
          <div className="relative aspect-[16/10] lg:aspect-auto">
            <Image
              src="/apotik.jpeg"
              alt="Foto Gerai Apotek Fazra Farma Batam"
              width={720}
              height={500}
              unoptimized
              priority
              className="w-full h-full object-cover"
            />
            {/* Badge Terverifikasi di atas foto */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Apotek Resmi Terverifikasi</span>
            </div>
          </div>

          {/* Profil Ringkas */}
          <div className="p-6 sm:p-8 flex flex-col justify-center space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Apotek Fazra Farma
              </h2>
              <p className="text-sm text-emerald-700 font-semibold mt-0.5">
                Solusi Kesehatan Keluarga Anda
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Apotek resmi dan terpercaya di Batam yang melayani penyediaan obat bebas, obat keras
              (dengan resep dokter), vitamin, suplemen daya tahan tubuh, kebutuhan P3K, dan
              produk kesehatan keluarga lainnya. Kami menyediakan pelayanan farmasi yang ramah
              dan profesional dengan jaminan keaslian produk 100%.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Alamat</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Komplek Pertokoan Legenda Malaka No.6, Batam, Kepulauan Riau
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Jam Operasional</p>
                  <p className="text-xs text-slate-500">
                    Buka Setiap Hari: <strong className="text-slate-700">08.30 – 22.30 WIB</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Telepon / WhatsApp</p>
                  <p className="text-xs text-slate-500">
                    <a
                      href="tel:+6281361708899"
                      className="font-semibold text-emerald-700 hover:underline"
                    >
                      0813-6170-8899
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href="https://wa.me/6281361708899?text=Halo%20Apotek%20Fazra%20Farma,%20saya%20ingin%20konsultasi%20obat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
              </a>
              <a
                href="https://www.google.com/maps/search/Apotek+Fazra+Farma+Batam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 font-bold text-sm rounded-xl transition-colors hover:bg-emerald-50"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka di Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          2. PETA LOKASI — Google Maps Embed
      ══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800">
            📍 Lokasi Apotek di Peta
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Komplek Pertokoan Legenda Malaka No.6, Batam — Klik peta untuk navigasi
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Google Maps iframe embed — Lokasi Apotek Fazra Farma di Batam */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d104.05!3d1.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMDMnMDAuMCJOIDEwNMKwMDMnMDAuMCJF!5e0!3m2!1sid!2sid!4v1696000000000!5m2!1sid!2sid"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Apotek Fazra Farma di Batam"
            className="w-full h-[300px] sm:h-[400px] lg:h-[450px]"
          />
          {/* Keterangan lokasi di bawah peta */}
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              Komplek Pertokoan Legenda Malaka No.6, Batam, Kepulauan Riau, Indonesia
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          3. LEGALITAS & IZIN RESMI
      ══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Izin Resmi & Legalitas
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Apotek Fazra Farma beroperasi secara resmi di bawah pengawasan Kemenkes & BPOM
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Terverifikasi Kemenkes & BPOM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">
                Surat Izin Praktik Apoteker (SIPA)
              </p>
              <p className="text-sm font-bold text-slate-800 font-mono break-all">
                85/SIPAR/DPMPTSP-BTM/01/V/2024
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">
                Surat Tanda Registrasi Apoteker (STRA)
              </p>
              <p className="text-sm font-bold text-slate-800 font-mono break-all">
                DD00001169357195
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-1">
                Surat Izin Apotek (SIA)
              </p>
              <p className="text-sm font-bold text-slate-800 font-mono break-all">
                503/SIA/123.45/2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          4. LAYANAN YANG TERSEDIA
      ══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-800">
          🏥 Layanan Apotek
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              title: 'Obat Bebas & Obat Bebas Terbatas',
              desc: 'Penjualan obat tanpa resep untuk kebutuhan sehari-hari keluarga.',
            },
            {
              title: 'Obat Keras (Resep Dokter)',
              desc: 'Pelayanan tebus resep dokter dengan jaminan obat asli dan berizin.',
            },
            {
              title: 'Vitamin & Suplemen',
              desc: 'Suplemen kesehatan, multivitamin, dan produk daya tahan tubuh.',
            },
            {
              title: 'Konsultasi Apoteker Gratis',
              desc: 'Tanyakan langsung ke apoteker kami tentang penggunaan obat yang tepat.',
            },
            {
              title: 'Pengiriman Instan via Grab',
              desc: 'Layanan pesan antar obat langsung ke rumah via GrabMart Batam.',
            },
            {
              title: 'P3K & Alat Kesehatan',
              desc: 'Perlengkapan pertolongan pertama, alat tensi, termometer, dll.',
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors shadow-sm"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-1">{service.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
