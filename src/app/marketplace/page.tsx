import dynamic from 'next/dynamic'

const MarkeplacePage = dynamic(
  () => import('@/pagesComponents/MarkeplacePage'),
  { ssr: false }
)

export default function Page() {
  return <MarkeplacePage />;
}