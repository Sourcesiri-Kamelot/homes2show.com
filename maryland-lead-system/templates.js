/**
 * Ethical Real Estate Outreach Templates
 * Maryland Lead Generation System
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */

const OUTREACH_TEMPLATES = {
  
  // 📞 INITIAL CONTACT TEMPLATES
  initialContact: {
    
    recentSale: {
      subject: "Congratulations on Your Recent Property Sale!",
      script: `Hi [OWNER_NAME], this is [AGENT_NAME] with [BROKERAGE]. I hope I'm not bothering you! I noticed through public records that you recently sold your property at [PROPERTY_ADDRESS]. Congratulations! I was wondering if you might be looking for another investment opportunity or if you know anyone else who might be interested in selling? I'd love to help you cash out on your dreams. Hope all is well with you and your family!`,
      followUp: 3 // days
    },

    expiredListing: {
      subject: "Your Property Listing - Still Available?",
      script: `Hello [OWNER_NAME], this is [AGENT_NAME] from [BROKERAGE]. I hope you're doing well! I came across your beautiful property at [PROPERTY_ADDRESS] through public records and noticed it was previously on the market. I was wondering if you're still interested in selling? I have some fresh marketing strategies that have been working really well in Maryland, and I'd love to help you achieve your real estate goals. Would you be open to a quick conversation about your options?`,
      followUp: 5 // days
    },

    highValueProperty: {
      subject: "Investment Opportunity - Your Property",
      script: `Hi [OWNER_NAME], this is [AGENT_NAME] with [BROKERAGE]. I hope I'm not catching you at a bad time! I was researching properties in [AREA] and came across your property at [PROPERTY_ADDRESS] through public records. The market in your area has been really strong lately, and I was wondering if you've ever considered what your property might be worth in today's market? I'd be happy to provide you with a free market analysis with no obligation. Hope all is well!`,
      followUp: 7 // days
    }
  },

  // 🔄 FOLLOW-UP TEMPLATES
  followUp: {
    
    firstFollowUp: {
      subject: "Following Up - Real Estate Opportunity",
      script: `Hi [OWNER_NAME], this is [AGENT_NAME] again from [BROKERAGE]. I called a few days ago about your property at [PROPERTY_ADDRESS]. I know you're probably busy, but I wanted to follow up because the market conditions right now are really favorable for sellers. I have several qualified buyers looking in your area. Would you have just 5 minutes to chat about your property? I promise I won't take up much of your time!`,
      followUp: 7 // days
    },

    secondFollowUp: {
      subject: "Market Update for Your Area",
      script: `Hello [OWNER_NAME], [AGENT_NAME] here from [BROKERAGE]. I hope you're having a great week! I wanted to reach out with a quick market update for your area around [PROPERTY_ADDRESS]. Properties in your neighborhood have been selling really well - some even above asking price! I thought you might be interested to know what's happening in your local market. Would you like me to send you a brief market report for your area?`,
      followUp: 14 // days
    },

    finalFollowUp: {
      subject: "Last Check-In - Your Property",
      script: `Hi [OWNER_NAME], this is [AGENT_NAME] from [BROKERAGE]. I've reached out a couple of times about your property at [PROPERTY_ADDRESS], and I don't want to be a bother. This will be my last call unless you'd like me to stay in touch. I just wanted you to know that if you ever decide to sell or need any real estate advice, I'm here to help. I hope everything is going well for you and your family. Take care!`,
      followUp: null // No more follow-ups
    }
  },

  // 💼 COMMERCIAL PROPERTY TEMPLATES
  commercial: {
    
    retailSpace: {
      subject: "Commercial Real Estate Opportunity",
      script: `Hello [OWNER_NAME], this is [AGENT_NAME] with [BROKERAGE]. I hope you're doing well! I specialize in commercial real estate here in Maryland, and I came across your retail property at [PROPERTY_ADDRESS] through public records. The commercial market has been really active lately, and I have several investors looking for properties just like yours. Would you be interested in hearing what similar properties in your area have been selling for?`,
      followUp: 10 // days
    },

    officeBuilding: {
      subject: "Office Building Investment Inquiry",
      script: `Hi [OWNER_NAME], this is [AGENT_NAME] from [BROKERAGE]. I hope I'm not interrupting your day! I work with commercial real estate investors throughout Maryland, and I noticed your office building at [PROPERTY_ADDRESS]. With the changing office market dynamics, many property owners are exploring their options. I'd love to provide you with a current market analysis to help you understand your property's position in today's market. Would that be helpful?`,
      followUp: 14 // days
    }
  },

  // 🏆 CLOSING CONVERSATION TEMPLATES
  closing: {
    
    interestedSeller: {
      subject: "Next Steps for Your Property Sale",
      script: `Hi [OWNER_NAME], thank you so much for taking the time to speak with me about your property at [PROPERTY_ADDRESS]. I'm excited about the opportunity to help you achieve your real estate goals! Based on our conversation, I think we can get you a great price in this market. When would be a good time for me to come by and do a proper market analysis? I can usually schedule something within the next day or two that works with your schedule.`,
      followUp: 2 // days
    },

    needsMoreInfo: {
      subject: "Information You Requested",
      script: `Hello [OWNER_NAME], this is [AGENT_NAME] following up on our conversation about your property at [PROPERTY_ADDRESS]. You mentioned you'd like to know more about [SPECIFIC_TOPIC]. I've put together some information that I think you'll find helpful. When would be a convenient time for me to drop by and go over this with you? I promise it will only take about 15-20 minutes of your time.`,
      followUp: 3 // days
    }
  },

  // 📧 EMAIL TEMPLATES
  email: {
    
    marketReport: {
      subject: "Free Market Report for [PROPERTY_ADDRESS]",
      content: `Dear [OWNER_NAME],

I hope this email finds you well! As promised, I've prepared a comprehensive market report for your property at [PROPERTY_ADDRESS].

Here are the key highlights:
• Current estimated market value: $[ESTIMATED_VALUE]
• Recent sales in your area: [RECENT_SALES_COUNT] properties
• Average days on market: [DAYS_ON_MARKET] days
• Market trend: [TREND_DIRECTION]

The Maryland real estate market has been [MARKET_CONDITION], and properties in your area are particularly sought after.

If you'd like to discuss these numbers or explore your options, I'd be happy to schedule a brief consultation at your convenience.

Best regards,
[AGENT_NAME]
[BROKERAGE]
[PHONE_NUMBER]
[EMAIL]

P.S. This information is based on public records and current market data. No obligation - just helpful information for a fellow Maryland property owner!`
    },

    thankYou: {
      subject: "Thank You for Your Time",
      content: `Dear [OWNER_NAME],

Thank you for taking the time to speak with me today about your property at [PROPERTY_ADDRESS]. I really appreciate your openness and the information you shared.

As we discussed, I'll [NEXT_STEPS] and get back to you by [FOLLOW_UP_DATE].

In the meantime, if you have any questions or if anything changes with your situation, please don't hesitate to reach out. I'm here to help in any way I can.

Looking forward to working with you!

Best regards,
[AGENT_NAME]
[BROKERAGE]
[PHONE_NUMBER]
[EMAIL]`
    }
  },

  // 📱 TEXT MESSAGE TEMPLATES
  sms: {
    
    quickFollowUp: {
      content: `Hi [OWNER_NAME], this is [AGENT_NAME] from [BROKERAGE]. Thanks for our conversation about [PROPERTY_ADDRESS]. Just wanted to follow up quickly - would [PROPOSED_TIME] work for that market analysis we discussed? Thanks!`
    },

    marketUpdate: {
      content: `Hi [OWNER_NAME]! [AGENT_NAME] here. Quick update: A property similar to yours at [PROPERTY_ADDRESS] just sold for $[SALE_PRICE] in [TIMEFRAME]. Thought you might find that interesting! Let me know if you'd like more details.`
    }
  }
};

