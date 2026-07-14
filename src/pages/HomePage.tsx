import { Hero } from '../components/home/Hero';
import { FeaturedProducts, NewArrivals, BestSellers } from '../components/home/ProductSections';
import { FragranceCategories } from '../components/home/FragranceCategories';
import { BrandStory } from '../components/home/BrandStory';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <FragranceCategories />
      <NewArrivals />
      <BrandStory />
      <BestSellers />
    </>
  );
}
