import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SetPasswordScreen() {
    const { theme, isDark } = useTheme();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleResetPassword = () => {
        // Implement password reset logic here
        router.push('/auth/sign-in');
    };

    return (
        <ScrollView 
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            <StatusBar style={isDark ? "light" : "dark"} />
            <Text style={[styles.title, { color: theme.colors.text }]}>Set New Password</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                Create a new password for your account
            </Text>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabel, { color: theme.colors.text }]}>New Password</Text>
                    <View style={[styles.passwordContainer, { 
                        backgroundColor: theme.colors.secondary,
                        borderColor: theme.colors.border
                    }]}>
                        <TextInput
                            style={[styles.passwordInput, { color: theme.colors.text }]}
                            placeholder="Enter new password"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showNewPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity 
                            style={styles.eyeIcon} 
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                            <Ionicons 
                                name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
                                size={24} 
                                color={theme.colors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Confirm Password</Text>
                    <View style={[styles.passwordContainer, { 
                        backgroundColor: theme.colors.secondary,
                        borderColor: theme.colors.border
                    }]}>
                        <TextInput
                            style={[styles.passwordInput, { color: theme.colors.text }]}
                            placeholder="Confirm password"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity 
                            style={styles.eyeIcon} 
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Ionicons 
                                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                                size={24} 
                                color={theme.colors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.resetButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleResetPassword}
                >
                    <Text style={[styles.resetButtonText, { color: theme.colors.background }]}>
                        Reset Password
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
                <Text style={[styles.rememberText, { color: theme.colors.textSecondary }]}>Remembered password? </Text>
                <Link href="/auth/sign-in" style={[styles.signInLink, { color: theme.colors.text }]}>Sign In</Link>
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
    passwordContainer: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 4,
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
        marginTop: 20,
    },
    rememberText: {
        fontSize: 14,
        color: '#6B7280',
    },
    signInLink: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
});