import React, { useState, useEffect } from 'react';
import { OUTREACH_TEMPLATES, TEMPLATE_SELECTOR } from '../templates';

/**
 * Maryland Real Estate Lead Dashboard
 * Standalone ethical lead generation and outreach management platform
 * Created by: Nyasha Bivins | Powered by: Helo IM AI Inc.
 */
const MarylandLeadDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - would come from AWS API in production
  const [mockLeads] = useState([
    {
      id: 'lead_001',
      ownerName: 'John Smith',
      propertyAddress: '123 Main St, Baltimore, MD 21201',
      propertyType: 'residential',
      leadScore: 85,
      leadType: 'expired_listing',
      lastSaleDate: '2023-03-15',
      lastSalePrice: 285000,
      currentValue: 295000,
      county: 'baltimore',
      contactAttempts: 0,
      lastContactDate: null,
      status: 'new',
      phone: '(410) 555-0123',
      email: 'john.smith@email.com'
    },
    {
      id: 'lead_002', 
      ownerName: 'Sarah Johnson',
      propertyAddress: '456 Oak Ave, Rockville, MD 20850',
      propertyType: 'residential',
      leadScore: 92,
      leadType: 'recent_sale',
      lastSaleDate: '2024-01-20',
      lastSalePrice: 450000,
      currentValue: 465000,
      county: 'montgomery',
      contactAttempts: 1,
      lastContactDate: '2024-02-01',
      status: 'contacted',
      phone: '(301) 555-0456',
      email: 'sarah.j@email.com'
    },
    {
      id: 'lead_003',
      ownerName: 'Commercial Properties LLC',
      propertyAddress: '789 Business Blvd, Annapolis, MD 21401',
      propertyType: 'commercial',
      leadScore: 78,
      leadType: 'high_value',
      lastSaleDate: '2022-11-10',
      lastSalePrice: 850000,
      currentValue: 875000,
      county: 'annearundel',
      contactAttempts: 0,
      lastContactDate: null,
      status: 'new',
      phone: '(410) 555-0789',
      email: 'info@commercialprops.com'
    }
  ]);

  useEffect(() => {
    // Simulate loading leads
    setTimeout(() => {
      setLeads(mockLeads);
      setIsLoading(false);
    }, 1000);
  }, [mockLeads]);

  // Filter leads based on type
  const filteredLeads = leads.filter(lead => {
    if (filterType === 'all') return true;
    if (filterType === 'high_score') return lead.leadScore >= 80;
    if (filterType === 'new') return lead.status === 'new';
    if (filterType === 'commercial') return lead.propertyType === 'commercial';
    return lead.propertyType === filterType;
  });

  // Select template for lead
  const handleSelectTemplate = (lead) => {
    const template = TEMPLATE_SELECTOR.selectTemplate(
      lead.leadType,
      lead.contactAttempts + 1,
      lead.propertyType
    );
    
    const personalizedTemplate = TEMPLATE_SELECTOR.personalizeTemplate(template, {
      ownerName: lead.ownerName,
      agentName: 'Your Name', // Would come from user profile
      brokerage: 'Your Brokerage', // Would come from user profile
      propertyAddress: lead.propertyAddress,
      area: lead.county,
      agentPhone: '(555) 123-4567', // Would come from user profile
      agentEmail: 'agent@yourbrokerage.com' // Would come from user profile
    });

    setSelectedLead(lead);
    setSelectedTemplate(personalizedTemplate);
  };

  // Mark lead as contacted
  const handleMarkContacted = (leadId) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            contactAttempts: lead.contactAttempts + 1,
            lastContactDate: new Date().toISOString().split('T')[0],
            status: 'contacted'
          }
        : lead
    ));
    setSelectedLead(null);
    setSelectedTemplate(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Maryland leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🏛️ Maryland Lead Pro
              </h1>
              <p className="text-gray-600 mt-1">
                Professional real estate lead generation for Maryland agents
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredLeads.length} Active Leads
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Leads List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Leads' },
                  { key: 'high_score', label: 'High Score (80+)' },
                  { key: 'new', label: 'New Leads' },
                  { key: 'residential', label: 'Residential' },
                  { key: 'commercial', label: 'Commercial' }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterType(filter.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterType === filter.key
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Cards */}
            <div className="space-y-4">
              {filteredLeads.map(lead => (
                <div key={lead.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">
                          {lead.ownerName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lead.leadScore >= 90 ? 'bg-green-100 text-green-800' :
                          lead.leadScore >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          Score: {lead.leadScore}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          lead.propertyType === 'commercial' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {lead.propertyType}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-2">
                        📍 {lead.propertyAddress}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <strong>Last Sale:</strong> {lead.lastSaleDate}
                        </div>
                        <div>
                          <strong>Sale Price:</strong> ${lead.lastSalePrice?.toLocaleString()}
                        </div>
                        <div>
                          <strong>Current Value:</strong> ${lead.currentValue?.toLocaleString()}
                        </div>
                        <div>
                          <strong>Contact Attempts:</strong> {lead.contactAttempts}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">
                          📞 {lead.phone}
                        </span>
                        <span className="text-gray-600">
                          📧 {lead.email}
                        </span>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      <button
                        onClick={() => handleSelectTemplate(lead)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        Get Script
                      </button>
                      
                      {lead.contactAttempts > 0 && (
                        <div className="text-xs text-gray-500 text-center">
                          Last: {lead.lastContactDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Panel */}
          <div className="lg:col-span-1">
            {selectedTemplate ? (
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    📞 Call Script
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedTemplate(null);
                      setSelectedLead(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Lead:</strong> {selectedLead?.ownerName}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Property:</strong> {selectedLead?.propertyAddress}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Contact Attempt:</strong> #{selectedLead?.contactAttempts + 1}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Script:</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedTemplate.script}
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      // Copy script to clipboard
                      navigator.clipboard.writeText(selectedTemplate.script);
                      alert('Script copied to clipboard!');
                    }}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    📋 Copy Script
                  </button>

                  <button
                    onClick={() => handleMarkContacted(selectedLead.id)}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    ✅ Mark as Contacted
                  </button>
                </div>

                {selectedTemplate.followUp && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Follow-up:</strong> Schedule next contact in {selectedTemplate.followUp} days
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Lead
                </h3>
                <p className="text-gray-600 text-sm">
                  Choose a lead from the list to get a personalized call script and outreach template.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarylandLeadDashboard;
