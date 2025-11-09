# Backend Finding Response Format

This document describes the expected format for security findings to work with the expandable evidence feature in the frontend.

## Overview

When the backend returns findings in the scan response, each finding can now include detailed evidence and remediation information that will be displayed in an expandable step-by-step format showing WHERE and HOW the vulnerability was discovered.

## Basic Finding Format (Backward Compatible)

The frontend supports the simple format for backward compatibility:

```json
{
  "title": "Missing: Content-Security-Policy",
  "severity": "high",
  "type": "missing_header",
  "description": "CSP header not implemented",
  "discovered_by": "kali-agent-1",
  "url": "https://example.com/"
}
```

## Enhanced Finding Format (Recommended)

For detailed step-by-step vulnerability evidence:

```json
{
  "title": "Missing: Content-Security-Policy",
  "severity": "high",
  "type": "missing_header",
  "description": "Content Security Policy header not found, allowing potential XSS attacks",
  "discovered_by": "kali-agent-1",
  "url": "https://example.com/",

  "cvss_score": 6.5,
  "cwe": "CWE-1021: Improper Restriction of Rendered UI Layers or Frames",
  "owasp_category": "A05:2021 – Security Misconfiguration",

  "evidence": {
    "http_method": "GET",
    "status_code": 200,
    "server": "nginx/1.18.0",
    "detection_method": "HTTP Header Analysis",
    "tool_used": "FetchBot/kali-agent-1",
    "request_sent": "GET https://example.com/",
    "curl_equivalent": "curl -I https://example.com/",

    "response_headers": {
      "server": "nginx/1.18.0",
      "content-type": "text/html; charset=UTF-8",
      "date": "Sun, 09 Nov 2025 15:50:25 GMT",
      "x-powered-by": "PHP/7.4.3"
    },

    "missing_header": "Content-Security-Policy"
  },

  "remediation": {
    "fix": "Add Content Security Policy header to all HTTP responses",
    "example": "Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';",

    "implementation": {
      "nginx": "add_header Content-Security-Policy \"default-src 'self';\" always;",
      "apache": "Header always set Content-Security-Policy \"default-src 'self';\"",
      "express": "app.use(helmet.contentSecurityPolicy({directives: {defaultSrc: [\"'self'\"]}}));"
    },

    "additional_steps": [
      "Test CSP in report-only mode first",
      "Monitor CSP violation reports",
      "Gradually tighten CSP rules"
    ],

    "references": [
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
      "https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html"
    ]
  }
}
```

## Finding Types and Evidence Fields

### 1. Missing Security Headers

**Required evidence fields:**
- `http_method`: HTTP method used (GET, POST, etc.)
- `status_code`: Response status code
- `server`: Server type from response headers
- `response_headers`: Object containing response headers
- `missing_header`: Name of the missing header
- `detection_method`: "HTTP Header Analysis"
- `curl_equivalent`: curl command to reproduce

**Example:**
```json
{
  "evidence": {
    "http_method": "GET",
    "status_code": 200,
    "server": "nginx/1.18.0",
    "response_headers": {
      "server": "nginx/1.18.0",
      "content-type": "text/html"
    },
    "missing_header": "X-Frame-Options",
    "detection_method": "HTTP Header Analysis",
    "curl_equivalent": "curl -I https://example.com/"
  }
}
```

### 2. SQL Injection

**Required evidence fields:**
- `http_method`: HTTP method (usually POST)
- `vulnerable_url`: Full URL with vulnerable endpoint
- `vulnerable_parameter`: Parameter name that's vulnerable
- `payload_used`: SQL injection payload that was sent
- `injection_point`: Description of where payload was injected
- `status_code`: Response status code
- `sql_error_detected`: Actual database error message received
- `database_type`: Database type identified (MySQL, PostgreSQL, etc.)
- `detection_method`: "SQL Error Pattern Matching" or "Boolean-based Blind SQLi"
- `curl_equivalent`: curl command to reproduce

**Example:**
```json
{
  "evidence": {
    "http_method": "POST",
    "vulnerable_url": "https://example.com/login",
    "vulnerable_parameter": "username",
    "payload_used": "' OR '1'='1",
    "injection_point": "Form parameter: username",
    "status_code": 200,
    "sql_error_detected": "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version",
    "database_type": "MySQL/MariaDB",
    "detection_method": "SQL Error Pattern Matching",
    "tool_used": "FetchBot/kali-agent-1",
    "curl_equivalent": "curl -X POST https://example.com/login -d \"username=' OR '1'='1&password=test\""
  }
}
```

### 3. Cross-Site Scripting (XSS)

