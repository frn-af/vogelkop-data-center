import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '../../../../payload.config'

export default function Page(props: any) {
  return RootPage({ config, ...props })
}

export const generateMetadata = generatePageMetadata({ config })
