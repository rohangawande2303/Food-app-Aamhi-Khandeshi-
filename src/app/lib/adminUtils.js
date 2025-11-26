// Admin configuration
export const ADMIN_EMAILS = [
    'admin@aamhikhandeshi.com'
];

// Check if user is admin
export const isAdmin = (userEmail) => {
    if (!userEmail) return false;
    return ADMIN_EMAILS.includes(userEmail.toLowerCase());
};

// Admin credentials for reference
// Email: admin@aamhikhandeshi.com
// Password: AamhiAdmin@2024
// Note: Create this account in Firebase Authentication
