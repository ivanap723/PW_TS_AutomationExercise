// Base URL for UI – single source: used by playwright.config and for full-URL assertions (e.g. SignupPage). Specs use baseURL from test context (which is set from this) + path constants below.
export const baseUrl = 'https://www.automationexercise.com/';
// Base URL for API (no www; used by endpoints)
export const apiBaseUrl = 'https://automationexercise.com/';

// Paths (relative to baseUrl)
export const loginPath = 'login';
export const productsPath = 'products';
export const productDetailsPath = 'product_details';
export const viewCartPath = 'view_cart';
export const checkoutPath = 'checkout';
export const paymentPath = 'payment';

//Billing info
export const CreditCardName = 'Peter Peterson';
export const CreditCardNumber = '1212 1212 1212 1212';
export const CVC = '123';
export const expiryMonth = '04';
export const expiryYear = '2028';

//products
export const firstProduct = 0;
export const secondProduct = 1;
export const thirdProduct = 2;
export const fourthProduct = 3;
