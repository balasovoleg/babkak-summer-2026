import { ReactNode, useRef, useState, TouchEvent, MouseEvent } from "react";
import { useNavigate } from "react-router";

interface SwipeableMonthProps {
  children: ReactNode;
  prevPath?: string;
  nextPath?: string;
}

export function SwipeableMonth({ children, prevPath, nextPath }: SwipeableMonthProps) {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Минимальное расстояние для свайпа (в пикселях)
  const minSwipeDistance = 50;

  // Touch events (mobile)
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && nextPath) {
      navigate(nextPath);
    }
    if (isRightSwipe && prevPath) {
      navigate(prevPath);
    }
  };

  // Mouse events (desktop)
  const onMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setMouseStart(e.clientX);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!isDragging || !mouseStart) {
      setIsDragging(false);
      return;
    }
    
    const distance = mouseStart - e.clientX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && nextPath) {
      navigate(nextPath);
    }
    if (isRightSwipe && prevPath) {
      navigate(prevPath);
    }
    
    setIsDragging(false);
    setMouseStart(null);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setMouseStart(null);
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: isDragging ? 'none' : 'auto'
      }}
    >
      {children}
    </div>
  );
}
