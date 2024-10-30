import { useEffect, useRef, useState } from 'react';
import styles from './Banner.module.css';

export default function Banner() {
  const announcements = [
    'Free Shipping On All Orders',
    'Get 10% Off When Buying 2+ Plants',
    'Free Personalized Gift Notes',
  ];

  return (
    <div className={styles.AnnouncementBar}>
      <div className={styles.container}>
        <div className={styles.title}>Bring Nature Indoors</div>
        <AnnouncementTicker announcements={announcements}/>
      </div>
    </div>
  );
}

interface AnnouncementTickerProps {
  announcements: string[]
  displayInterval?: number
}

function AnnouncementTicker({ announcements, displayInterval = 2500 }: AnnouncementTickerProps) {
  const [index, setIndex] = useState(0);
  const [animationType, setAnimationType] = useState('slideIn');
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  // Manage transition between announcements
  function handleAnimationEnd() {
    if (animationType === 'slideIn') {

      // wait a few seconds before showing the next announcement
      timeOutRef.current = setTimeout(() => {
        setAnimationType('slideOut');
      }, displayInterval);

    } else {

      // change to the next announcement and reset the animation
      setIndex((index + 1) % announcements.length);
      setAnimationType('slideIn');
    }
  }

  useEffect(() => {
    // Clean up function to clear the timeout when the component is unmounted
    return () => {
      if (timeOutRef.current !== null) {
        clearTimeout(timeOutRef.current); // 
      }
    };
  }, []);

  return (
    <div className={styles.AnnouncementTicker}>
      <div 
        className={`${styles.text} ${styles[animationType]}`}
        onAnimationEnd={handleAnimationEnd}
      >
        {announcements[index]}
      </div>
    </div>
  );
}