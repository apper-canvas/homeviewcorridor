import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/organisms/HeroSection';
import FeaturesSection from '@/components/organisms/FeaturesSection';
import CallToActionSection from '@/components/organisms/CallToActionSection';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Search',
      title: 'Advanced Search',
      description: 'Find your perfect home with powerful filters'
    },
    {
      icon: 'Map',
      title: 'Interactive Maps',
      description: 'Explore neighborhoods and nearby amenities'
    },
    {
      icon: 'Heart',
      title: 'Save Favorites',
      description: 'Keep track of properties you love'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <HeroSection
        onSearchClick={() => navigate('/buy')}
        onMapClick={() => navigate('/map')}
      />
      <FeaturesSection features={features} />
      <CallToActionSection
        onBrowseClick={() => navigate('/buy')}
        onRentClick={() => navigate('/rent')}
      />
    </div>
  );
};

export default HomePage;