**Required evidence fields:**
- `http_method`: HTTP method
- `vulnerable_url`: Full URL
- `vulnerable_parameter`: Parameter name
- `payload_used`: XSS payload (e.g., `<script>alert(1)</script>`)
- `injection_point`: Where payload was injected
- `injection_context`: HTML snippet showing payload reflection with context
- `status_code`: Response status code
- `detection_method`: "Payload Reflection Analysis"
- `curl_equivalent`: curl command to reproduce

**Example:**
```json
{
  "evidence": {
    "http_method": "POST",
    "vulnerable_url": "https://example.com/search",
    "vulnerable_parameter": "q",
    "payload_used": "<script>alert(1)</script>",
    "injection_point": "Search form input",
    "injection_context": "<div class=\"results\">Your search: <script>alert(1)</script> returned 0 results</div>",
    "status_code": 200,
    "detection_method": "Payload Reflection Analysis",
    "curl_equivalent": "curl -X POST https://example.com/search -d 'q=<script>alert(1)</script>'"
  }
}
```

## Evidence Object Fields Reference

### Common Fields (All Findings)
- `http_method` (string): GET, POST, PUT, DELETE, etc.
- `status_code` (number): HTTP status code (200, 404, 500, etc.)
- `server` (string): Server type from response headers
- `detection_method` (string): How the vulnerability was detected
- `tool_used` (string): Agent or tool that discovered it
- `request_sent` (string): Human-readable request description
- `curl_equivalent` (string): curl command to reproduce

### Header-Related Fields
- `response_headers` (object): Key-value pairs of response headers
- `missing_header` (string): Name of missing security header

### Injection-Related Fields
- `vulnerable_url` (string): Full URL of vulnerable endpoint
- `vulnerable_parameter` (string): Name of vulnerable parameter
- `payload_used` (string): Attack payload that was sent
- `injection_point` (string): Description of injection location

### SQL Injection Fields
- `sql_error_detected` (string): Database error message
- `database_type` (string): MySQL, PostgreSQL, MSSQL, etc.

### XSS Fields
- `injection_context` (string): HTML snippet showing reflected payload

## Remediation Object Format

```json
{
  "fix": "Short description of the fix",
  "example": "Code example or configuration example",

  "implementation": {
    "platform_name": "platform-specific implementation code",
    "another_platform": "another implementation"
  },

  "additional_steps": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],

  "references": [
    "https://link-to-documentation",
    "https://another-reference"
  ]
}
```

### Common Platform Names
- `nginx`: Nginx web server
- `apache`: Apache web server
- `express`: Express.js (Node.js)
- `django`: Django (Python)
- `flask`: Flask (Python)
- `php_pdo`: PHP with PDO
- `java_jdbc`: Java JDBC
- `node_mysql`: Node.js MySQL
- `dotnet`: .NET/C#

## Frontend Display Flow

When a finding includes detailed evidence, the frontend will display:

### Collapsed State (Default)
- Finding title with severity badge
- CVSS score and type
- Affected URL
- "Show Technical Evidence & Remediation" button

### Expanded State (After Click)
Shows a step-by-step breakdown in a terminal-style dark interface:

**🔍 WHERE & HOW We Found This**

**STEP 1: Request Sent to Target**
- Shows the HTTP request made

**STEP 2: Injection Point Tested** (if applicable)
- Shows vulnerable parameter
- Shows payload used
- Shows injection location

**STEP 3: Response Received from Server**
- Shows HTTP response code
- Shows server type
- Shows response headers (for missing headers)
- Shows SQL error (for SQL injection)
- Shows payload reflection (for XSS)

**STEP 4: Vulnerability Confirmed**
- Shows the conclusion
- Shows detection method and tool

**🔄 Reproduce This Finding**
- Shows curl command with copy button

**🛠️ How to Fix This**
- Shows solution description
- Shows code examples
- Shows platform-specific implementations (collapsible)
- Shows additional security steps
- Shows reference links

## Best Practices for Backend

1. **Always provide curl_equivalent** - This allows security teams to verify findings
2. **Include actual error messages** - Don't sanitize SQL errors or other evidence
3. **Provide context** - For XSS, show surrounding HTML; for SQLi, show full error
4. **Be specific** - Name the exact parameter, URL, and payload used
5. **Include platform examples** - The more implementation examples, the better
6. **Add authoritative references** - Link to OWASP, MDN, vendor docs
7. **Calculate CVSS** - Include severity scores when possible
8. **Map to standards** - Provide CWE and OWASP Top 10 mappings

## Backward Compatibility

The frontend handles both formats:
- **Simple findings** (without detailed evidence): Display basic information only
- **Detailed findings** (with evidence object): Show expandable step-by-step breakdown

This allows gradual migration to the enhanced format without breaking existing functionality.
