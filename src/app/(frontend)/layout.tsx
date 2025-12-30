import React from 'react'
import './styles.css';
import './reset.css';
import './root.css';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';
import Providers from '@/components/providers';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Media } from '@/payload-types';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export const revalidate = 300; // Revalidate header/footer every 5 minutes

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
    <html lang="en" className={dmSans.variable}>
      <head>
      </head>
      <body>
        <Providers>
          <Header
            logo={header.logo ? (
              <Image
                width={(header.logo as Media).width || 50}
                height={(header.logo as Media).height || 50}
                src={(header.logo as Media).url!}
                alt="Logo"
                priority
              />
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
