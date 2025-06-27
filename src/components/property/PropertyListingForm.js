import React, { useState } from 'react';
import ImageUploader from '../upload/ImageUploader';

/**
 * Property Listing Form Component
 * For brokerages to add properties with images
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const PropertyListingForm = ({ onSave, onCancel, brokerageId }) => {
  const [propertyData, setPropertyData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    lotSize: '',
    yearBuilt: '',
    price: '',
    description: '',
    features: [],
    images: [],
    status: 'available',
    showingInstructions: '',
    contactInfo: '',
    virtualTourUrl: '',
    mlsNumber: ''
  });

  const [showImageUploader, setShowImageUploader] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const propertyTypes = [
    'Single Family Home',
    'Condo',
    'Townhouse',
    'Multi-Family',
    'Land/Lot',
    'Commercial',
    'Investment Property',
    'Luxury Estate',
    'Mobile Home',
    'Farm/Ranch'
  ];

  const featureOptions = [
    'Swimming Pool',
    'Garage',
    'Fireplace',
    'Hardwood Floors',
    'Updated Kitchen',
    'Master Suite',
    'Walk-in Closet',
    'Patio/Deck',
    'Garden/Landscaping',
    'Security System',
    'Central Air',
    'Basement',
    'Attic Storage',
    'Laundry Room',
    'Home Office',
    'Gym/Exercise Room'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setPropertyData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUploadSuccess = (result) => {
    setPropertyData(prev => ({
      ...prev,
      images: [...prev.images, ...result.images]
    }));
    setShowImageUploader(false);
  };

  const handleImageUploadError = (error) => {
    setErrors({ images: error });
  };

  const removeImage = (index) => {
    setPropertyData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!propertyData.address.trim()) newErrors.address = 'Address is required';
    if (!propertyData.city.trim()) newErrors.city = 'City is required';
    if (!propertyData.state.trim()) newErrors.state = 'State is required';
    if (!propertyData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!propertyData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!propertyData.price || propertyData.price < 1) newErrors.price = 'Valid price is required';
    if (!propertyData.description.trim()) newErrors.description = 'Description is required';
    if (propertyData.images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const propertyId = `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const completePropertyData = {
        ...propertyData,
        id: propertyId,
        brokerageId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await onSave(completePropertyData);
    } catch (error) {
      setErrors({ submit: 'Failed to save property. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          🏠 Add New Property Listing
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-8">
        {/* Property Images */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Images</h3>
          
          {propertyData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {propertyData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.imageUrl}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Main Photo
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowImageUploader(!showImageUploader)}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            {propertyData.images.length > 0 ? 'Add More Images' : 'Add Property Images'}
          </button>
          
          {errors.images && (
            <p className="text-red-500 text-sm mt-2">{errors.images}</p>
          )}
        </div>

        {/* Image Uploader */}
        {showImageUploader && (
          <ImageUploader
            uploadType="property-images"
            entityId={`temp-property-${Date.now()}`}
            brokerageId={brokerageId}
            onUploadSuccess={handleImageUploadSuccess}
            onUploadError={handleImageUploadError}
            multiple={true}
            maxFiles={20}
          />
        )}

        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={propertyData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 Main Street"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={propertyData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Beverly Hills"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={propertyData.state}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="CA"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={propertyData.zipCode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="90210"
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={propertyData.propertyType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.propertyType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={propertyData.price}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="750000"
                min="1"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={propertyData.bedrooms}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="3"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                step="0.5"
                name="bathrooms"
                value={propertyData.bathrooms}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="2.5"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Square Footage
              </label>
              <input
                type="number"
                name="squareFootage"
                value={propertyData.squareFootage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="2500"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lot Size (sq ft)
              </label>
              <input
                type="number"
                name="lotSize"
                value={propertyData.lotSize}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="7500"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Built
              </label>
              <input
                type="number"
                name="yearBuilt"
                value={propertyData.yearBuilt}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="2020"
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MLS Number
              </label>
              <input
                type="text"
                name="mlsNumber"
                value={propertyData.mlsNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="MLS123456"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Description *
          </label>
          <textarea
            name="description"
            value={propertyData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe the property, its features, neighborhood, and what makes it special..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Property Features (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featureOptions.map((feature) => (
              <button
                key={feature}
                type="button"
                onClick={() => handleFeatureToggle(feature)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  propertyData.features.includes(feature)
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Showing Instructions
            </label>
            <textarea
              name="showingInstructions"
              value={propertyData.showingInstructions}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Special instructions for agents showing this property..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Information
            </label>
            <textarea
              name="contactInfo"
              value={propertyData.contactInfo}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Primary contact for this property..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Virtual Tour URL
          </label>
          <input
            type="url"
            name="virtualTourUrl"
            value={propertyData.virtualTourUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="https://virtualtour.example.com"
          />
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSaving ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              'Save Property Listing'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingForm;