// 🎯 TEMPLATE SELECTION LOGIC
const TEMPLATE_SELECTOR = {
  
  selectTemplate: function(leadType, contactAttempt, propertyType) {
    
    // Initial contact templates
    if (contactAttempt === 1) {
      switch(leadType) {
        case 'recent_sale':
          return OUTREACH_TEMPLATES.initialContact.recentSale;
        case 'expired_listing':
          return OUTREACH_TEMPLATES.initialContact.expiredListing;
        case 'high_value':
          return OUTREACH_TEMPLATES.initialContact.highValueProperty;
        default:
          return OUTREACH_TEMPLATES.initialContact.highValueProperty;
      }
    }
    
    // Follow-up templates
    if (contactAttempt === 2) {
      return OUTREACH_TEMPLATES.followUp.firstFollowUp;
    } else if (contactAttempt === 3) {
      return OUTREACH_TEMPLATES.followUp.secondFollowUp;
    } else if (contactAttempt >= 4) {
      return OUTREACH_TEMPLATES.followUp.finalFollowUp;
    }
    
    // Commercial property templates
    if (propertyType === 'commercial') {
      return OUTREACH_TEMPLATES.commercial.retailSpace;
    }
    
    return OUTREACH_TEMPLATES.initialContact.highValueProperty;
  },

  personalizeTemplate: function(template, leadData) {
    let personalizedScript = template.script;
    
    // Replace placeholders with actual data
    const replacements = {
      '[OWNER_NAME]': leadData.ownerName || 'there',
      '[AGENT_NAME]': leadData.agentName || 'John',
      '[BROKERAGE]': leadData.brokerage || 'Maryland Real Estate Solutions',
      '[PROPERTY_ADDRESS]': leadData.propertyAddress || 'your property',
      '[AREA]': leadData.area || 'your area',
      '[ESTIMATED_VALUE]': leadData.estimatedValue || 'competitive market value',
      '[PHONE_NUMBER]': leadData.agentPhone || '(555) 123-4567',
      '[EMAIL]': leadData.agentEmail || 'agent@example.com'
    };
    
    Object.keys(replacements).forEach(placeholder => {
      personalizedScript = personalizedScript.replace(
        new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 
        replacements[placeholder]
      );
    });
    
    return {
      ...template,
      script: personalizedScript,
      personalizedAt: new Date().toISOString()
    };
  }
};

// 📊 COMPLIANCE AND ETHICS
const COMPLIANCE_RULES = {
  
  // Do Not Call compliance
  respectDNC: true,
  
  // Maximum contact attempts
  maxContactAttempts: 4,
  
  // Minimum days between contacts
  minDaysBetweenContacts: 3,
  
  // Required disclaimers
  disclaimers: {
    publicRecords: "Information obtained from public records",
    noObligation: "No obligation - just helpful information",
    optOut: "Reply STOP to opt out of future communications"
  },
  
  // Ethical guidelines
  guidelines: [
    "Always be honest about how you obtained their information",
    "Respect their time and don't be pushy",
    "Provide genuine value in every interaction",
    "Honor opt-out requests immediately",
    "Keep detailed records of all communications"
  ]
};

export { OUTREACH_TEMPLATES, TEMPLATE_SELECTOR, COMPLIANCE_RULES };
