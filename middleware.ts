import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Bakım modu middleware'i.
 *
 * Açma/kapama: MAINTENANCE_MODE ortam değişkeni.
 *   - "true"  → ziyaretçiler /bakim sayfasını görür (HTTP 503)
 *   - başka değer / tanımsız → site normal çalışır
 *
 * Önizleme baypası (siz çalışırken gerçek siteyi görmek için):
 *   - https://site.com/?preview=GIZLI_ANAHTAR  ile girince çerez set edilir,
 *     sonraki gezintide gerçek site açılır. (MAINTENANCE_BYPASS_SECRET ile aynı olmalı.)
 *   - /studio (Sanity içerik yönetimi) bakım modunda bile her zaman açıktır.
 */

const BYPASS_COOKIE = "tf-preview";

export function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname, searchParams } = req.nextUrl;

  // Bakım modunda bile her zaman erişilebilir olanlar
  if (
    pathname.startsWith("/studio") || // Sanity Studio — içerik girmeye devam
    pathname.startsWith("/bakim") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon"
  ) {
    return NextResponse.next();
  }

  const secret = process.env.MAINTENANCE_BYPASS_SECRET;

  // 1) Önizleme anahtarıyla gelindiyse çerezi set et ve geçir
  if (secret && searchParams.get("preview") === secret) {
    const res = NextResponse.next();
    res.cookies.set(BYPASS_COOKIE, secret, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
    });
    return res;
  }

  // 2) Daha önce baypas çerezi alındıysa geçir
  if (secret && req.cookies.get(BYPASS_COOKIE)?.value === secret) {
    return NextResponse.next();
  }

  // 3) Aksi halde bakım sayfasını 503 ile göster (URL değişmez)
  const url = req.nextUrl.clone();
  url.pathname = "/bakim";
  return NextResponse.rewrite(url, {
    status: 503,
    headers: { "Retry-After": "3600" },
  });
}

// Statik dosyalar dışındaki tüm yollarda çalışır.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
