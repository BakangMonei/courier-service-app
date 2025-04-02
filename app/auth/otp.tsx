import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

export default function OTPScreen() {
    const { theme, isDark } = useTheme();
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

    const handleVerifyOTP = () => {
        // Implement OTP verification logic here
        router.push('/auth/set-password');
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            <StatusBar style={isDark ? "light" : "dark"} />
            <Text style={[styles.title, { color: theme.colors.text }]}>Verify OTP</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                Enter the verification code sent to your email
            </Text>

            <View style={styles.form}>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => ref && (inputRefs.current[index] = ref)}
                            style={[styles.otpInput, {
                                backgroundColor: theme.colors.secondary,
                                color: theme.colors.text,
                                borderColor: theme.colors.border
                            }]}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace') {
                                    handleBackspace(index);
                                }
                            }}
                            placeholder="0"
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.verifyButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleVerifyOTP}
                >
                    <Text style={[styles.verifyButtonText, { color: theme.colors.background }]}>
                        Verify OTP
                    </Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={[styles.footerText, { color: theme.colors.text }]}>
                        Didn't receive the code?{' '}
                    </Text>
                    <TouchableOpacity>
                        <Text style={[styles.resendLink, { color: theme.colors.primary }]}>Resend</Text>
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    otpInput: {
        width: 64,
        height: 64,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
    },
    verifyButton: {
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    verifyButtonText: {
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
    resendLink: {
        fontSize: 16,
        fontWeight: '600',
    },
});