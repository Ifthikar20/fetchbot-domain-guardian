import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Finding, FindingEvidence } from '@/types/scan';

interface FindingCardProps {
  finding: Finding;
  index: number;
}

const severityColors = {
  critical: 'border-red-600 bg-red-50',
  high: 'border-orange-600 bg-orange-50',
  medium: 'border-yellow-600 bg-yellow-50',
  low: 'border-blue-600 bg-blue-50',
  info: 'border-gray-600 bg-gray-50',
};

const severityBadgeColors = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
  info: 'bg-gray-500',
};

export function FindingCard({ finding, index }: FindingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  // Check if evidence is an object with detailed information
  const hasDetailedEvidence = finding.evidence && typeof finding.evidence === 'object';
  const evidence = hasDetailedEvidence ? (finding.evidence as FindingEvidence) : null;

  const copyCurlCommand = () => {
    if (evidence?.curl_equivalent) {
      navigator.clipboard.writeText(evidence.curl_equivalent);
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    }
  };

  return (
    <div className={`border-l-4 rounded-lg shadow-md mb-4 overflow-hidden ${severityColors[finding.severity]}`}>
      {/* Collapsed View - Always Visible */}
      <div className="bg-white p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{finding.title}</h3>
            <p className="text-sm text-gray-600">{finding.description}</p>
          </div>
          <Badge className={`ml-4 ${severityBadgeColors[finding.severity]} text-white`}>
            {finding.severity.toUpperCase()}
          </Badge>
        </div>

        {/* Quick Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
          {finding.cvss_score && (
            <span className="flex items-center gap-1">
              <strong>CVSS:</strong> {finding.cvss_score}
            </span>
          )}
          <span className="flex items-center gap-1">
            <strong>Type:</strong> {finding.type}
          </span>
          <span className="flex items-center gap-1">
            <strong>Discovered by:</strong> {finding.discovered_by}
          </span>
        </div>

        {/* Affected URL */}
        <div className="bg-gray-100 p-2 rounded mb-3">
          <div className="text-xs text-gray-500 mb-1">AFFECTED URL</div>
          <code className="text-sm text-blue-600 break-all">{finding.url}</code>
        </div>

        {/* Expand/Collapse Button - Only show if we have detailed evidence */}
        {hasDetailedEvidence && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {isExpanded ? 'Hide' : 'Show'} Technical Evidence & Remediation
          </button>
        )}
      </div>

      {/* Expanded View - Shows WHERE and HOW */}
      {isExpanded && hasDetailedEvidence && evidence && (
        <div className="border-t border-gray-200">
          {/* Technical Evidence Section */}
          <div className="bg-gray-900 text-gray-100 p-6">
            <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
              🔍 WHERE & HOW We Found This
            </h4>

            {/* Step 1: Request Sent */}
            <div className="mb-6">
              <div className="text-sm text-green-400 uppercase font-semibold mb-2">
                STEP 1: Request Sent to Target
              </div>
              <div className="bg-black p-4 rounded-lg border border-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-mono text-sm">→</span>
                  <div className="flex-1">
                    <div className="text-yellow-300 font-mono text-sm mb-1">
                      {evidence.http_method || 'GET'} {evidence.vulnerable_url || finding.url}
                    </div>
                    {evidence.request_sent && (
                      <div className="text-gray-400 text-xs font-mono">
                        {evidence.request_sent}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: What We Tested (if injection test) */}
            {evidence.vulnerable_parameter && (
              <div className="mb-6">
                <div className="text-sm text-green-400 uppercase font-semibold mb-2">
                  STEP 2: Injection Point Tested
                </div>
                <div className="bg-black p-4 rounded-lg border border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Vulnerable Parameter</div>
                      <div className="text-red-400 font-mono">{evidence.vulnerable_parameter}</div>
                    </div>
                    {evidence.payload_used && (
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Payload Used</div>
                        <div className="text-yellow-300 font-mono break-all">{evidence.payload_used}</div>
                      </div>
                    )}
                  </div>
                  {evidence.injection_point && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="text-xs text-gray-400 mb-1">Injection Location</div>
                      <div className="text-purple-400 font-mono text-sm">{evidence.injection_point}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Response Received */}
            <div className="mb-6">
              <div className="text-sm text-green-400 uppercase font-semibold mb-2">
                STEP {evidence.vulnerable_parameter ? '3' : '2'}: Response Received from Server
              </div>
              <div className="bg-black p-4 rounded-lg border border-gray-700">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-green-400 font-mono text-sm">←</span>
                  <div className="flex-1">
                    <div className="text-green-300 font-mono text-sm">
                      HTTP {evidence.status_code || 200} {evidence.status_code === 200 ? 'OK' : ''}
                    </div>
                    {evidence.server && (
                      <div className="text-gray-400 text-xs">
                        Server: {evidence.server}
                      </div>
                    )}
                    {evidence.database_type && (
                      <div className="text-yellow-300 text-xs">
                        Database: {evidence.database_type}
                      </div>
                    )}
                  </div>
                </div>

                {/* Response Headers (for missing header findings) */}
                {evidence.response_headers && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="text-xs text-gray-400 mb-2">Response Headers Received:</div>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {Object.entries(evidence.response_headers).slice(0, 5).map(([key, value]) => (
                        <div key={key} className="font-mono text-xs">
                          <span className="text-blue-400">{key}:</span>{' '}
                          <span className="text-gray-300">{value}</span>
                        </div>
                      ))}
                    </div>
                    {evidence.missing_header && (
                      <div className="mt-2 pt-2 border-t border-red-900">
                        <div className="text-red-400 font-bold text-sm">
                          ❌ MISSING: {evidence.missing_header}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          This header was NOT found in the response, making the application vulnerable.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SQL Error Detection */}
                {evidence.sql_error_detected && (
                  <div className="mt-3 pt-3 border-t border-red-900">
                    <div className="text-xs text-gray-400 mb-2">Database Error Detected:</div>
                    <div className="bg-red-950 p-3 rounded border border-red-800">
                      <pre className="text-red-300 text-xs whitespace-pre-wrap font-mono">
                        {evidence.sql_error_detected}
                      </pre>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      ☝️ This error proves the application is vulnerable to SQL injection
                    </div>
                  </div>
                )}

                {/* XSS Payload Reflection */}
                {evidence.injection_context && (
                  <div className="mt-3 pt-3 border-t border-yellow-900">
                    <div className="text-xs text-gray-400 mb-2">Payload Reflected in Response:</div>
                    <div className="bg-yellow-950 p-3 rounded border border-yellow-800">
                      <pre className="text-yellow-200 text-xs whitespace-pre-wrap font-mono">
                        {evidence.injection_context}
                      </pre>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      ☝️ Our payload appears in the HTML, proving XSS vulnerability
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Conclusion */}
            <div className="mb-6">
              <div className="text-sm text-green-400 uppercase font-semibold mb-2">
                STEP {evidence.vulnerable_parameter ? '4' : '3'}: Vulnerability Confirmed
              </div>
              <div className="bg-black p-4 rounded-lg border border-red-700">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">⚠️</span>
                  <div className="flex-1">
                    <div className="text-red-400 font-bold mb-2">
                      {finding.title}
                    </div>
                    <div className="text-gray-300 text-sm mb-3">
                      {finding.description}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {evidence.detection_method && (
                        <div>
                          <span className="text-gray-400">Detection Method:</span>{' '}
                          <span className="text-purple-400">{evidence.detection_method}</span>
                        </div>
                      )}
                      {evidence.tool_used && (
                        <div>
                          <span className="text-gray-400">Tool Used:</span>{' '}
                          <span className="text-gray-300">{evidence.tool_used}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reproduce Command */}
            {evidence.curl_equivalent && (
              <div>
                <div className="text-sm text-green-400 uppercase font-semibold mb-2">
                  🔄 Reproduce This Finding
                </div>
                <div className="bg-black p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-purple-400 text-xs font-mono flex-1 break-all">
                      {evidence.curl_equivalent}
                    </code>
                    <button
                      onClick={copyCurlCommand}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors whitespace-nowrap"
                    >
                      {copiedCurl ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Run this command in your terminal to verify the vulnerability
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Remediation Section */}
          {finding.remediation && (
            <div className="bg-green-50 p-6 border-t border-green-200">
              <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                🛠️ How to Fix This
              </h4>

              {/* Quick Fix */}
              {finding.remediation.fix && (
                <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Solution:</div>
                  <p className="text-gray-700 text-sm">{finding.remediation.fix}</p>
                </div>
              )}

              {/* Example */}
              {finding.remediation.example && (
                <div className="mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Example:</div>
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <code className="text-green-400 text-sm font-mono break-all">
                      {finding.remediation.example}
                    </code>
                  </div>
                </div>
              )}

              {/* Platform-Specific Implementations */}
              {finding.remediation.implementation && Object.keys(finding.remediation.implementation).length > 0 && (
                <div className="mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Implementation by Platform:</div>
                  <div className="space-y-2">
                    {Object.entries(finding.remediation.implementation).map(([platform, code]) => (
                      <details key={platform} className="bg-white rounded-lg border border-gray-200">
                        <summary className="cursor-pointer p-3 hover:bg-gray-50 font-medium text-sm text-gray-700">
                          {platform.replace(/_/g, ' / ').toUpperCase()}
                        </summary>
                        <div className="p-3 border-t border-gray-200 bg-gray-50">
                          <code className="text-xs text-gray-800 block font-mono whitespace-pre-wrap">{code}</code>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Steps */}
              {finding.remediation.additional_steps && finding.remediation.additional_steps.length > 0 && (
                <div className="mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Additional Security Steps:</div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {finding.remediation.additional_steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* References */}
              {finding.remediation.references && finding.remediation.references.length > 0 && (
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Learn More:</div>
                  <div className="space-y-1">
                    {finding.remediation.references.map((ref, idx) => (
                      <a
                        key={idx}
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800 text-sm"
                      >
                        🔗 {ref}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Classification Footer */}
          {(finding.cwe || finding.owasp_category) && (
            <div className="bg-gray-100 p-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 text-sm">
                {finding.cwe && (
                  <div>
                    <span className="text-gray-600 font-semibold">CWE:</span>{' '}
                    <span className="text-gray-800">{finding.cwe}</span>
                  </div>
                )}
                {finding.owasp_category && (
                  <div>
                    <span className="text-gray-600 font-semibold">OWASP:</span>{' '}
                    <span className="text-gray-800">{finding.owasp_category}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
