import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

// Skeleton Loader Component
const SkeletonLoader = () => {
  const [shimmering, setShimmering] = useState(new Animated.Value(0)); // Shimmer animation

  useEffect(() => {
    // Create shimmering animation
    Animated.loop(
      Animated.timing(shimmering, {
        toValue: 1,
        duration: 1200, // Duration of one shimmer
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.skeletonProfilePic}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              opacity: shimmering.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.7], // This is the shimmering effect
              }),
            },
          ]}
        />
      </View> */}

      <View style={styles.skeletonTextWrapper}>
        <View style={styles.skeletonText}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                opacity: shimmering.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.7],
                }),
              },
            ]}
          />
        </View>
        <View style={[styles.skeletonText, { width: '80%' }]}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                opacity: shimmering.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.7],
                }),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.skeletonCard}>
        <View style={styles.skeletonCardHeader}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                opacity: shimmering.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.7],
                }),
              },
            ]}
          />
        </View>
        <View style={styles.skeletonCardBody}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                opacity: shimmering.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.7],
                }),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width:'100%'
  },
  skeletonProfilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#c4c4c4',
    borderRadius: 50,
  },
  skeletonTextWrapper: {
    marginBottom: 20,
    width: '100%',
  },
  skeletonText: {
    height: 20,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 4,
    width: '100%',
  },
  skeletonCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 20,
  },
  skeletonCardHeader: {
    width: '60%',
    height: 20,
    backgroundColor: '#c4c4c4',
    marginBottom: 10,
    borderRadius: 4,
  },
  skeletonCardBody: {
    width: '100%',
    height: 15,
    backgroundColor: '#c4c4c4',
    borderRadius: 4,
  },
});

export default SkeletonLoader;
