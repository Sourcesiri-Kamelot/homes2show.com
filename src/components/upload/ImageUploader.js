import React, { useState, useRef } from 'react';
import imageUploadService from '../../services/imageUploadService';

/**
 * Universal Image Uploader Component
 * Handles agent profiles, property images, and brokerage photos
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const ImageUploader = ({ 
  uploadType = 'agent-profile', // 'agent-profile', 'property-images', 'brokerage-logo'
  entityId,
  brokerageId,
  onUploadSuccess,
  onUploadError,
  multiple = false,
  maxFiles = 10,
  className = ''
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    
    // Validate files
    const validFiles = [];
    const errors = [];

    fileArray.forEach((file, index) => {
      const validation = imageUploadService.validateImage(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`File ${index + 1}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      onUploadError?.(errors.join('\n'));
      return;
    }

    if (!multiple && validFiles.length > 1) {
      onUploadError?.('Please select only one image');
      return;
    }

    if (multiple && validFiles.length > maxFiles) {
      onUploadError?.(`Please select no more than ${maxFiles} images`);
      return;
    }

    // Create preview URLs
    const previews = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setPreviewImages(previews);
  };

  const handleUpload = async () => {
    if (previewImages.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let result;

      if (uploadType === 'agent-profile') {
        // Resize image for profile
        const resizedFile = await imageUploadService.resizeImage(
          previewImages[0].file, 
          400, 
          400, 
          0.9
        );
        result = await imageUploadService.uploadAgentProfile(resizedFile, entityId);
        
      } else if (uploadType === 'property-images') {
        // Resize images for properties
        const resizedFiles = await Promise.all(
          previewImages.map(preview => 
            imageUploadService.resizeImage(preview.file, 1200, 800, 0.8)
          )
        );
        result = await imageUploadService.uploadPropertyImages(resizedFiles, entityId, brokerageId);
        
      } else if (uploadType === 'brokerage-logo') {
        // Resize logo
        const resizedFile = await imageUploadService.resizeImage(
          previewImages[0].file, 
          300, 
          300, 
          0.9
        );
        result = await imageUploadService.uploadBrokerageImage(resizedFile, entityId, 'logo');
      }

      if (result.success) {
        onUploadSuccess?.(result);
        setPreviewImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        onUploadError?.(result.error);
      }

    } catch (error) {
      console.error('Upload error:', error);
      onUploadError?.('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removePreview = (index) => {
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newPreviews);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const getUploadText = () => {
    switch (uploadType) {
      case 'agent-profile':
        return {
          title: '📸 Upload Profile Picture',
          subtitle: 'Add a professional photo to build trust with clients',
          buttonText: 'Choose Profile Photo'
        };
      case 'property-images':
        return {
          title: '🏠 Upload Property Images',
          subtitle: 'Add high-quality photos to showcase the property',
          buttonText: 'Choose Property Photos'
        };
      case 'brokerage-logo':
        return {
          title: '🏢 Upload Brokerage Logo',
          subtitle: 'Add your brokerage logo for professional branding',
          buttonText: 'Choose Logo'
        };
      default:
        return {
          title: '📷 Upload Images',
          subtitle: 'Add images to enhance your listing',
          buttonText: 'Choose Images'
        };
    }
  };

  const uploadText = getUploadText();

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-200 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {uploadText.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {uploadText.subtitle}
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-orange-500 bg-orange-50' 
            : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="mb-4">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-600 mb-2">
            Drag and drop your images here, or
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            {uploadText.buttonText}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
        
        <p className="text-gray-500 text-xs">
          Supports: JPEG, PNG, WebP • Max size: 10MB {multiple && `• Max ${maxFiles} files`}
        </p>
      </div>

      {/* Preview Images */}
      {previewImages.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Preview:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewImages.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removePreview(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {preview.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Uploading...</span>
            <span className="text-sm text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {previewImages.length > 0 && !isUploading && (
        <div className="mt-6 text-center">
          <button
            onClick={handleUpload}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
          >
            Upload {previewImages.length} Image{previewImages.length > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
