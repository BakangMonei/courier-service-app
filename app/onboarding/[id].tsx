import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export type OnboardingScreen = {
    id: string;
    title: string;
    description: string;
    image: any;
    buttonText: string;
    nextRoute: "/home" | "/onboarding/7" | "/onboarding/3" | "/auth/sign-in";
};

export default function OnboardingScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme, isDark } = useTheme();

    const screens: Record<string, OnboardingScreen> = {
        "1": {
            id: "1",
            title: "Ship your parcel",
            description: "Experience smooth and completely stress-free shipping of your parcel",
            image: require("../../assets/images/truck-image.png"),
            buttonText: "Continue",
            nextRoute: "/onboarding/7",
        },
        "7": {
            id: "7",
            title: "Ship International",
            description: "Ship your parcel internationally with our reliable shipping service",
            image: require("../../assets/images/ship-image.png"),
            buttonText: "Continue",
            nextRoute: "/onboarding/3",
        },
        "3": {
            id: "3",
            title: "Track your parcel",
            description: "Stay informed about the parcel and get the real-time location",
            image: require("../../assets/images/map-image.png"),
            buttonText: "Continue",
            nextRoute: "/auth/sign-in",
        },
    };

    const screenOrder = ["1", "7", "3"];

    const currentScreen = screens[id as string];

    if (!currentScreen) {
        router.replace("/");
        return null;
    }

    const handleNavigation = () => {
        router.push(currentScreen.nextRoute);
    };

    const handleSkip = () => {
        router.push("/auth/sign-in");
    };

    const getActiveDotIndex = () => {
        return screenOrder.indexOf(id as string);
    };

    return (
        <View style={[styles.container, { 
            paddingTop: insets.top, 
            paddingBottom: insets.bottom,
            backgroundColor: theme.colors.background 
        }]}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={[styles.skipText, { color: theme.colors.textSecondary }]}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={[styles.imageContainer, { backgroundColor: theme.colors.secondary }]}>
                    <Image
                        source={currentScreen.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <Text style={[styles.title, { color: theme.colors.text }]}>{currentScreen.title}</Text>
                <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{currentScreen.description}</Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: theme.colors.primary }]} 
                    onPress={handleNavigation}
                >
                    <Text style={[styles.buttonText, { color: theme.colors.background }]}>
                        {currentScreen.buttonText}
                    </Text>
                </TouchableOpacity>

                <View style={styles.dotsContainer}>
                    {screenOrder.map((screenId, index) => (
                        <View
                            key={screenId}
                            style={[
                                styles.dot,
                                { backgroundColor: theme.colors.dot },
                                getActiveDotIndex() === index ? [
                                    styles.activeDot,
                                    { backgroundColor: theme.colors.dotActive }
                                ] : {},
                            ]}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipButton: {
        alignSelf: "flex-end",
        padding: 16,
    },
    skipText: {
        fontSize: 16,
        fontWeight: "500",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    imageContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    button: {
        borderRadius: 8,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 32,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    dot: {
        width: 16,
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        width: 24,
    },
});
