/**
 * 360° Video Service - IMMERSIVE VIDEO EXPERIENCES! 📹
 * Upload, process, and stream 360° property videos
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 * 
 * REVOLUTIONARY FEATURES:
 * - 360° video upload and processing
 * - VR headset streaming optimization
 * - Spatial audio integration
 * - Interactive hotspots in videos
 * - Multi-resolution adaptive streaming
 */

import AWS from 'aws-sdk';
import awsConfig from '../config/aws-config';

class Video360Service {
  constructor() {
    this.s3 = new AWS.S3({
      region: awsConfig.region,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    });
    
    this.mediaConvert = new AWS.MediaConvert({
      region: awsConfig.region,
      endpoint: 'https://vkxk7lpce.mediaconvert.us-east-1.amazonaws.com' // Your MediaConvert endpoint
    });
    
    this.bucketName = 'homes2show-360videos-prod';
    this.currentVideo = null;
    this.videoPlayer = null;
    this.hotspots = [];
  }

  /**
   * Initialize 360° video service
   */
  async initialize() {
    try {
      // Create S3 bucket for 360° videos if it doesn't exist
      await this.ensureBucketExists();
      
      // Initialize video player
      this.initializeVideoPlayer();
      
      return {
        success: true,
        message: '360° video service initialized',
        supportedFormats: this.getSupportedFormats()
      };
    } catch (error) {
      console.error('360° video service initialization error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Ensure S3 bucket exists for 360° videos
   */
  async ensureBucketExists() {
    try {
      await this.s3.headBucket({ Bucket: this.bucketName }).promise();
    } catch (error) {
      if (error.statusCode === 404) {
        // Create bucket
        await this.s3.createBucket({
          Bucket: this.bucketName,
          CreateBucketConfiguration: {
            LocationConstraint: awsConfig.region
          }
        }).promise();
        
        // Set CORS policy
        await this.s3.putBucketCors({
          Bucket: this.bucketName,
          CORSConfiguration: {
            CORSRules: [{
              AllowedHeaders: ['*'],
              AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
              AllowedOrigins: ['*'],
              MaxAgeSeconds: 3000
            }]
          }
        }).promise();
      }
    }
  }

  /**
   * Upload 360° video file
   */
  async upload360Video(file, propertyId, roomName, metadata = {}) {
    try {
      // Validate file
      const validation = this.validateVideoFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `properties/${propertyId}/${roomName}/360-video-${timestamp}.${fileExtension}`;

      // Upload to S3
      const uploadParams = {
        Bucket: this.bucketName,
        Key: fileName,
        Body: file,
        ContentType: file.type,
        Metadata: {
          'property-id': propertyId,
          'room-name': roomName,
          'upload-timestamp': timestamp.toString(),
          'original-filename': file.name,
          'video-type': '360-degree',
          ...metadata
        }
      };

      const uploadResult = await this.s3.upload(uploadParams).promise();

      // Process video for different formats and resolutions
      const processingJob = await this.processVideoForStreaming(uploadResult.Key, propertyId, roomName);

      return {
        success: true,
        videoId: `${propertyId}-${roomName}-${timestamp}`,
        originalUrl: uploadResult.Location,
        processingJobId: processingJob.jobId,
        message: '360° video uploaded successfully and processing started'
      };

    } catch (error) {
      console.error('360° video upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Validate 360° video file
   */
  validateVideoFile(file) {
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
    const supportedFormats = ['mp4', 'mov', 'avi', 'mkv'];
    
    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size must be less than 2GB'
      };
    }
    
    // Check file format
    const extension = file.name.split('.').pop().toLowerCase();
    if (!supportedFormats.includes(extension)) {
      return {
        valid: false,
        error: `Unsupported format. Supported formats: ${supportedFormats.join(', ')}`
      };
    }
    
    return { valid: true };
  }

  /**
   * Process video for streaming optimization
   */
  async processVideoForStreaming(s3Key, propertyId, roomName) {
    try {
      const jobSettings = {
        Role: 'arn:aws:iam::699475940746:role/MediaConvertRole',
        Settings: {
          Inputs: [{
            FileInput: `s3://${this.bucketName}/${s3Key}`,
            VideoSelector: {},
            AudioSelectors: {
              'Audio Selector 1': {
                DefaultSelection: 'DEFAULT'
              }
            }
          }],
          OutputGroups: [
            // HLS for adaptive streaming
            {
              Name: 'HLS Group',
              OutputGroupSettings: {
                Type: 'HLS_GROUP_SETTINGS',
                HlsGroupSettings: {
                  Destination: `s3://${this.bucketName}/processed/${propertyId}/${roomName}/hls/`,
                  SegmentLength: 10,
                  MinSegmentLength: 0
                }
              },
              Outputs: [
                // 4K for VR headsets
                {
                  NameModifier: '_4k',
                  VideoDescription: {
                    Width: 3840,
                    Height: 2160,
                    CodecSettings: {
                      Codec: 'H_264',
                      H264Settings: {
                        Bitrate: 25000000,
                        RateControlMode: 'CBR'
                      }
                    }
                  },
                  AudioDescriptions: [{
                    CodecSettings: {
                      Codec: 'AAC',
                      AacSettings: {
                        Bitrate: 128000,
                        SampleRate: 48000
                      }
                    }
                  }]
                },
                // 2K for mobile VR
                {
                  NameModifier: '_2k',
                  VideoDescription: {
                    Width: 2560,
                    Height: 1440,
                    CodecSettings: {
                      Codec: 'H_264',
                      H264Settings: {
                        Bitrate: 12000000,
                        RateControlMode: 'CBR'
                      }
                    }
                  },
                  AudioDescriptions: [{
                    CodecSettings: {
                      Codec: 'AAC',
                      AacSettings: {
                        Bitrate: 128000,
                        SampleRate: 48000
                      }
                    }
                  }]
                },
                // 1080p for web
                {
                  NameModifier: '_1080p',
                  VideoDescription: {
                    Width: 1920,
                    Height: 1080,
                    CodecSettings: {
                      Codec: 'H_264',
                      H264Settings: {
                        Bitrate: 8000000,
                        RateControlMode: 'CBR'
                      }
                    }
                  },
                  AudioDescriptions: [{
                    CodecSettings: {
                      Codec: 'AAC',
                      AacSettings: {
                        Bitrate: 128000,
                        SampleRate: 48000
                      }
                    }
                  }]
                }
              ]
            }
          ]
        }
      };

      const job = await this.mediaConvert.createJob(jobSettings).promise();
      
      return {
        jobId: job.Job.Id,
        status: job.Job.Status
      };

    } catch (error) {
      console.error('Video processing error:', error);
      throw error;
    }
  }

  /**
   * Initialize 360° video player
   */
  initializeVideoPlayer() {
    // This would initialize a 360° video player library like Video.js VR or A-Frame
    this.videoPlayer = {
      initialized: true,
      supports360: true,
      supportsVR: this.checkVRSupport(),
      supportsSpatialAudio: this.checkSpatialAudioSupport()
    };
  }

  /**
   * Load and play 360° video
   */
  async load360Video(videoId, container, options = {}) {
    try {
      // Get video metadata
      const videoData = await this.getVideoData(videoId);
      
      if (!videoData) {
        throw new Error('Video not found');
      }

      // Create video element
      const videoElement = document.createElement('video');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('webkit-playsinline', '');
      videoElement.crossOrigin = 'anonymous';
      
      // Set video source based on device capabilities
      const videoSource = this.selectOptimalVideoSource(videoData);
      videoElement.src = videoSource.url;
      
      // Initialize 360° viewer
      const viewer360 = await this.initialize360Viewer(videoElement, container, options);
      
      // Add interactive hotspots
      if (videoData.hotspots) {
        this.addHotspots(viewer360, videoData.hotspots);
      }
      
      // Set up spatial audio if available
      if (videoData.spatialAudio && this.videoPlayer.supportsSpatialAudio) {
        this.setupSpatialAudio(videoElement, videoData.spatialAudio);
      }

      this.currentVideo = {
        id: videoId,
        element: videoElement,
        viewer: viewer360,
        data: videoData
      };

      return {
        success: true,
        videoElement,
        viewer: viewer360,
        controls: this.getVideoControls()
      };

    } catch (error) {
      console.error('360° video load error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Initialize 360° video viewer
   */
  async initialize360Viewer(videoElement, container, options) {
    // This would use a library like A-Frame, Three.js, or Video.js VR
    const viewer = {
      container,
      videoElement,
      options: {
        projection: '360',
        stereo: options.stereo || false,
        controls: options.controls !== false,
        autoplay: options.autoplay || false,
        ...options
      }
    };

    // Initialize the 360° projection
    this.setup360Projection(viewer);
    
    // Add VR mode button if supported
    if (this.videoPlayer.supportsVR) {
      this.addVRModeButton(viewer);
    }

    return viewer;
  }

  /**
   * Set up 360° video projection
   */
  setup360Projection(viewer) {
    // Create sphere geometry for 360° projection
    const sphere = this.createSphereGeometry();
    
    // Apply video texture to sphere
    const videoTexture = this.createVideoTexture(viewer.videoElement);
    
    // Set up camera controls for looking around
    const controls = this.setupCameraControls(viewer.container);
    
    viewer.geometry = sphere;
    viewer.texture = videoTexture;
    viewer.controls = controls;
  }

  /**
   * Add interactive hotspots to 360° video
   */
  addHotspots(viewer, hotspots) {
    hotspots.forEach(hotspot => {
      const hotspotElement = this.createHotspotElement(hotspot);
      
      // Position hotspot in 3D space
      this.positionHotspot(hotspotElement, hotspot.position);
      
      // Add click handler
      hotspotElement.addEventListener('click', () => {
        this.handleHotspotClick(hotspot);
      });
      
      viewer.hotspots = viewer.hotspots || [];
      viewer.hotspots.push(hotspotElement);
    });
  }

  /**
   * Handle hotspot interactions
   */
  handleHotspotClick(hotspot) {
    switch (hotspot.type) {
      case 'room_navigation':
        this.navigateToRoom(hotspot.targetRoom);
        break;
      case 'information':
        this.showInformation(hotspot.content);
        break;
      case 'ar_furniture':
        this.showFurnitureOptions(hotspot.furnitureCategory);
        break;
      case 'market_data':
        this.showMarketData(hotspot.dataType);
        break;
    }
  }

  /**
   * Set up spatial audio for 360° video
   */
  setupSpatialAudio(videoElement, spatialAudioData) {
    if (!('AudioContext' in window)) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(videoElement);
    const panner = audioContext.createPanner();
    
    // Configure spatial audio
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    
    // Connect audio nodes
    source.connect(panner);
    panner.connect(audioContext.destination);
    
    // Update audio position based on viewer orientation
    this.updateSpatialAudioPosition = (orientation) => {
      panner.setPosition(
        Math.sin(orientation.yaw),
        0,
        Math.cos(orientation.yaw)
      );
    };
  }

  /**
   * Get video data from S3
   */
  async getVideoData(videoId) {
    try {
      // Parse video ID to get property and room info
      const [propertyId, roomName, timestamp] = videoId.split('-');
      
      // Get video metadata from S3
      const listParams = {
        Bucket: this.bucketName,
        Prefix: `processed/${propertyId}/${roomName}/`
      };
      
      const objects = await this.s3.listObjectsV2(listParams).promise();
      
      if (objects.Contents.length === 0) {
        return null;
      }
      
      // Find the HLS manifest
      const hlsManifest = objects.Contents.find(obj => obj.Key.endsWith('.m3u8'));
      
      return {
        id: videoId,
        propertyId,
        roomName,
        timestamp,
        hlsUrl: `https://${this.bucketName}.s3.amazonaws.com/${hlsManifest.Key}`,
        formats: this.getAvailableFormats(objects.Contents),
        hotspots: await this.getVideoHotspots(videoId),
        spatialAudio: await this.getSpatialAudioData(videoId)
      };
      
    } catch (error) {
      console.error('Get video data error:', error);
      return null;
    }
  }

  /**
   * Select optimal video source based on device
   */
  selectOptimalVideoSource(videoData) {
    const userAgent = navigator.userAgent.toLowerCase();
    const isVRHeadset = this.detectVRHeadset();
    const isMobile = /mobile|android|iphone|ipad/.test(userAgent);
    
    if (isVRHeadset) {
      // Use 4K for VR headsets
      return {
        url: videoData.hlsUrl.replace('.m3u8', '_4k.m3u8'),
        quality: '4K',
        bitrate: 25000000
      };
    } else if (isMobile) {
      // Use 2K for mobile VR
      return {
        url: videoData.hlsUrl.replace('.m3u8', '_2k.m3u8'),
        quality: '2K',
        bitrate: 12000000
      };
    } else {
      // Use 1080p for web
      return {
        url: videoData.hlsUrl.replace('.m3u8', '_1080p.m3u8'),
        quality: '1080p',
        bitrate: 8000000
      };
    }
  }

  /**
   * Detect VR headset
   */
  detectVRHeadset() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /oculus|quest|vive|index|pico|varjo/.test(userAgent);
  }

  /**
   * Get video controls interface
   */
  getVideoControls() {
    return {
      play: () => this.currentVideo?.element.play(),
      pause: () => this.currentVideo?.element.pause(),
      seek: (time) => { if (this.currentVideo) this.currentVideo.element.currentTime = time; },
      setVolume: (volume) => { if (this.currentVideo) this.currentVideo.element.volume = volume; },
      enterVR: () => this.enterVRMode(),
      exitVR: () => this.exitVRMode(),
      toggleFullscreen: () => this.toggleFullscreen()
    };
  }

  /**
   * Enter VR mode
   */
  async enterVRMode() {
    if (!this.currentVideo || !this.videoPlayer.supportsVR) {
      return { success: false, error: 'VR not supported' };
    }

    try {
      // Request VR session
      const vrSession = await navigator.xr.requestSession('immersive-vr');
      
      // Switch video to VR mode
      this.currentVideo.vrMode = true;
      this.currentVideo.vrSession = vrSession;
      
      return { success: true, message: 'Entered VR mode' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Check VR support
   */
  checkVRSupport() {
    return 'xr' in navigator && 'requestSession' in navigator.xr;
  }

  /**
   * Check spatial audio support
   */
  checkSpatialAudioSupport() {
    return 'AudioContext' in window && 'PannerNode' in window;
  }

  /**
   * Get supported video formats
   */
  getSupportedFormats() {
    return {
      upload: ['mp4', 'mov', 'avi', 'mkv'],
      streaming: ['hls', 'dash'],
      quality: ['4K', '2K', '1080p', '720p'],
      features: ['360°', 'Spatial Audio', 'Interactive Hotspots', 'VR Mode']
    };
  }

  /**
   * Get processing status
   */
  async getProcessingStatus(jobId) {
    try {
      const job = await this.mediaConvert.getJob({ Id: jobId }).promise();
      return {
        status: job.Job.Status,
        progress: job.Job.JobPercentComplete,
        createdAt: job.Job.CreatedAt,
        finishedAt: job.Job.FinishedAt
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}

// Export singleton instance
const video360Service = new Video360Service();
export default video360Service;
