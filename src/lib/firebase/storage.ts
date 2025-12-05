import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTask,
} from 'firebase/storage';
import { storage } from './config';

// Upload a file to Firebase Storage
export async function uploadFile(
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, path);
  
  if (onProgress) {
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } else {
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }
}

// Upload video file
export async function uploadVideo(
  file: File,
  folder: string = 'videos',
  onProgress?: (progress: number) => void
): Promise<string> {
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;
  const path = `${folder}/${filename}`;
  return uploadFile(file, path, onProgress);
}

// Upload image file
export async function uploadImage(
  file: File,
  folder: string = 'images',
  onProgress?: (progress: number) => void
): Promise<string> {
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;
  const path = `${folder}/${filename}`;
  return uploadFile(file, path, onProgress);
}

// Upload thumbnail
export async function uploadThumbnail(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return uploadImage(file, 'thumbnails', onProgress);
}

// Delete a file from Firebase Storage
export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// Generate thumbnail from video (client-side)
export function generateVideoThumbnail(videoFile: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(1, video.duration / 2);
    };

    video.onseeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate thumbnail'));
        }
      }, 'image/jpeg', 0.8);
    };

    video.onerror = () => {
      reject(new Error('Error loading video'));
    };

    video.src = URL.createObjectURL(videoFile);
  });
}
