import Banner from '../components/Banner/Banner';
import Navbar from '../components/Navbar/Navbar';

const announcements = [
  'Get 10% Off When Buying 2+ Plants',
  'Free Personalized Gift Notes',
  'Free Shipping On All Orders',
  '90-Day Plant Guarantee',
];

export default function Home() {
  return (
    <>
      <Banner announcements={announcements} />
      <Navbar />
    </>
  );
}