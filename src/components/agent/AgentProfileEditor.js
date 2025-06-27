import React, { useState } from 'react';
import ImageUploader from '../upload/ImageUploader';

/**
 * Agent Profile Editor Component
 * Allows agents to edit their profile with image upload
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const AgentProfileEditor = ({ agentInfo, onSave, onCancel }) => {
  const [profileData, setProfileData] = useState({
    firstName: agentInfo?.firstName || '',
    lastName: agentInfo?.lastName || '',
    email: agentInfo?.email || '',
    phone: agentInfo?.phone || '',
    bio: agentInfo?.bio || '',
    specialties: agentInfo?.specialties || [],
    licenseNumber: agentInfo?.licenseNumber || '',
    brokerage: agentInfo?.brokerage || '',
    experience: agentInfo?.experience || '',
    profileImage: agentInfo?.profileImage || null,
    hourlyRate: agentInfo?.hourlyRate || '',
    availability: agentInfo?.availability || 'Available This Week'
  });

  const [showImageUploader, setShowImageUploader] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const specialtyOptions = [
    'Luxury Properties',
    'First-Time Buyers',
    'Investment Properties',
    'Commercial Real Estate',
    'Family Homes',
    'Condos & Townhomes',
    'Waterfront Properties',
    'New Construction',
    'Foreclosures',
    'Senior Living',
    'Vacation Homes',
    'Historic Properties'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
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

  const handleSpecialtyToggle = (specialty) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleImageUploadSuccess = (result) => {
    setProfileData(prev => ({
      ...prev,
      profileImage: result.imageUrl
    }));
    setShowImageUploader(false);
  };

  const handleImageUploadError = (error) => {
    setErrors({ profileImage: error });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!profileData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!profileData.email.trim()) newErrors.email = 'Email is required';
    if (!profileData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!profileData.bio.trim()) newErrors.bio = 'Bio is required';
    if (profileData.specialties.length === 0) newErrors.specialties = 'Please select at least one specialty';
    if (!profileData.hourlyRate || profileData.hourlyRate < 1) newErrors.hourlyRate = 'Valid hourly rate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      await onSave(profileData);
    } catch (error) {
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          ✏️ Edit Agent Profile
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
        {/* Profile Image Section */}
        <div className="text-center">
          <div className="mb-4">
            {profileData.profileImage ? (
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-orange-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-4 border-gray-200">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setShowImageUploader(!showImageUploader)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            {profileData.profileImage ? 'Change Photo' : 'Add Photo'}
          </button>
          
          {errors.profileImage && (
            <p className="text-red-500 text-sm mt-2">{errors.profileImage}</p>
          )}
        </div>

        {/* Image Uploader */}
        {showImageUploader && (
          <ImageUploader
            uploadType="agent-profile"
            entityId={agentInfo?.id || 'temp-agent-id'}
            onUploadSuccess={handleImageUploadSuccess}
            onUploadError={handleImageUploadError}
            multiple={false}
          />
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="(555) 123-4567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={profileData.licenseNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="RE123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brokerage
            </label>
            <input
              type="text"
              name="brokerage"
              value={profileData.brokerage}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Your Brokerage Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={profileData.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="5"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hourly Rate ($) *
            </label>
            <input
              type="number"
              name="hourlyRate"
              value={profileData.hourlyRate}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="65"
              min="1"
            />
            {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Bio *
          </label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell clients about your experience, expertise, and what makes you unique..."
          />
          {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
        </div>

        {/* Specialties */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Specialties * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {specialtyOptions.map((specialty) => (
              <button
                key={specialty}
                type="button"
                onClick={() => handleSpecialtyToggle(specialty)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  profileData.specialties.includes(specialty)
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
          {errors.specialties && <p className="text-red-500 text-sm mt-2">{errors.specialties}</p>}
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability Status
          </label>
          <select
            name="availability"
            value={profileData.availability}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          >
            <option value="Available Today">Available Today</option>
            <option value="Available Tomorrow">Available Tomorrow</option>
            <option value="Available This Week">Available This Week</option>
            <option value="Available Next Week">Available Next Week</option>
            <option value="Booking in Advance">Booking in Advance</option>
            <option value="Limited Availability">Limited Availability</option>
          </select>
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
              'Save Profile'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentProfileEditor;
