// TESSAVRA SITE ROUTES — Single source of truth for route architecture and navigation markup
// This file defines the complete site structure. Navigation and footer use this config.
// To regenerate nav/footer markup after changes, run: node routes-config.js

const ROUTES = {
  platform: {
    overview: { path: '/platform', label: 'Platform Overview' },
    pages: [
      { path: '/platform/conversation-intelligence', label: 'Conversation Intelligence' },
      { path: '/platform/quality-management', label: 'Quality Management' },
      { path: '/platform/voice-of-customer', label: 'Voice of Customer' },
      { path: '/platform/ux-research', label: 'UX & Research Intelligence' },
      { path: '/platform/workflow-pipelines', label: 'Workflow & Pipeline Engine' },
      { path: '/platform/governance', label: 'Evidence & Governance' },
    ],
    // Demoted nav items — sub-capabilities as anchors on owning pages
    anchors: [
      { path: '/platform/conversation-intelligence#interaction-explorer', label: 'Interaction Explorer' },
      { path: '/platform/conversation-intelligence#search-discovery', label: 'Search & Discovery' },
      { path: '/platform/quality-management#scorecards', label: 'Scorecards' },
      { path: '/platform/governance#evidence-governance', label: 'Evidence & Governance' },
      { path: '/platform/governance#policy-guardrails', label: 'Policy & Guardrails' },
    ]
  },
  solutions: {
    byTeam: [
      { path: '/solutions/customer-support', label: 'Customer Support' },
      { path: '/solutions/quality-assurance', label: 'Quality Assurance' },
      { path: '/solutions/customer-experience', label: 'Customer Experience' },
      { path: '/solutions/product-ux-research', label: 'Product & UX Research' },
    ],
    byOutcome: [
      { path: '/solutions/customer-support#improve-quality-coverage', label: 'Improve quality coverage' },
      { path: '/solutions/quality-assurance#coach-with-evidence', label: 'Coach with evidence' },
      { path: '/solutions/customer-support#find-recurring-issues', label: 'Find recurring issues' },
      { path: '/solutions/customer-experience#understand-customer-voice', label: 'Understand the customer voice' },
      { path: '/solutions/quality-assurance#create-reviewable-ai-findings', label: 'Create reviewable AI findings' },
    ]
  },
  integrations: {
    hub: { path: '/integrations', label: 'Integrations' },
    pages: [
      { path: '/integrations/salesforce', label: 'Salesforce' },
    ],
    // Categories anchored on hub page
    anchors: [
      { path: '/integrations#contact-centre-telephony', label: 'Contact Centre & Telephony' },
      { path: '/integrations#crm-systems', label: 'CRM Systems' },
      { path: '/integrations#meeting-research-tools', label: 'Meeting & Research Tools' },
      { path: '/integrations#files-apis-webhooks', label: 'Files, APIs & Webhooks' },
      { path: '/integrations#salesforce-workflows', label: 'Salesforce Workflows' },
      { path: '/integrations#data-warehouse-pipelines', label: 'Data Warehouse Pipelines' },
      { path: '/integrations#operational-system-sync', label: 'Operational System Sync' },
      { path: '/integrations#alerts-actions', label: 'Alerts & Actions' },
      { path: '/integrations#data-pipelines-automation', label: 'Data Pipelines & Automation' },
    ]
  },
  security: {
    page: { path: '/security', label: 'Security' },
    anchors: [
      { path: '/security#data-privacy', label: 'Data Privacy' },
      { path: '/security#access-controls', label: 'Access Controls' },
      { path: '/security#auditability', label: 'Auditability' },
      { path: '/security#responsible-ai', label: 'Responsible AI' },
      { path: '/security#subprocessors', label: 'Subprocessors' },
    ]
  },
  resources: {
    pages: [
      { path: '/how-it-works', label: 'How It Works' },
      { path: '/ai-info', label: 'Hey AI, learn about Tessavra' },
    ],
  },
  conversion: {
    pages: [
      { path: '/request-demo', label: 'Request a demo' },
      { path: '/contact', label: 'Contact' },
    ],
  }
};

// Generate navigation HTML (for manual insertion or static generation)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROUTES };
}
