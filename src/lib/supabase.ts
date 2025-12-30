import { createClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Compresses an image if it exceeds 1.9MB to comply with the 2MB size limit.
 */
async function compressImageIfNeeded(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // 1.9 MB limit
  const limit = 1.9 * 1024 * 1024;
  if (file.size <= limit) {
    return file;
  }

  try {
    console.info(`Compressing image ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB) to fit under 2MB limit...`);
    const options = {
      maxSizeMB: 1.8,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedBlob = await imageCompression(file, options);
    return new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });
  } catch (err) {
    console.warn('Image compression failed, using original file:', err);
    return file;
  }
}

/**
 * Uploads a file to a specified Supabase Storage bucket.
 * Automatically compresses images above 2MB.
 */
export async function uploadFileToSupabase(bucket: string, folder: string, file: File): Promise<string> {
  try {
    const processedFile = await compressImageIfNeeded(file);

    const fileExt = processedFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, processedFile, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (err) {
    console.warn('Supabase storage upload failed, falling back to data URL:', err);
    
    // Return a base64 Data URL or temporary object URL so it can be previewed in UI
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}
