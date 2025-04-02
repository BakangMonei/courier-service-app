import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface CarouselProps {
  children: React.ReactNode[];
  style?: ViewStyle;
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel({ 
  children, 
  style,
  autoPlay = true,
  interval = 3000 
}: CarouselProps) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<any>(null);
  const { width } = Dimensions.get('window');

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  React.useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % children.length;
        scrollToIndex(nextIndex);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [currentIndex, autoPlay, interval, children.length]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.scrollViewContainer}>
        {children.map((child, index) => (
          <View key={index} style={{ width }}>
            {child}
          </View>
        ))}
      </View>
      <View style={styles.pagination}>
        {children.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: theme.colors.dot },
              currentIndex === index && [
                styles.activeDot,
                { backgroundColor: theme.colors.dotActive }
              ],
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
  },
});
