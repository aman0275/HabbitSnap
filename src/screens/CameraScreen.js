import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { entryService } from '../services/entryService';
import { ALERTS, PERMISSIONS, ERRORS } from '../constants/messages';
import { useColors } from '../utils/colors';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import Input from '../components/Input';

export default function CameraScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { habit } = route.params;
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [note, setNote] = useState('');
  const cameraRef = useRef(null);

  const handleTakePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      setCapturedPhoto(photo.uri);
    } catch (error) {
      Alert.alert(ALERTS.VALIDATION.PHOTO_REQUIRED.title, ERRORS.CAMERA_FAILED);
      console.error('Error capturing photo:', error);
    }
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(ALERTS.VALIDATION.PHOTO_REQUIRED.title, PERMISSIONS.PHOTO_LIBRARY_NEEDED);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setCapturedPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(ALERTS.VALIDATION.PHOTO_REQUIRED.title, ERRORS.IMAGE_PICK_FAILED);
      console.error('Error picking image:', error);
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    setNote('');
  };

  const handleSave = async () => {
    if (!capturedPhoto) {
      Alert.alert(
        ALERTS.VALIDATION.PHOTO_REQUIRED.title,
        ALERTS.VALIDATION.PHOTO_REQUIRED.message
      );
      return;
    }

    try {
      // Create entry with AI classification (includes habit name for context)
      await entryService.createEntry(habit.id, capturedPhoto, note, habit.name);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry. Please try again.');
      console.error('Error saving entry:', error);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={64} color={COLORS.textTertiary} />
        <Text style={styles.message}>No access to camera</Text>
        <Text style={styles.subMessage}>{PERMISSIONS.CAMERA_NEEDED}</Text>
        <View style={styles.permissionButtons}>
          <Button
            title="Request Permission"
            onPress={requestPermission}
            variant="gradient"
            style={styles.permissionButton}
          />
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="secondary"
            style={styles.permissionButton}
          />
        </View>
      </View>
    );
  }

  if (capturedPhoto) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.preview} />
          
          <View style={styles.previewControls}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={handleRetake}
              activeOpacity={0.7}
            >
              <View style={styles.retakeButtonInner}>
                <Ionicons name="refresh" size={22} color={COLORS.textPrimary} />
                <Text style={styles.retakeButtonText}>Retake</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: habit.color || COLORS.primary }]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-circle" size={24} color={COLORS.textWhite} />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noteContainer}>
            <Input
              label="Add a note (optional)"
              value={note}
              onChangeText={setNote}
              placeholder="How did it go?"
              multiline
              numberOfLines={3}
              style={styles.noteInput}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() =>
                setFacing(facing === 'back' ? 'front' : 'back')
              }
            >
              <Ionicons name="camera-reverse" size={32} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.habitInfo}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <Text style={styles.habitHint}>Capture your progress</Text>
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handlePickImage}
            >
              <Ionicons name="images" size={32} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleTakePicture}
            >
              <View style={styles.captureButtonInner} />
              <View style={styles.captureButtonOuter} />
            </TouchableOpacity>

            <View style={styles.placeholder} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitInfo: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'center',
  },
  habitName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  habitHint: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  galleryButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    position: 'absolute',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
  placeholder: {
    width: 50,
    height: 50,
  },
  previewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    ...SHADOWS.md,
  },
  retakeButton: {
    flex: 1,
    marginRight: SPACING.md,
  },
  retakeButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  retakeButtonText: {
    marginLeft: SPACING.sm,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.md,
  },
  saveButtonText: {
    marginLeft: SPACING.sm,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  noteContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
  },
  noteInput: {
    backgroundColor: COLORS.background,
  },
  message: {
    fontSize: 18,
    color: COLORS.textPrimary,
    marginTop: SPACING.xl,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    color: COLORS.textTertiary,
    marginTop: SPACING.sm,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxxl,
  },
  backButton: {
    marginTop: SPACING.xxxl,
  },
  permissionButtons: {
    width: '100%',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  permissionButton: {
    marginTop: SPACING.md,
  },
});

