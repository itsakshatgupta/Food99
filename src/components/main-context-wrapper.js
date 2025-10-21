import { headers } from 'next/headers';
import MainContext from '@/components/main-context';

export default function MainWrapper({ children }) {
  const headersList = headers();
  headersList.get('')
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(userAgent);
  const device = isMobile ? 'mobile' : 'pc';

  return <MainContext device={device}>{children}</MainContext>;
}