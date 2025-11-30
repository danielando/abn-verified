// Google Analytics Event Tracking Utilities

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

/**
 * Track user sign-up (conversion event)
 */
export const trackSignUp = (method: 'email' | 'google' | 'microsoft') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      method: method,
    });
    console.log('[Analytics] Sign-up tracked:', method);
  }
};

/**
 * Track successful purchase (PAYG packs)
 */
export const trackPurchase = (params: {
  transactionId: string;
  value: number;
  currency: string;
  itemId: string;
  itemName: string;
  quantity: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: params.transactionId,
      value: params.value,
      currency: params.currency,
      items: [
        {
          item_id: params.itemId,
          item_name: params.itemName,
          price: params.value,
          quantity: params.quantity,
        },
      ],
    });
    console.log('[Analytics] Purchase tracked:', params);
  }
};

/**
 * Track subscription start (conversion event)
 */
export const trackSubscription = (params: {
  planId: string;
  planName: string;
  value: number;
  currency: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      value: params.value,
      currency: params.currency,
      items: [
        {
          item_id: params.planId,
          item_name: params.planName,
          price: params.value,
          quantity: 1,
        },
      ],
    });
    console.log('[Analytics] Subscription tracked:', params);
  }
};

/**
 * Track CSV file upload (engagement event)
 */
export const trackFileUpload = (fileName: string, rowCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_upload', {
      file_name: fileName,
      row_count: rowCount,
    });
    console.log('[Analytics] File upload tracked:', fileName, rowCount);
  }
};

/**
 * Track ABN verification completion (engagement event)
 */
export const trackVerificationComplete = (params: {
  totalRecords: number;
  successfulVerifications: number;
  failedVerifications: number;
  creditsUsed: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'verification_complete', {
      total_records: params.totalRecords,
      successful: params.successfulVerifications,
      failed: params.failedVerifications,
      credits_used: params.creditsUsed,
    });
    console.log('[Analytics] Verification complete tracked:', params);
  }
};

/**
 * Track when user clicks "Add Credits" (funnel event)
 */
export const trackAddCreditsClick = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_credits_click', {});
    console.log('[Analytics] Add credits click tracked');
  }
};
