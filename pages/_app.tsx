import '../styles/globals.css'

import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import { CartProvider } from 'lib/cart-context'
import { PreviewableLocaleProvider } from 'components/locale/locale-context'

import { TopCategoriesContext, useTopCategories } from 'lib/top-categories-context'
import { DEFAULT_TOP_CATEGORY } from 'lib/my-bigcommerce/default-values'

function App({ Component, pageProps }: AppProps) {
  return (
    <PreviewableLocaleProvider>
      <TopCategoriesContext.Provider value={pageProps.topCategories ?? [DEFAULT_TOP_CATEGORY]}>
        <CartProvider>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <Component {...pageProps} />
        </CartProvider>
      </TopCategoriesContext.Provider>
    </PreviewableLocaleProvider>
  )
}

export default appWithTranslation(App)
