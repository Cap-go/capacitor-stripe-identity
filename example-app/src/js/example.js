import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { Capacitor } from '@capacitor/core';
import { StripeIdentity } from '@capgo/capacitor-stripe-identity';

const publishableKeyInput = document.getElementById('publishableKey');
const initializeButton = document.getElementById('initializeButton');
const createOptionsInput = document.getElementById('createOptions');
const createButton = document.getElementById('createButton');
const presentButton = document.getElementById('presentButton');
const statusLine = document.getElementById('statusLine');
const outputLog = document.getElementById('outputLog');

const setStatus = (message) => {
  if (statusLine) statusLine.textContent = `Status: ${message}`;
};

const logResult = (data) => {
  if (outputLog) outputLog.textContent = JSON.stringify(data, null, 2);
};

const parseJsonInput = (inputElement, label) => {
  const raw = inputElement?.value?.trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${label} JSON invalid: ${message}`);
  }
};

initializeButton?.addEventListener('click', async () => {
  try {
    setStatus('Initializing...');
    const publishableKey = publishableKeyInput?.value?.trim();
    if (!publishableKey) throw new Error('Publishable key is required.');
    await StripeIdentity.initialize({ publishableKey });
    setStatus('Initialized');
    logResult({ initialized: true, publishableKey });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(`Initialize failed: ${message}`);
    logResult({ error: message });
  }
});

createButton?.addEventListener('click', async () => {
  try {
    setStatus('Creating verification sheet...');
    const options = parseJsonInput(createOptionsInput, 'Create options');
    await StripeIdentity.create(options);
    setStatus('Verification sheet created');
    logResult({ phase: 'create', options });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(`Create failed: ${message}`);
    logResult({ error: message });
  }
});

presentButton?.addEventListener('click', async () => {
  try {
    setStatus('Presenting verification sheet...');
    await StripeIdentity.present();
    setStatus('Verification sheet presented');
    logResult({ phase: 'present' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(`Present failed: ${message}`);
    logResult({ error: message });
  }
});

StripeIdentity.addListener('identityVerificationResult', (result) => {
  setStatus('Verification result received');
  logResult({ event: 'verificationResult', result });
}).catch(console.error);

if (Capacitor.isNativePlatform()) {
  CapacitorUpdater.notifyAppReady().catch((error) => {
    console.error('Capgo notifyAppReady failed', error);
  });
}
