import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function OTPScreen() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<TextInput[]>([]);
    const router = useRouter();

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index: number) => {
        // Move to previous input on backspace if current input is empty
        if (index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        // Implement OTP verification logic here
        router.push('/auth/set-password');
    };

    const handleResend = () => {
        // Implement resend OTP logic here
        setOtp(['', '', '', '']);
        inputRefs.current[0].focus();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.description}>
                We've sent an OTP code to your email,{'\n'}
                <Text style={styles.emailText}>Random3321@gmail.com</Text>
            </Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => ref && (inputRefs.current[index] = ref)}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace') {
                                handleBackspace(index);
                            }
                        }}
                    />
                ))}
            </View>

            <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Didn't receive any code? Resend</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerify}
            >
                <Text style={styles.verifyButtonText}>Verify</Text>
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
    emailText: {
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    otpInput: {
        width: 64,
        height: 64,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
    },
    resendText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 30,
    },
    verifyButton: {
        backgroundColor: '#1F2937',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyButtonText: {
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