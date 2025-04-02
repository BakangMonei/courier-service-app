import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleContinue = () => {
        // Implement sending OTP logic here
        router.push('/auth/otp');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.description}>
                Enter your email address, and we will send an OTP
            </Text>

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

            <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
                <Text style={styles.rememberText}>Remembered password? </Text>
                <Link href="/auth/sign-in" style={styles.signInLink}>Sign In</Link>
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
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 40,
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
    continueButton: {
        backgroundColor: '#1F2937',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: 'white',
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