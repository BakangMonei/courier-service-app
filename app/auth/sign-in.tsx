import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SignInScreen() {
    const { theme, isDark } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSignIn = () => {
        // Implement sign in logic here
        router.push('/home');
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            <StatusBar style={isDark ? "light" : "dark"} />
            <Text style={[styles.title, { color: theme.colors.text }]}>Sign In</Text>

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

            <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Password</Text>
                <View style={[styles.passwordContainer, {
                    backgroundColor: theme.colors.secondary,
                    borderColor: theme.colors.border
                }]}>
                    <TextInput
                        style={[styles.passwordInput, { color: theme.colors.text }]}
                        placeholder="Enter password"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={24}
                            color={theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                </View>
                <Link href="/auth/forgot-password" style={[styles.forgotText, { color: theme.colors.primary }]}>
                    Forgot password?
                </Link>
            </View>

            <TouchableOpacity
                style={[styles.signInButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleSignIn}
            >
                <Text style={[styles.signInButtonText, { color: theme.colors.background }]}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.accountContainer}>
                <Text style={[styles.noAccountText, { color: theme.colors.textSecondary }]}>Don't have an account? </Text>
                <Link href="/auth/register" style={[styles.createAccountLink, { color: theme.colors.primary }]}>
                    Create Account
                </Link>
            </View>

            <View style={styles.separatorContainer}>
                <Text style={[styles.separatorText, { color: theme.colors.textSecondary }]}>Or Sign in with</Text>
            </View>

            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={[styles.socialButton, { borderColor: theme.colors.border }]}>
                    <Image
                        source={require('../../assets/images/google-icon.png')}
                        style={styles.socialIcon}
                    />
                    <Text style={[styles.socialButtonText, { color: theme.colors.text }]}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.socialButton, { borderColor: theme.colors.border }]}>
                    <Image
                        source={require('../../assets/images/apple-icon.png')}
                        style={styles.socialIcon}
                    />
                    <Text style={[styles.socialButtonText, { color: theme.colors.text }]}>Apple</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 150,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    forgotText: {
        alignSelf: 'flex-end',
        marginTop: 8,
        fontSize: 14,
    },
    signInButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signInButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    accountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    noAccountText: {
        fontSize: 14,
    },
    createAccountLink: {
        fontSize: 14,
        fontWeight: '600',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    separatorText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    socialButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
});