'use client';

import { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import { fetchAPI } from '@/app/(api)/api';
import Footer from '@/components/layout-cpmt/footer';
import Header from '@/components/layout-cpmt/header';
import { msalInitialized, msalInstance } from '../lib-ce';

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="-3 0 262 262" aria-hidden="true">
      <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
    </svg>
  );
}

export default function BuyerLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [step, setStep] = useState('email');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUser, setIsUser] = useState(null);
  const router = useRouter();

  useEffect(() => setIsUser(Boolean(localStorage.getItem('user'))), []);

  const saveSession = (session) => {
    if (!session?.access || !session?.refresh || !session?.user) {
      throw new Error('Sign-in was successful, but no valid session was returned.');
    }
    localStorage.setItem('refresh', session.refresh);
    localStorage.setItem('access', session.access);
    localStorage.setItem('user', JSON.stringify(session.user));
    router.push('/');
  };

  function continueWithEmail(event) {
    event.preventDefault();
    setError('');
    if (!form.username.trim()) return setError('Enter your email address to continue.');
    setStep('password');
  }

  async function handlePasswordLogin(event) {
    event.preventDefault();
    setError('');
    if (!form.password) return setError('Enter your password to continue.');
    setIsLoading(true);
    try {
      // The current API expects the account identifier under `username`.
      saveSession(await fetchAPI('token', 'POST', form));
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin(response) {
    setError('');
    setIsLoading(true);
    try {
      saveSession(await fetchAPI('google-login', 'POST', { token: response.credential }));
    } catch (err) {
      console.error('Google login error:', err);
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMicrosoftLogin() {
    setError('');
    setIsLoading(true);
    try {
      await msalInitialized;
      const response = await msalInstance.loginPopup({ scopes: ['openid', 'profile', 'email'], prompt: 'select_account' });
      msalInstance.setActiveAccount(response.account);
      saveSession(await fetchAPI('microsoft-login', 'POST', { token: response.idToken }));
    } catch (err) {
      if (err?.errorCode !== 'user_cancelled') {
        console.error('Microsoft login error:', err);
        setError(err?.errorMessage || 'Microsoft sign-in failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    setError('');
    setIsLoading(true);
    try {
      const response = await fetchAPI(
        'logout',
        'POST',
        { refresh: localStorage.getItem('refresh') },
        true,
        false,
        false,
      );

      if (!response.ok) throw new Error('Unable to end this session. Please try again.');

      localStorage.removeItem('refresh');
      localStorage.removeItem('access');
      localStorage.removeItem('user');
      setForm({ username: '', password: '' });
      setStep('email');
      setIsUser(false);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message || 'Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const emailStep = (
    <>
      <div className="mb-7 text-center">
        <p className="text-sm font-medium text-indigo-600">Welcome back</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Sign in to TradeB2B</h1>
        <p className="mt-2 text-sm text-slate-500">Use your business email to continue.</p>
      </div>

      <form onSubmit={continueWithEmail} className="space-y-4">
        <label className="block text-sm font-medium text-slate-700" htmlFor="email">Email address</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" disabled={isLoading} required autoFocus />
        </div>
        <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70">
          Continue with email <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="my-7 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200" />or continue with<span className="h-px flex-1 bg-slate-200" /></div>
      <div className="space-y-3">
        <div className="google-login-wrap relative">
          <div className="pointer-events-none flex h-11 items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-700"><GoogleMark />Continue with Google</div>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError('Google sign-in failed. Please try again.')} useOneTap={false} width="392" theme="outline" text="continue_with" />
        </div>
        <button type="button" onClick={handleMicrosoftLogin} disabled={isLoading} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:opacity-70"><span className="grid h-[18px] w-[18px] grid-cols-2 gap-px"><i className="bg-[#f35325]" /><i className="bg-[#81bc06]" /><i className="bg-[#05a6f0]" /><i className="bg-[#ffba08]" /></span>Continue with Microsoft</button>
      </div>
    </>
  );

  const passwordStep = (
    <>
      <button type="button" onClick={() => { setStep('email'); setError(''); }} className="mb-6 flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-indigo-600"><ArrowLeft className="h-4 w-4" />Use a different email</button>
      <div className="mb-7">
        <p className="text-sm font-medium text-indigo-600">Welcome back</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Enter your password</h1>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><Mail className="h-4 w-4" />{form.username}</p>
      </div>
      <form onSubmit={handlePasswordLogin} className="space-y-4">
        <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input id="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" disabled={isLoading} required autoFocus />
        </div>
        <div className="text-right"><a href="/forgot-password" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</a></div>
        <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70">{isLoading ? <><Loader2 className="h-5 w-5 animate-spin" />Signing in…</> : <>Sign in <ArrowRight className="h-4 w-4" /></>}</button>
      </form>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50" style={{ background: 'radial-gradient(circle at top left, #e0e7ff 0, transparent 34%), radial-gradient(circle at bottom right, #dbeafe 0, transparent 30%)' }}>
      <Header elements={[<a key="signup" href="/signup" className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-white transition hover:bg-indigo-700"><UserPlus className="h-4 w-4" />Create account</a>]} />
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6" >
        {isUser === null ? <Loader2 className="h-6 w-6 animate-spin text-indigo-600" /> : isUser ? (
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60"><CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" /><h1 className="mt-4 text-xl font-bold text-slate-900">You’re already signed in</h1><p className="mt-2 text-sm text-slate-500">Continue to your TradeB2B workspace.</p>{error && <div role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}<button onClick={() => router.push('/')} className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Go to dashboard</button><button onClick={handleLogout} disabled={isLoading} className="ml-4 mt-6 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-70">{isLoading ? 'Signing out…' : 'Logout'}</button></div>
        ) : (
          <section className="w-full max-w-md rounded-2xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8">
            <div className="mb-8 flex items-center gap-3"><Image src="/tradeb2b__.png" alt="TradeB2B" width={42} height={42} className="rounded-lg" /><span className="text-lg font-extrabold tracking-tight text-slate-900">Trade<span className="text-indigo-600">B2B</span></span></div>
            {error && <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}
            {step === 'email' ? emailStep : passwordStep}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400"><ShieldCheck className="h-4 w-4" />Your information is protected and secure.</div>
          </section>
        )}
      </main>
      <Footer />
      <style>{`.google-login-wrap > div:last-child { position:absolute; inset:0; opacity:0; width:100% !important; height:44px !important; } .google-login-wrap iframe { width:100% !important; height:44px !important; }`}</style>
    </div>
  );
}
