import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Tuan Ngoc — UI/UX & Product Designer",
  description:
    "Portfolio of Tuan Ngoc, a UI/UX & Product Designer from Vietnam — presented as Glass Xero OS.",
};

export const viewport: Viewport = {
  themeColor: "#0e1e3a",
  // Mobile (< 768) draws edge to edge and pads with env(safe-area-inset-*).
  viewportFit: "cover",
};

/*
 * The desktop is designed on a 1920×1080 frame. On smaller windows we zoom the
 * whole OS down uniformly so the shorter side still maps to the design size;
 * this runs before first paint to avoid a layout jump.
 *
 * Tablet: 768–1279px, plus large 4:3-class landscape tablets up to 1439px
 * (for example iPad Pro 13 at 1376×1032). The stage is the
 * 1194×834 landscape frame or an 834px-wide portrait stage, scaled to fit
 * (at most 1.25× landscape / 1.15× portrait). The mode is re-chosen on
 * every resize; a change fires "xero-layout" (see src/lib/layout-mode.ts).
 *
 * Mobile (width < 768): data-layout="mobile", --desk-scale 1, and the iOS shell
 * (src/components/mobile) is laid out at 390 design px and zoomed by
 * --m-zoom = innerWidth / 390 (clamped 0.82–1.15); --m-w is the viewport width
 * in design px.
 */
/*
 * Kept as window.__xeroInit so the client can re-apply it after hydration: hosts that inject
 * markup (Netlify's badge script after </html>) can make React re-render <html>, which drops
 * the data-theme / data-layout / --desk-scale this script set before paint.
 */
const desktopScaleScript = `window.__xeroInit=function(){var d=document.documentElement;try{var t=localStorage.getItem('xero-theme');if(t==='light'||t==='dark')d.dataset.theme=t;var c=localStorage.getItem('xero-cursor');if(c!=='light'&&c!=='dark')c=t==='light'?'light':'dark';d.dataset.cursor=c;if(sessionStorage.getItem('xero-reset')==='1'){sessionStorage.removeItem('xero-reset');d.classList.add('is-booting');}}catch(e){}try{var l=localStorage.getItem('xero-lang');if(l==='vi'||l==='en')d.lang=l;}catch(e){}function f(){var w=innerWidth,h=innerHeight,mob=w<768,largeTab=w<1440&&h>=900&&w/h<=1.5,tab=w>=768&&(w<1280||largeTab),portrait=tab&&h>w,s=mob?1:tab?(portrait?Math.min(1.15,w/834):Math.min(1.25,w/1194,h/834)):Math.min(1.3334,w<1440?w/1440:w>1920?w/1920:1,h<900?h/900:h>1080?h/1080:1),m=mob?'mobile':tab?'tablet':'desktop';d.style.setProperty('--desk-scale',String(s));if(tab)d.dataset.tabletOrientation=portrait?'portrait':'landscape';else delete d.dataset.tabletOrientation;if(mob){var z=Math.min(1.15,Math.max(0.82,w/390));d.style.setProperty('--m-zoom',String(z));d.style.setProperty('--m-w',(d.clientWidth||w)/z+'px');}if(d.dataset.layout!==m){d.dataset.layout=m;dispatchEvent(new Event('xero-layout'));}}f();if(!window.__xeroBound){window.__xeroBound=1;addEventListener('resize',function(){window.__xeroLayout();});if(window.ResizeObserver)new ResizeObserver(function(){window.__xeroLayout();}).observe(d);}window.__xeroLayout=f;};window.__xeroInit();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-cursor="dark"
      suppressHydrationWarning
      className={`${openSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: desktopScaleScript }} />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
