import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Text style={styles.title}>Welcome to AirSprint</Text>
            <Text style={styles.subtitle}>Your shipping partner</Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>This is the main app screen. You can now implement the actual shipping functionality here.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1F2937",
        marginTop: 24,
    },
    subtitle: {
        fontSize: 18,
        color: "#6B7280",
        marginBottom: 24,
    },
    infoBox: {
        backgroundColor: "#F3F4F6",
        padding: 16,
        borderRadius: 8,
        marginTop: 24,
    },
    infoText: {
        fontSize: 16,
        color: "#1F2937",
        lineHeight: 24,
    },
});