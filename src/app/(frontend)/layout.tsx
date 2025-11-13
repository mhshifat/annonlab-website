import React from 'react'
import './styles.css';
import './reset.css';
import './root.css';
import Script from 'next/script';
import Providers from '@/components/providers';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Media } from '@/payload-types';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const payload = await getPayload({ config });

  const [header, footer] = await Promise.all([
    payload.findGlobal({
      slug: "header"
    }),
    payload.findGlobal({
      slug: "footer"
    }),
  ]);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy='afterInteractive' />
      </head>
      <body>
        <Providers>
          <Header
            logo={header.logo ? (
              <img src={(header.logo as Media).url!} alt="Logo" />
            ) : <h3>LOGO</h3>}
            navLinks={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Services", href: "/#services" },
              { label: "Blogs", href: "/blogs" },
              { label: "Contact", href: "/contact" },
            ]}
            ctaText={header.ctaText}
            ctaHref={header.ctaLink}
          />
          <main>{children}</main>
          <Footer
            email={footer.email}
            phone={footer.phone}
            address={footer.address}
            menus={[
              { title: "About", link: "/about" },
              { title: "Services", link: "/services" },
              { title: "Works", link: "/works" },
              { title: "Blogs", link: "/blogs" },
              { title: "Contact", link: "/contact" },
            ]}
            linkedIn={footer.linkedInLink}
            whatsapp={footer.whatsAppLink}
            facebook={footer.facebookLink}
            copyright={footer.copyright}
            termsLink={footer.termsLink}
            privacyLink={footer.privacyLink}
            cookiesLink={footer.cookiesLink}
          />
        </Providers>
      </body>
    </html>
  )
}
