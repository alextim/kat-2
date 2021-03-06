/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet';

const removeTrailingSlash = (s) => s.replace(/\/$/, '');

const SeoBase = ({
  title,
  description,
  locale,
  pathname,
  canonical,
  noindex,
  metas,
  siteMeta,
  config,
  socialLinks,
  address,
  organization,
  i18n,
  dows,
}) => {
  const parseDow = (s) => {
    if (!s) {
      return '';
    }
    const dow = s.split('-');
    if (dow.length === 1) {
      return dows[s];
    }
    return `${dows[dow[0]]}-${dows[dow[1]]}`;
  };

  const { phone, email, geo, openingHours } = organization;

  const article = false;
  const isBlog = false;

  const URL = `${config.siteUrl}${removeTrailingSlash(pathname)}`;
  const homeURL = i18n ? `${config.siteUrl}${i18n.localizePath('/', locale)}` : URL;
  const isRoot = URL === homeURL;

  const purePath = i18n ? i18n.purePath(pathname) : pathname;

  const ogImage = { ...config.ogImage, src: `${config.ogImage.src}${locale}.jpg` };
  const twitterImage = { ...config.twitterImage, src: `${config.twitterImage.src}${locale}.jpg` };

  const {
    htmlLang,
    ogLocale,
    siteTitle,
    siteTitleAlt,
    siteDescription,
    siteHeadline,
    siteShortName,
  } = siteMeta;

  const schemaOrg = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: siteTitle,
    alternateName: siteTitleAlt,
    description: siteDescription,
    url: homeURL,
    image: config.siteBusinessPhoto,
    logo: config.siteLogo,
  };
  if (address) {
    const { legalName, postalAddress } = address;
    if (legalName) {
      schemaOrg.legalName = legalName;
    }
    if (postalAddress) {
      const { streetAddress, addressLocality, postalCode, addressCountry } = postalAddress;
      schemaOrg.address = {
        '@type': 'PostalAddress',
        addressCountry,
        addressLocality,
        postalCode,
        streetAddress: streetAddress && streetAddress.join(', '),
      };
    }
  }
  if (email) {
    schemaOrg.email = email.join();
  }
  if (phone) {
    schemaOrg.telephone = phone.join();
  }
  if (socialLinks) {
    schemaOrg.sameAs = Object.keys(socialLinks).map((key) => socialLinks[key].to);
  }
  if (Array.isArray(openingHours) && dows) {
    const a = openingHours.reduce(
      (acc, [dow, timeStart, timeFinish]) =>
        `${acc}${acc ? ', ' : ''}${parseDow(dow)}: ${timeStart}-${timeFinish}`,
      '',
    );
    schemaOrg.openingHours = a.length === 1 ? a[0] : a;
  }

  const schemaWebPage = {
    '@context': 'http://schema.org',
    '@type': isBlog ? 'Blog' : 'WebPage',
    url: URL,
    headline: siteHeadline,
    inLanguage: htmlLang,
    mainEntityOfPage: URL,
    description: siteDescription,
    name: siteTitle,
    image: {
      '@type': 'ImageObject',
      url: ogImage.src,
    },
  };

  let schemaPlace;
  if (geo) {
    schemaPlace = {
      '@context': 'http://schema.org',
      '@type': 'Place',
      geo: {
        '@type': 'GeoCoordinates',
        ...geo,
      },
      name: siteShortName,
    };
  }

  const metaTitle = title || siteTitle;
  const metaDescription = description || siteDescription;
  return (
    <Helmet>
      <html lang={htmlLang} />
      {noindex && <meta name="robots" content="noindex" />}
      <title>{metaTitle}</title>
      {i18n &&
        i18n.localeCodes.map((code) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={code}
            href={`${config.siteUrl}${i18n.localizePath(purePath, code)}`}
          />
        ))}
      {i18n && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${config.siteUrl}${i18n.localizePath(purePath, i18n.defaultLang)}`}
        />
      )}
      <meta httpEquiv="content-language" content={locale} />
      <meta name="description" content={metaDescription} />
      {canonical && pathname && <link rel="canonical" href={pathname} />}
      <meta name="theme-color" content={config.themeColor} />
      {metas &&
        Object.keys(metas).map((name) => <meta key={name} name={name} content={metas[name]} />)}
      {config.fbAppID && <meta property="fb:app_id" content={config.fbAppID} />}
      <meta property="og:locale" content={ogLocale} />
      {i18n &&
        i18n.localeCodes
          .filter((code) => code !== locale)
          .map((code) => (
            <meta key={code} property="og:locale:alternate" content={i18n.locales[code].ogLocale} />
          ))}
      {socialLinks && socialLinks.facebook && (
        <meta property="og:site_name" content={socialLinks.facebook.to} />
      )}
      <meta property="og:url" content={URL} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage.src} />
      <meta property="og:image:alt" content={metaDescription} />
      <meta property="og:image:width" content={ogImage.width} />
      <meta property="og:image:height" content={ogImage.height} />
      {socialLinks &&
        Object.keys(socialLinks).map((key) => (
          <meta key={key} property="og:see_also" content={socialLinks[key].to} />
        ))}
      <meta name="twitter:card" content="summary_large_image" />
      {(config.twitterCreator || config.twitterSite) && (
        <>
          <meta name="twitter:site" content={config.twitterSite || config.twitterCreator} />
          <meta name="twitter:creator" content={config.twitterCreator || config.twitterSite} />
        </>
      )}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={twitterImage.src} />
      <meta name="twitter:image:alt" content={metaDescription} />
      <meta name="twitter:image:width" content={twitterImage.width} />
      <meta name="twitter:image:height" content={twitterImage.height} />
      <link type="text/plain" href={`${config.siteUrl}/humans.txt`} rel="author" />
      <script type="application/ld+json">{JSON.stringify(schemaWebPage)}</script>
      {isRoot && (
        <>
          <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
          {geo && <script type="application/ld+json">{JSON.stringify(schemaPlace)}</script>}
        </>
      )}{' '}
    </Helmet>
  );
};

export default SeoBase;
