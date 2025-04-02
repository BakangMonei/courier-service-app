import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

export default function ForgotPasswordScreen() {
    const { theme, isDark } = useTheme();
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleResetPassword = () => {
        // Implement password reset logic here
        router.push('/auth/otp');
    };

    return (
        <ScrollView 
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            <StatusBar style={isDark ? "light" : "dark"} />
            <Text style={[styles.title, { color: theme.colors.text }]}>Forgot Password</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                Enter your email address to reset your password
            </Text>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Email Address</Text>
                    <TextInput
                        style={[styles.input, { 
                            backgroundColor: theme.colors.secondary,
                            color: theme.colors.text,
                            borderColor: theme.colors.border
                        }]}
                        placeholder="Enter email address"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity 
                    style={[styles.resetButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleResetPassword}
                >
                    <Text style={[styles.resetButtonText, { color: theme.colors.background }]}>
                        Reset Password
                    </Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={[styles.footerText, { color: theme.colors.text }]}>
                        Remember your password?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
                        <Text style={[styles.signInLink, { color: theme.colors.primary }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    resetButton: {
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    footerText: {
        fontSize: 16,
    },
    signInLink: {
        fontSize: 16,
        fontWeight: '600',
    },
});