import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-number-input';
import { useTheme } from '../context/ThemeContext';
import CountryPickerModal from '../components/CountryPickerModal';

export default function RegisterScreen() {
  const { theme, isDark } = useTheme();
  const [photo, setPhoto] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<Country | null>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const router = useRouter();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload a photo.');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    // Implement registration logic here
    router.push('/auth/sign-in');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>

      <View style={styles.photoContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.profilePhoto} />
        ) : (
          <View style={[styles.photoPlaceholder, { backgroundColor: theme.colors.secondary }]}>
            <Ionicons name="person" size={40} color={theme.colors.textSecondary} />
          </View>
        )}
        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
          <Text style={[styles.uploadButtonText, { color: theme.colors.primary }]}>Upload Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>First Name</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.colors.secondary,
              color: theme.colors.text,
              borderColor: theme.colors.border
            }]}
            placeholder="First name"
            placeholderTextColor={theme.colors.textSecondary}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Last Name</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.colors.secondary,
              color: theme.colors.text,
              borderColor: theme.colors.border
            }]}
            placeholder="Last name"
            placeholderTextColor={theme.colors.textSecondary}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Email Address</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
            borderColor: theme.colors.border
          }]}
          placeholder="Email address"
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Country</Text>
        <TouchableOpacity 
          style={[styles.countryPickerButton, { 
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.border
          }]}
          onPress={() => setShowCountryPicker(true)}
        >
          {country ? (
            <View style={styles.selectedCountry}>
              <CountryPicker
                countryCode={country.cca2}
                withFlag
                withCountryNameButton
                visible={false}
              />
            </View>
          ) : (
            <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
              Select your country
            </Text>
          )}
          <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <CountryPickerModal
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        onSelect={setCountry}
        selectedCountry={country || undefined}
      />

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Phone Number</Text>
        <View style={[styles.input, { 
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }]}>
          <PhoneInput
            defaultValue={phoneNumber}
            defaultCode={country?.cca2 || 'US'}
            layout="first"
            onChangeText={setPhoneNumber}
            containerStyle={styles.phoneInput}
            textInputStyle={{ 
              color: theme.colors.text,
              fontSize: 16,
              height: 48,
            }}
            textContainerStyle={{
              backgroundColor: 'transparent',
              borderLeftWidth: 1,
              borderLeftColor: theme.colors.border,
              paddingLeft: 16,
            }}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity 
            style={[
              styles.genderButton,
              { backgroundColor: theme.colors.secondary },
              gender === 'male' && [styles.selectedGender, { backgroundColor: theme.colors.primary }]
            ]}
            onPress={() => setGender('male')}
          >
            <Text style={[
              styles.genderText,
              { color: theme.colors.text },
              gender === 'male' && [styles.selectedGenderText, { color: theme.colors.background }]
            ]}>Male</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.genderButton,
              { backgroundColor: theme.colors.secondary },
              gender === 'female' && [styles.selectedGender, { backgroundColor: theme.colors.primary }]
            ]}
            onPress={() => setGender('female')}
          >
            <Text style={[
              styles.genderText,
              { color: theme.colors.text },
              gender === 'female' && [styles.selectedGenderText, { color: theme.colors.background }]
            ]}>Female</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.genderButton,
              { backgroundColor: theme.colors.secondary },
              gender === 'other' && [styles.selectedGender, { backgroundColor: theme.colors.primary }]
            ]}
            onPress={() => setGender('other')}
          >
            <Text style={[
              styles.genderText,
              { color: theme.colors.text },
              gender === 'other' && [styles.selectedGenderText, { color: theme.colors.background }]
            ]}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Physical Address</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
            borderColor: theme.colors.border
          }]}
          placeholder="Enter your physical address"
          placeholderTextColor={theme.colors.textSecondary}
          value={physicalAddress}
          onChangeText={setPhysicalAddress}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Postal Address</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text,
            borderColor: theme.colors.border
          }]}
          placeholder="Enter your postal address"
          placeholderTextColor={theme.colors.textSecondary}
          value={postalAddress}
          onChangeText={setPostalAddress}
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
        style={[styles.registerButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleRegister}
      >
        <Text style={[styles.registerButtonText, { color: theme.colors.background }]}>
          Create Account
        </Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: theme.colors.text }]}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
          <Text style={[styles.signInLink, { color: theme.colors.primary }]}>Sign In</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButton: {
    padding: 8,
  },
  uploadButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
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
  countryPickerButton: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCountry: {
    flex: 1,
  },
  placeholderText: {
    fontSize: 16,
  },
  phoneInputContainer: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  phoneInput: {
    height: 48,
    width: '100%',
    backgroundColor: 'transparent',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#1F2937',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedGenderText: {
    color: '#FFFFFF',
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
  registerButton: {
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  registerButtonText: {
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