import { headers } from 'next/headers';
import MainContext from '@/components/main-context';

export default async function MainWrapper({ children }) {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(userAgent);
  const device = isMobile ? 'mobile' : 'pc';

  return <MainContext device={device}>{children}</MainContext>;
}