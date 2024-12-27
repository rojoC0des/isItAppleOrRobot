/**
 * @fileoverview Device Detection and Store Redirect Script
 * This script automatically detects if a user is visiting from an iOS or Android device
 * and redirects them to their respective app stores. Compatible with older devices and browsers.
 * 
 * @version 1.0.0
 * @license MIT
 * @author Roger Morales "rojo"
 * @contact ra@rojo.codes
 * @website https://rojo.codes
 * @repository git@github.com:rojoC0des/isItAppleOrRobot.git
 * 
 * @lastModified ${new Date().toISOString().split('T')[0]}
 * 
 * @description
 * Features:
 * - iOS detection (iPhone, iPad, iPod)
 * - Android device detection
 * - Fallback support for older devices
 * - Error handling
 * - No external dependencies
 * 
 * @example
 * <script src="device-redirect.js"></script>
 * 
 * @compatibility
 * - iOS 6+
 * - Android 4+
 * - All major browsers (Chrome, Safari, Firefox, Edge)
 * - Legacy browser support
 */

// Device detection and store redirect script
(function() {

    // Modify HERE where it goes after detection
    const redirectTo = {
        android:"https://play.google.com",
        ios:"https://apple.com/app-store"
    }

    // Helper function to check user agent strings
    function checkUserAgent(pattern) {
        return pattern.test(navigator.userAgent.toLowerCase());
    }

    // Check for iOS devices (including older versions)
    function isIOS() {
        return checkUserAgent(/ip(hone|od|ad)/i) || 
               checkUserAgent(/ios/i) ||
               // Check for older iOS versions
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }

    // Check for Android devices (including older versions)
    function isAndroid() {
        return checkUserAgent(/android/i) ||
               checkUserAgent(/linux armv/i) || // Some older Android devices
               checkUserAgent(/linux aarch/i);   // Newer ARM-based Android
    }

    // Main redirect function
    function redirectToStore() {
        try {
            if (isIOS()) {
                window.location.href = redirectTo.ios;
            } else if (isAndroid()) {
                window.location.href = redirectTo.android;
            }
            // If neither iOS nor Android, do nothing
        } catch (e) {
            console.error('Store redirect failed:', e);
            // Fallback for very old browsers
            if (isIOS()) {
                window.open(redirectTo.ios, '_blank');
            } else if (isAndroid()) {
                window.open(redirectTo.android, '_blank');
            }
        }
    }

    // Execute redirect when the page loads
    if (document.readyState === 'complete') {
        redirectToStore();
    } else {
        window.addEventListener('load', redirectToStore);
    }
})();