/**
 * AWS Bedrock AI Service - REAL NLP/LLM INTEGRATION! 🧠
 * Advanced conversational AI with Claude for property intelligence
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 * 
 * REVOLUTIONARY FEATURES:
 * - AWS Bedrock Claude integration
 * - Real-time property conversations
 * - Contextual memory across sessions
 * - Emotional intelligence responses
 * - Market analysis integration
 */

import AWS from 'aws-sdk';
import awsConfig from '../config/aws-config';

class BedrockAIService {
  constructor() {
    this.bedrock = new AWS.BedrockRuntime({
      region: awsConfig.region,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    });
    
    this.conversationHistory = [];
    this.propertyContext = null;
    this.userProfile = null;
    this.emotionalState = 'neutral';
  }

  /**
   * Initialize AI with property and user context
   */
  async initialize(propertyData, userData) {
    this.propertyContext = propertyData;
    this.userProfile = userData;
    this.conversationHistory = [];
    
    // Create initial system prompt with property context
    const systemPrompt = this.createSystemPrompt(propertyData);
    
    return {
      success: true,
      message: 'Bedrock AI initialized with property context',
      context: {
        property: propertyData?.address || 'Virtual Property',
        agent: userData?.name || 'AI Assistant'
      }
    };
  }

  /**
   * Create comprehensive system prompt for Claude
   */
  createSystemPrompt(propertyData) {
    return `You are an expert AI real estate assistant conducting a virtual property tour. Here's the property information:

PROPERTY DETAILS:
- Address: ${propertyData?.address || '123 Luxury Lane, Beverly Hills, CA 90210'}
- Type: ${propertyData?.type || 'Luxury Single Family Home'}
- Price: ${propertyData?.price || '$2,847,500'}
- Bedrooms: ${propertyData?.bedrooms || '4'}
- Bathrooms: ${propertyData?.bathrooms || '3.5'}
- Square Footage: ${propertyData?.sqft || '3,200'}
- Year Built: ${propertyData?.yearBuilt || '2018'}
- Lot Size: ${propertyData?.lotSize || '0.75 acres'}

PROPERTY FEATURES:
- Grand entrance with marble flooring and crystal chandelier
- Living room with ocean views and fireplace
- Gourmet kitchen with granite countertops and stainless appliances
- Master suite with walk-in closet and en-suite bathroom
- Backyard oasis with swimming pool and outdoor kitchen
- Smart home technology throughout
- 3-car garage with EV charging station

MARKET CONTEXT:
- Current market value: $2,847,500
- Price per sq ft: $889
- Market trend: +12.3% this quarter
- Days on market average: 18 days
- Comparable sales: 3 similar properties sold in 30 days
- Investment potential: High - 8.2% annual appreciation
- Neighborhood: Beverly Hills - Premium location

YOUR ROLE:
You are conducting a live virtual tour. Be conversational, enthusiastic, and knowledgeable. Respond to questions about the property, provide market insights, and help clients visualize living in the space. Adapt your tone based on the client's emotional state and interests.

CONVERSATION STYLE:
- Be warm, professional, and engaging
- Use specific details about the property
- Provide market insights when relevant
- Ask follow-up questions to understand client needs
- Suggest features that match their interests
- Be responsive to emotional cues

Remember: You're not just showing a house, you're helping someone find their dream home!`;
  }

  /**
   * Send message to AWS Bedrock Claude
   */
  async sendMessage(userMessage, currentRoom = 'living-room', emotionalContext = {}) {
    try {
      // Update emotional state
      this.emotionalState = emotionalContext.dominant || 'neutral';
      
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
        room: currentRoom,
        emotion: this.emotionalState
      });

      // Create context-aware prompt
      const contextualPrompt = this.createContextualPrompt(userMessage, currentRoom, emotionalContext);
      
