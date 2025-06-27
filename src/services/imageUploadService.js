/**
 * Image Upload Service for Homes2Show
 * AWS S3 integration for agent profiles and property images
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

import AWS from 'aws-sdk';
import awsConfig from '../config/aws-config';

// Configure AWS S3
const s3 = new AWS.S3({
  region: awsConfig.region,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

const BUCKET_NAME = 'homes2show-images-prod';

class ImageUploadService {
  /**
   * Upload agent profile image
   */
  async uploadAgentProfile(file, agentId) {
    try {
      const fileName = `agents/${agentId}/profile-${Date.now()}.${this.getFileExtension(file.name)}`;
      
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read',
        Metadata: {
          'agent-id': agentId,
          'upload-type': 'agent-profile',
          'uploaded-at': new Date().toISOString()
        }
      };

      const result = await s3.upload(uploadParams).promise();
      
      return {
        success: true,
        imageUrl: result.Location,
        key: result.Key,
        message: 'Agent profile image uploaded successfully!'
      };
      
    } catch (error) {
      console.error('Agent profile upload error:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload agent profile image'
      };
    }
  }

  /**
   * Upload property/house images
   */
  async uploadPropertyImages(files, propertyId, brokerageId) {
    try {
      const uploadPromises = Array.from(files).map(async (file, index) => {
        const fileName = `properties/${brokerageId}/${propertyId}/image-${index + 1}-${Date.now()}.${this.getFileExtension(file.name)}`;
        
        const uploadParams = {
          Bucket: BUCKET_NAME,
          Key: fileName,
          Body: file,
          ContentType: file.type,
          ACL: 'public-read',
          Metadata: {
            'property-id': propertyId,
            'brokerage-id': brokerageId,
            'upload-type': 'property-image',
            'image-index': (index + 1).toString(),
            'uploaded-at': new Date().toISOString()
          }
        };

        const result = await s3.upload(uploadParams).promise();
        
        return {
          imageUrl: result.Location,
          key: result.Key,
          index: index + 1
        };
      });

      const uploadResults = await Promise.all(uploadPromises);
      
      return {
        success: true,
        images: uploadResults,
        message: `${uploadResults.length} property images uploaded successfully!`
      };
      
    } catch (error) {
      console.error('Property images upload error:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload property images'
      };
    }
  }

  /**
   * Upload brokerage logo/display image
   */
  async uploadBrokerageImage(file, brokerageId, imageType = 'logo') {
    try {
      const fileName = `brokerages/${brokerageId}/${imageType}-${Date.now()}.${this.getFileExtension(file.name)}`;
      
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read',
        Metadata: {
          'brokerage-id': brokerageId,
          'upload-type': `brokerage-${imageType}`,
          'uploaded-at': new Date().toISOString()
        }
      };

      const result = await s3.upload(uploadParams).promise();
      
      return {
        success: true,
        imageUrl: result.Location,
        key: result.Key,
        message: `Brokerage ${imageType} uploaded successfully!`
      };
      
    } catch (error) {
      console.error('Brokerage image upload error:', error);
      return {
        success: false,
        error: error.message || `Failed to upload brokerage ${imageType}`
      };
    }
  }

  /**
   * Delete image from S3
   */
  async deleteImage(imageKey) {
    try {
      const deleteParams = {
        Bucket: BUCKET_NAME,
        Key: imageKey
      };

      await s3.deleteObject(deleteParams).promise();
      
      return {
        success: true,
        message: 'Image deleted successfully!'
      };
      
    } catch (error) {
      console.error('Image deletion error:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete image'
      };
    }
  }

  /**
   * Resize image before upload (client-side)
   */
  async resizeImage(file, maxWidth = 1200, maxHeight = 800, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, file.type, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Validate image file
   */
  validateImage(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Please upload a valid image file (JPEG, PNG, or WebP)'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Image file size must be less than 10MB'
      };
    }

    return { valid: true };
  }

  /**
   * Get file extension
   */
  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  /**
   * Generate thumbnail URL
   */
  generateThumbnailUrl(originalUrl, size = '300x200') {
    // For future implementation with AWS Lambda image resizing
    return originalUrl; // For now, return original
  }

  /**
   * Get presigned URL for secure uploads
   */
  async getPresignedUploadUrl(fileName, fileType, folder = 'general') {
    try {
      const key = `${folder}/${fileName}`;
      
      const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: fileType,
        ACL: 'public-read',
        Expires: 300 // 5 minutes
      };

      const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
      
      return {
        success: true,
        uploadUrl,
        key,
        publicUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`
      };
      
    } catch (error) {
      console.error('Presigned URL error:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate upload URL'
      };
    }
  }
}

// Export singleton instance
const imageUploadService = new ImageUploadService();
export default imageUploadService;
