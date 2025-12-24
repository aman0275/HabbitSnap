export const PERMISSIONS = {
  CAMERA_NEEDED: 'Please enable camera permissions in settings',
  PHOTO_LIBRARY_NEEDED: 'Please grant photo library access',
};

export const ERRORS = {
  CAMERA_FAILED: 'Failed to capture photo',
  IMAGE_PICK_FAILED: 'Failed to pick image',
};

export const ALERTS = {
  DELETE_HABIT: {
    title: 'Delete Habit',
    message: (habitName) => 
      `Are you sure you want to delete "${habitName}"? This will also delete all associated photos.`,
    cancel: 'Cancel',
    confirm: 'Delete',
  },
  DELETE_ENTRY: {
    title: 'Delete Entry',
    message: 'Are you sure you want to delete this photo entry?',
    cancel: 'Cancel',
    confirm: 'Delete',
  },
  VALIDATION: {
    HABIT_NAME_REQUIRED: {
      title: 'Error',
      message: 'Please enter a habit name',
    },
    PHOTO_REQUIRED: {
      title: 'Error',
      message: 'Please capture or select a photo',
    },
  },
  PERMISSIONS,
  ERRORS,
};

export const EMPTY_STATES = {
  NO_HABITS: {
    icon: 'camera',
    title: 'No habits yet',
    subtitle: 'Start tracking your habits with photos!',
    actionText: 'Create Your First Habit',
  },
  NO_PHOTOS: {
    icon: 'camera-outline',
    title: 'No photos yet',
    subtitle: 'Start tracking by capturing your first photo!',
    actionText: 'Capture Photo',
  },
};

