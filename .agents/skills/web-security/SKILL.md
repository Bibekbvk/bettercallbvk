---
name: web-security
description: Guidelines and checklists to ensure website security, preventing common vulnerabilities (OWASP Top 10) and applying secure coding practices.
---

# Web Security Guidelines and Standards

Use this skill to assess and implement robust security measures for any web application. Follow these instructions strictly to ensure user data protection and application integrity.

## 1. Input Sanitization & Validation
*   **Validate All Inputs:** Never trust client-side inputs. Perform strict type, length, format, and range checking on both client and server sides.
*   **Use Parameterized Queries:** Prevent SQL Injection by using prepared statements/parameterized queries or ORM frameworks for database interactions.
*   **Sanitize HTML:** If rendering user-generated content, use a dedicated, well-audited library (e.g., DOMPurify) to sanitize HTML before rendering it in the DOM.

## 2. Preventing Cross-Site Scripting (XSS)
*   **Avoid Dangerous DOM APIs:** Avoid using `innerHTML`, `document.write()`, or direct `eval()`. Use secure alternatives like `textContent` or `innerText`.
*   **Context-Aware Escaping:** Escape variables before inserting them into HTML templates, attributes, or script blocks.
*   **Content Security Policy (CSP):** Always configure a strong Content Security Policy header. Restrict scripts to trusted sources and block inline scripts:
    ```http
    Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.com; object-src 'none';
    ```

## 3. Session Management & CSRF Protection
*   **Secure Cookies:** Set cookies with `Secure`, `HttpOnly`, and `SameSite=Strict` (or `SameSite=Lax`) attributes to mitigate session hijacking and Cross-Site Request Forgery (CSRF).
*   **CSRF Tokens:** Implement anti-CSRF tokens for all state-changing HTTP requests (POST, PUT, DELETE).
*   **Session Expiration:** Enforce reasonable session expiration limits and provide clear logout options.

## 4. HTTPS & Security Headers
*   **Enforce HTTPS:** Force all traffic over HTTPS. Use HTTP Strict Transport Security (HSTS):
    ```http
    Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
    ```
*   **Clickjacking Prevention:** Protect against clickjacking using the `X-Frame-Options` or CSP `frame-ancestors` directive:
    ```http
    X-Frame-Options: DENY
    ```
*   **MIME Sniffing Prevention:**
    ```http
    X-Content-Type-Options: nosniff
    ```
*   **Referrer Policy:** Control how much referrer information is shared:
    ```http
    Referrer-Policy: strict-origin-when-cross-origin
    ```

## 5. Dependency Audit
*   Regularly run security audits (e.g., `npm audit` or equivalent) to identify and patch vulnerabilities in third-party libraries. Keep packages updated.
