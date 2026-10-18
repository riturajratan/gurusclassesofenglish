import type { Metadata } from 'next';
import Publisher from '@/components/Publisher';
export const metadata: Metadata = {
  title: 'Teacher’s desk',
  description: 'Prepare, review and publish your English lessons.',
  robots: { index: false, follow: false },
};
export default function Publish() {
  return <Publisher />;
}
