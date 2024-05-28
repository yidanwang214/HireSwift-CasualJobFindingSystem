import SearchBar from '../components/SearchBar/SearchBar'
import { Container } from '@mui/material'
import HowItWorks from '../components/HowItWorks';
import FeaturedJobs from '../components/FeaturedJobs';
import Testimonials from '../components/Testimonials';
import TrustedBy from '../components/TrustedBy';
import HeroSection from '../components/HeroSection';

const Home = () => {
    return (
      <>
        <HeroSection />
        <Container maxWidth='xl'>
          <HowItWorks />
        </Container>
        <Container maxWidth='xl'>
          <FeaturedJobs />
          <Testimonials />
          <TrustedBy />
        </Container>
      </>
    );
  };
  
  export default Home;