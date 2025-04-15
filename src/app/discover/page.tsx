import DiscoverMission from '@/components/discover/DiscoverMission'
import DiscoverHowItWorks from '@/components/discover/DiscoverHowItWorks'
import DiscoverToken from '@/components/discover/DiscoverToken'
import DiscoverTransparency from '@/components/discover/DiscoverTransparency'
import DiscoverRoadmap from '@/components/discover/DiscoverRoadmap'

export default function DiscoverPage() {
  return (
    <div className="bg-[var(--black-500)] text-[var(--gray-200)] min-h-screen">
      <main className="pt-20 pb-32 space-y-20">
        <DiscoverMission />
        <DiscoverHowItWorks />
        <DiscoverToken />
        <DiscoverTransparency />
        <DiscoverRoadmap />
      </main>
    </div>
  )
}
