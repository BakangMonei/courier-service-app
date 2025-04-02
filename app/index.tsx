import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function SplashScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    // Redirect to onboarding after 3 seconds
    const timer = setTimeout(() => {
      router.replace("/onboarding/1");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/my-logo.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 200,
    height: 200,
    tintColor: "white",
  },
  loader: {
    marginBottom: 30,
  },
});