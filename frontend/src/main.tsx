import { createRoot } from 'react-dom/client';
import Banner from './components/Banner/Banner';
import './main.css';

const announcements = [
  'Get 10% Off When Buying 2+ Plants',
  'Free Personalized Gift Notes',
  'Free Shipping On All Orders',
  '90-Day Plant Guarantee',
];

createRoot(document.getElementById('root')!).render(
  <Banner announcements={announcements} />
);
