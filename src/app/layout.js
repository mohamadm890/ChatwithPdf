import { Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import Head from 'next/head';
// Ensure Arabic subset is included
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"], // Add Arabic support
  weight: ["400","500","600", "700", "800"], // Add different font weights if needed
});


export const metadata = {
  title: "PDF مستنداتك – محادثة تفاعلية وتلخيص فوري للمستندات - Chat with PDF",
  description: "استخدم الذكاء الاصطناعي لاستخراج المعلومات وفهم مستنداتك بشكل أعمق. تلخيص مستندات PDF وكتب PDF باستخدام الذكاء الاصطناعي.",
  openGraph: {
    title: "مستنداتك، محادثة تفاعلية في لحظة - Chat with PDF",
    description: "استخدم الذكاء الاصطناعي لاستخراج المعلومات وفهم مستنداتك بشكل أعمق. تلخيص مستندات PDF وكتب PDF باستخدام الذكاء الاصطناعي.",
    url: "https://chatwith-pdf-inky.vercel.app/",
    type: "website",
  },
  verification: {
    google: "aBeBLn0154fF8U59hPrcX7A5liZvYPLgpEFjSvm1Fn8",
  },
  keywords: "تلخيص مستندات PDF بالذكاء الاصطناعي, تلخيص كتب PDF بالذكاء الاصطناعي, تلخيص PDF باستخدام الذكاء الاصطناعي, تلخيص مستندات PDF عربي, ملخص مستندات PDF بالذكاء الاصطناعي",
};


export default function RootLayout({ children }) {
  return (

    <html lang="ar" dir="rtl">

<Head>
  <title>مستنداتك، محادثة تفاعلية في لحظة - Chat with PDF</title>
  <meta name="description" content="استخرج المعلومات بذكاء، احصل على إجابات فورية، وافهم مستنداتك بشكل أعمق مع الذكاء الاصطناعي." />

  {/* Open Graph for social media preview */}
  <meta property="og:title" content="مستنداتك، محادثة تفاعلية في لحظة - Chat with PDF" />
  <meta property="og:description" content="استخرج المعلومات بذكاء، احصل على إجابات فورية، وافهم مستنداتك بشكل أعمق مع الذكاء الاصطناعي." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://chatwith-pdf-inky.vercel.app/" />
  <meta property="og:image" content="https://chatwith-pdf-inky.vercel.app/your-preview-image.png" />
</Head>
    
        <meta
          name="google-site-verification"
          content="aBeBLn0154fF8U59hPrcX7A5liZvYPLgpEFjSvm1Fn8"
        />
    
            <body className={` ${cairo.variable} antialiased`}>
       <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col p-4">
      <SidebarTrigger />
        {children}
        </main>
      </SidebarProvider>

      </body>
    </html>

  );
}
