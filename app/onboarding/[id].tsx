import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type OnboardingScreen = {
    id: string;
    title: string;
    description: string;
    image: any;
    buttonText: string;
    nextRoute: "/home" | "/onboarding/7" | "/onboarding/3";
};

export default function OnboardingScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

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
            nextRoute: "/home",
        },
    };

    const currentScreen = screens[id as string];

    if (!currentScreen) {
        router.replace("/");
        return null;
    }

    const handleNavigation = () => {
        router.push(currentScreen.nextRoute);
    };

    const handleSkip = () => {
        router.push("/home");
    };

    const getActiveDotIndex = () => {
        const screenIds = Object.keys(screens);
        return screenIds.indexOf(id as string);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <StatusBar barStyle="dark-content" />

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={currentScreen.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.title}>{currentScreen.title}</Text>
                <Text style={styles.description}>{currentScreen.description}</Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleNavigation}>
                    <Text style={styles.buttonText}>{currentScreen.buttonText}</Text>
                </TouchableOpacity>

                <View style={styles.dotsContainer}>
                    {Object.keys(screens).map((screenId, index) => (
                        <View
                            key={screenId}
                            style={[
                                styles.dot,
                                getActiveDotIndex() === index ? styles.activeDot : {},
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
        backgroundColor: "white",
    },
    skipButton: {
        alignSelf: "flex-end",
        padding: 16,
    },
    skipText: {
        fontSize: 16,
        color: "#6B7280",
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
        backgroundColor: "#F3F4F6",
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
        color: "#1F2937",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#6B7280",
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    button: {
        backgroundColor: "#1F2937",
        borderRadius: 8,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 32,
    },
    buttonText: {
        color: "white",
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
        backgroundColor: "#E5E7EB",
    },
    activeDot: {
        width: 24,
        backgroundColor: "#1F2937",
    },
});