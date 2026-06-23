/**
 * Şirket / iletişim sabitleri.
 *
 * Telefon, e-posta ve adres birden çok bileşende kullanıldığı için tek yerden
 * yönetilir. Bilgi değişince yalnızca burayı güncelleyin.
 */

export const COMPANY = {
  /** Tüzel ünvan. */
  legalName: "Akademik İnşaat Paz. San. Tic. Ltd. Şti.",
  /** Site / marka adı. */
  brand: "Traffic Floor",

  /** Görüntüleme için biçimlendirilmiş telefon. */
  phoneDisplay: "+90 (216) 576 64 10",
  /** tel: bağlantısı için (boşluksuz). */
  phoneHref: "tel:+902165766410",

  email: "info@traficlineturkiye.com",
  emailHref: "mailto:info@traficlineturkiye.com",

  address: {
    line1: "İçerenköy Mah. Karaman Çiftlik Yolu, Özlü Apt. No:42 Daire:7",
    line2: "Ataşehir / İstanbul",
  },

  /**
   * Google Maps embed (API anahtarı gerektirmez).
   *
   * Serbest metin adres geocode'u yanlış pin verdiği için doğrudan
   * koordinat kullanılıyor — en güvenilir key'siz yöntem budur.
   * Konum: Karaman Çiftlik Yolu, İçerenköy Mah., Ataşehir / İstanbul.
   */
  mapsEmbedSrc:
    "https://maps.google.com/maps?q=40.975811,29.107625&z=16&hl=tr&output=embed",
} as const;
