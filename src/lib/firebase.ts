import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInAnonymously, 
  signOut as fbSignOut 
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// CRITICAL: The app will break without databaseId specified
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// DEMO_MODE:
// true = accesso anonimo Firebase (la demo funziona contro le regole chiuse).
// false = produzione: email/password reali; il ruolo autorevole deve arrivare
// da un custom claim impostato lato backend, non dal client.
export const DEMO_MODE = true;

function partnerCodeToEmail(partnerCode: string): string {
  const safe = partnerCode.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${safe}@partner.dolomitinordicski.local`;
}

export interface SignInResult { ok: boolean; error?: string; }

export async function partnerSignIn(partnerCode: string, password?: string): Promise<SignInResult> {
  try {
    if (DEMO_MODE) {
      await signInAnonymously(auth);
      return { ok: true };
    }
    await signInWithEmailAndPassword(auth, partnerCodeToEmail(partnerCode), password || 'demo1234');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function partnerSignOut(): Promise<void> {
  try { await fbSignOut(auth); } catch { /* noop */ }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection on startup
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'vouchers', '_test_connection_'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

testConnection();
