import Hero from '@/components/Hero';
import NewRelease from '@/components/NewRelease';
import SecondHero from '@/components/SecondHero';

export default function Home() {
  return (
    <div className='font-young'>
      <Hero />
      <SecondHero />
      <NewRelease />
    </div>
  );
}
