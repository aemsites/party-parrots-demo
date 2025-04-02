/* eslint-disable import/no-cycle */

export async function createSession(
  createSessionEndpoint,
  createSessionRequest,
) {
  const options = {
    method: 'POST',
    body: JSON.stringify(createSessionRequest),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  try {
    const response = await fetch(createSessionEndpoint, options);
    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
}

export async function mountPaymentDropin(configuration, mountId) {
  if (typeof window.AdyenWeb.AdyenCheckout !== 'function') {
    throw new Error('AdyenCheckout is not loaded or initialized properly.');
  }

  await window.AdyenWeb.AdyenCheckout(configuration)
    .then((checkout) => {
      const dropin = new window.AdyenWeb.Dropin(checkout, {
        paymentMethodComponents: [window.AdyenWeb.Card],
      });
      dropin.mount(mountId);
    });
}
