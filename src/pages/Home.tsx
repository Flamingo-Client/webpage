import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Characteristics from '@/components/Characteristics'
import Usage from '@/components/Usage'
import FeaturesMarquee from '@/components/FeaturesMarquee'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesMarquee />
      <Features />
      <Characteristics />
      <Usage />
      <CallToAction />
    </>
  )
}
