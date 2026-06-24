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
    line1: "İçerenköy Mah. Karaman Çiftlik Yolu, Özlü Apt. No:42 Daire:9",
    line2: "Ataşehir / İstanbul",
  },

  /**
   * Google Maps embed (API anahtarı gerektirmez).
   *
   * Google'ın resmi "Yerleştir" (/maps/embed?pb=) formatı — işletme pinine
   * (Akademik Kaplama Çözümleri, İçerenköy / Ataşehir) doğrudan bağlıdır;
   * key'siz en güvenilir yöntem budur.
   */
  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48195.92408233261!2d29.07237139285776!3d40.97611015039157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9b49facf2bd%3A0x7e6923acbd1362b0!2zQWthZGVtaWsgS2FwbGFtYSDDh8O2esO8bWxlcmk!5e0!3m2!1str!2str!4v1782246465230!5m2!1str!2str",
} as const;
