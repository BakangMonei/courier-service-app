import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSignIn = () => {
        // Implement sign in logic here
        router.push('/home');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>Sign In</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Enter password"
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
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                </View>
                <Link href="/auth/forgot-password" style={styles.forgotText}>
                    Forgot password?
                </Link>
            </View>

            <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSignIn}
            >
                <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.accountContainer}>
                <Text style={styles.noAccountText}>Don't have an account? </Text>
                <Link href="/auth/register" style={styles.createAccountLink}>Create Account</Link>
            </View>

            <View style={styles.separatorContainer}>
                <Text style={styles.separatorText}>Or Sign in with</Text>
            </View>

            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={require('../../assets/images/google-icon.png')}
                        style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        source={require('../../assets/images/apple-icon.png')}
                        style={styles.socialIcon}
                    />
                    <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 60,
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
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E5E7EB',
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
        color: '#1F2937',
        fontSize: 14,
    },
    signInButton: {
        backgroundColor: '#1F2937',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signInButtonText: {
        color: 'white',
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
        color: '#6B7280',
    },
    createAccountLink: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
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
        color: '#6B7280',
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
        borderColor: '#E5E7EB',
        borderRadius: 8,
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