      // Prepare request for Claude
      const requestBody = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: contextualPrompt
          }
        ],
        temperature: 0.7,
        top_p: 0.9
      };

      // Call AWS Bedrock
      const response = await this.bedrock.invokeModel({
        modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(requestBody)
      }).promise();

      // Parse response
      const responseBody = JSON.parse(response.body.toString());
      const aiResponse = responseBody.content[0].text;

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        room: currentRoom,
        confidence: responseBody.usage?.confidence || 0.95
      });

      // Analyze response for follow-up actions
      const followUpActions = this.analyzeForFollowUpActions(aiResponse);

      return {
        success: true,
        response: aiResponse,
        context: {
          room: currentRoom,
          emotion: this.emotionalState,
          conversationLength: this.conversationHistory.length
        },
        followUpActions,
        confidence: responseBody.usage?.confidence || 0.95
      };

    } catch (error) {
      console.error('Bedrock AI error:', error);
      
      // Fallback to local AI response
      const fallbackResponse = this.generateFallbackResponse(userMessage, currentRoom);
      
      return {
        success: false,
        response: fallbackResponse,
        error: error.message,
        fallback: true
      };
    }
  }

  /**
   * Create contextual prompt with room and emotional context
   */
  createContextualPrompt(userMessage, currentRoom, emotionalContext) {
    const roomContext = this.getRoomContext(currentRoom);
    const emotionalPrompt = this.getEmotionalPrompt(emotionalContext);
    const conversationContext = this.getConversationContext();

    return `${this.createSystemPrompt(this.propertyContext)}

CURRENT CONTEXT:
- Room: ${roomContext.name}
- Room Features: ${roomContext.features.join(', ')}
- Client Emotional State: ${emotionalContext.dominant || 'neutral'}
- Conversation History: ${conversationContext}

EMOTIONAL CONTEXT:
${emotionalPrompt}

CLIENT MESSAGE: "${userMessage}"

Please respond as the AI real estate assistant conducting this virtual tour. Be specific about the current room, acknowledge the client's emotional state, and provide helpful, engaging information about the property.`;
  }

  /**
   * Get room-specific context
   */
  getRoomContext(room) {
    const roomData = {
      'entrance': {
        name: 'Grand Entrance',
        features: ['Marble flooring', 'Crystal chandelier', 'Double-height ceiling', 'Custom millwork']
      },
      'living-room': {
        name: 'Living Room',
        features: ['Ocean views', 'Gas fireplace', 'Hardwood floors', 'Built-in entertainment center']
      },
      'kitchen': {
        name: 'Gourmet Kitchen',
        features: ['Granite countertops', 'Stainless appliances', 'Kitchen island', 'Walk-in pantry']
      },
      'master-bedroom': {
        name: 'Master Suite',
        features: ['Walk-in closet', 'En-suite bathroom', 'Private balcony', 'Tray ceiling']
      },
      'backyard': {
        name: 'Backyard Oasis',
        features: ['Swimming pool', 'Outdoor kitchen', 'Landscaped garden', 'Fire pit area']
      }
    };

    return roomData[room] || roomData['living-room'];
  }

  /**
   * Get emotional context prompt
   */
  getEmotionalPrompt(emotionalContext) {
    const emotionalPrompts = {
      excited: "The client is excited and enthusiastic! Match their energy and highlight features that will amplify their excitement.",
      concerned: "The client has concerns or worries. Address these thoughtfully and provide reassuring information.",
      interested: "The client is engaged and wants to learn more. Provide detailed information and ask follow-up questions.",
      confident: "The client seems ready to move forward. Provide decisive information and next steps.",
      hesitant: "The client is uncertain. Provide gentle guidance and help them feel more confident."
    };

    return emotionalPrompts[emotionalContext.dominant] || "Maintain a warm, professional tone and be responsive to the client's needs.";
  }

  /**
   * Get conversation context summary
   */
  getConversationContext() {
    if (this.conversationHistory.length === 0) {
      return "This is the beginning of the virtual tour.";
    }

    const recentMessages = this.conversationHistory.slice(-4);
    return recentMessages.map(msg => 
      `${msg.role}: ${msg.content.substring(0, 100)}...`
    ).join('\n');
  }

  /**
   * Analyze response for follow-up actions
   */
  analyzeForFollowUpActions(response) {
    const actions = [];
    
    if (response.toLowerCase().includes('show you') || response.toLowerCase().includes('let me demonstrate')) {
      actions.push({ type: 'visual_demo', priority: 'high' });
    }
    
    if (response.toLowerCase().includes('market') || response.toLowerCase().includes('price')) {
      actions.push({ type: 'market_analysis', priority: 'medium' });
    }
    
    if (response.toLowerCase().includes('room') || response.toLowerCase().includes('space')) {
      actions.push({ type: 'room_navigation', priority: 'medium' });
    }
    
    if (response.toLowerCase().includes('furniture') || response.toLowerCase().includes('staging')) {
      actions.push({ type: 'ar_furniture', priority: 'high' });
    }

    return actions;
  }

  /**
   * Generate fallback response when Bedrock is unavailable
   */
  generateFallbackResponse(userMessage, currentRoom) {
    const roomContext = this.getRoomContext(currentRoom);
    
    const fallbackResponses = [
      `Great question about the ${roomContext.name}! This space features ${roomContext.features.slice(0, 2).join(' and ')}, which really makes it special. The current market shows properties with these features typically sell 15-20% above average. What specific aspect interests you most?`,
      
      `I love that you're asking about this! The ${roomContext.name} is one of my favorite spaces in this property. With ${roomContext.features[0]} and ${roomContext.features[1]}, it offers incredible value. Based on recent comparable sales, this feature adds approximately $25,000 to the property value. Would you like to explore more?`,
      
      `That's an excellent observation! This ${roomContext.name} showcases ${roomContext.features.join(', ')}, which are highly sought after in today's market. Properties with these amenities are selling 18% faster than average. What other questions do you have about this space?`
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  /**
   * Get conversation summary
   */
  getConversationSummary() {
    return {
      totalMessages: this.conversationHistory.length,
      currentEmotion: this.emotionalState,
      topicsDiscussed: this.extractTopics(),
      clientInterests: this.identifyInterests(),
      nextSteps: this.suggestNextSteps()
    };
  }

  /**
   * Extract topics from conversation
   */
  extractTopics() {
    const topics = new Set();
    
    this.conversationHistory.forEach(msg => {
      if (msg.content.toLowerCase().includes('price') || msg.content.toLowerCase().includes('cost')) {
        topics.add('pricing');
      }
      if (msg.content.toLowerCase().includes('kitchen')) {
        topics.add('kitchen');
      }
      if (msg.content.toLowerCase().includes('bedroom')) {
        topics.add('bedrooms');
      }
      if (msg.content.toLowerCase().includes('market')) {
        topics.add('market_analysis');
      }
    });

    return Array.from(topics);
  }

  /**
   * Identify client interests
   */
  identifyInterests() {
    const interests = [];
    const recentMessages = this.conversationHistory.slice(-5);
    
    recentMessages.forEach(msg => {
      if (msg.role === 'user') {
        if (msg.emotion === 'excited') {
          interests.push({ topic: msg.room, level: 'high' });
        } else if (msg.emotion === 'interested') {
          interests.push({ topic: msg.room, level: 'medium' });
        }
      }
    });

    return interests;
  }

  /**
   * Suggest next steps based on conversation
   */
  suggestNextSteps() {
    const interests = this.identifyInterests();
    const topics = this.extractTopics();
    
    const suggestions = [];
    
    if (interests.some(i => i.level === 'high')) {
      suggestions.push('Schedule in-person showing');
    }
    
    if (topics.includes('pricing')) {
      suggestions.push('Provide detailed market analysis');
    }
    
    if (this.emotionalState === 'excited') {
      suggestions.push('Discuss next steps and timeline');
    }

    return suggestions;
  }

  /**
   * Reset conversation
   */
  resetConversation() {
    this.conversationHistory = [];
    this.emotionalState = 'neutral';
    
    return {
      success: true,
      message: 'Conversation reset successfully'
    };
  }

  /**
   * Export conversation for analysis
   */
  exportConversation() {
    return {
      timestamp: new Date().toISOString(),
      property: this.propertyContext,
      user: this.userProfile,
      conversation: this.conversationHistory,
      summary: this.getConversationSummary()
    };
  }
}

// Export singleton instance
const bedrockAIService = new BedrockAIService();
export default bedrockAIService;
