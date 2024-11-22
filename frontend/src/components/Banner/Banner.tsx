import { useEffect, useState } from 'react';
import styles from './Banner.module.css';

type Animation = 'slideIn' | 'slideOut';

interface BannerProps {
  announcements: string[],
}

interface AnnouncementCarouselProps {
  announcements: string[]
  displayInterval?: number
}

// Main Component
export default function Banner({ announcements }: BannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.title}>Bring Nature Indoors</div>
        <AnnouncementCarousel announcements={announcements}/>
      </div>
    </div>
  );
}

// Subcomponent
function AnnouncementCarousel({ announcements, displayInterval = 2500 }: AnnouncementCarouselProps) {
  const [firstAnnouncementIndex, setFirstAnnouncementIndex] = useState(0);
  const [secondAnnouncementIndex, setSecondAnnouncementIndex] = useState(1);
  
  const [firstAnnouncementAnimation, setFirstAnnouncementAnimation] = useState<Animation>('slideIn');
  const [secondAnnouncementAnimation, setSecondAnnouncementAnimation] = useState<Animation | null>(null);

  function toggleAnimations() {
    setFirstAnnouncementAnimation(prev => (prev === 'slideIn' ? 'slideOut' : 'slideIn'));
    setSecondAnnouncementAnimation(prev => (prev === 'slideIn' ? 'slideOut' : 'slideIn'));
  }

  function handleAnimationEnd(event: React.AnimationEvent<HTMLDivElement>, announcementType: 'first' | 'second') {
    const animationName = event.animationName; // encrypted by CSS Modules

    // Only update the announcement's index when the announcement slide out
    if (animationName.includes('slideOut')) {
      if (announcementType === 'first') {
        setFirstAnnouncementIndex(prevIndex => (prevIndex + 2) % announcements.length);
      } else if (announcementType === 'second') {
        setSecondAnnouncementIndex(prevIndex => (prevIndex + 2) % announcements.length);
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
    <div className={styles.announcementCarousel}>

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
