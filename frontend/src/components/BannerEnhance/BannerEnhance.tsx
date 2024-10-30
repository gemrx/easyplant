import { useEffect, useState } from 'react';
import styles from './BannerEnhance.module.css';

export default function BannerEnhance() {
  const announcements = [
    'PRIMERO',
    'SEGUNDO',
    'TERCERO',
    'CUARTO',
    'QUINTO',
    'SEXTO'
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

type Animation = 'slideIn' | 'slideOut';

function AnnouncementTicker({ announcements, displayInterval = 2500 }: AnnouncementTickerProps) {
  const [firstAnnouncementIndex, setFirstAnnouncementIndex] = useState(0);
  const [secondAnnouncementIndex, setSecondAnnouncementIndex] = useState(1);
  
  const [firstAnnouncementAnimation, setFirstAnnouncementAnimation] = useState<Animation>('slideIn');
  const [secondAnnouncementAnimation, setSecondAnnouncementAnimation] = useState<Animation | null>(null);

  function toggleAnimations() {
    setFirstAnnouncementAnimation(prev => (prev === 'slideIn' ? 'slideOut' : 'slideIn'));
    setSecondAnnouncementAnimation(prev => (prev === 'slideIn' ? 'slideOut' : 'slideIn'));
  }

  function handleAnimationEnd(event: React.AnimationEvent<HTMLDivElement>, announcementType: 'first' | 'second') {
    const animationName = event.animationName;

    // Only update the announcement's index when the announcement slide out
    if (animationName.includes('slideOut')) {
      if (announcementType === 'first') {
        setFirstAnnouncementIndex((prevIndex) => (prevIndex + 2) % announcements.length);
      } else if (announcementType === 'second') {
        setSecondAnnouncementIndex((prevIndex) => (prevIndex + 2) % announcements.length);
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      toggleAnimations();
    }, displayInterval);

    return () => clearInterval(interval);
  }, [displayInterval]);

  return (
    <div className={styles.AnnouncementTicker}>

      {/* First Announcement */}
      <div 
        className={`
          ${styles.announcement}
          ${styles.first}
          ${styles[firstAnnouncementAnimation]}
        `}
        onAnimationEnd={(event) => handleAnimationEnd(event, 'first')}
      >
        {announcements[firstAnnouncementIndex]}
      </div>

      {/* Second Announcement */}
      <div 
        className={`
          ${styles.announcement} 
          ${styles.second} 
          ${secondAnnouncementAnimation ? styles[secondAnnouncementAnimation] : ''}
        `}
        onAnimationEnd={(event) => handleAnimationEnd(event, 'second')}
      >
        {announcements[secondAnnouncementIndex]}
      </div>

    </div>
  );
}
