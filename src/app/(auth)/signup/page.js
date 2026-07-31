'use client';

import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AlertTriangle, ArrowLeft, ArrowRight, Loader2, LockKeyhole, Mail, ShieldCheck, User, UserRoundPlus } from 'lucide-react';
import { fetchAPI } from '@/app/(api)/api';
import Footer from '@/components/layout-cpmt/footer';
import Header from '@/components/layout-cpmt/header';
import { msalInitialized, msalInstance } from '../lib-ce';

function GoogleMark() {
  return <svg width="18" height="18" viewBox="-3 0 262 262" aria-hidden="true"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>;
}

export default function BuyerSignupPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', user_type: 'buyer', phone: '' });
  const [step, setStep] = useState('email');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  function continueWithEmail(event) {
    event.preventDefault();
    setError('');
    if (!form.email.trim()) return setError('Enter your email address to continue.');
    setStep('details');
  }

  async function createAccount(event) {
    event.preventDefault();
    setError('');
    if (!form.username || !form.password || !form.phone) return setError('Please complete all account details.');
    setIsLoading(true);
    try {
      const result = await fetchAPI('register', 'POST', form);
      localStorage.setItem('verfiy-email', form.email);
      router.push(`/otp-verify/?auth-token=${encodeURIComponent(result.otp_uuid)}&username=${encodeURIComponent(form.username)}`);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'We could not create your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function saveSocialSession(session) {
    if (!session?.access || !session?.refresh || !session?.user) throw new Error('Sign-up completed, but no valid session was returned.');
    localStorage.setItem('refresh', session.refresh);
    localStorage.setItem('access', session.access);
    localStorage.setItem('user', JSON.stringify(session.user));
    router.push('/');
  }

  async function handleGoogleSignup(response) {
    setError(''); setIsLoading(true);
    try { saveSocialSession(await fetchAPI('google-login', 'POST', { token: response.credential })); }
    catch (err) { console.error('Google sign-up error:', err); setError(err.message || 'Google sign-up failed. Please try again.'); }
    finally { setIsLoading(false); }
  }

  async function handleMicrosoftSignup() {
    setError(''); setIsLoading(true);
    try {
      await msalInitialized;
      const response = await msalInstance.loginPopup({ scopes: ['openid', 'profile', 'email'], prompt: 'select_account' });
      msalInstance.setActiveAccount(response.account);
      saveSocialSession(await fetchAPI('microsoft-login', 'POST', { token: response.idToken }));
    } catch (err) {
      if (err?.errorCode !== 'user_cancelled') { console.error('Microsoft sign-up error:', err); setError(err?.errorMessage || 'Microsoft sign-up failed. Please try again.'); }
    } finally { setIsLoading(false); }
  }

  const emailStep = <>
    <div className="mb-7 text-center"><p className="text-sm font-medium text-indigo-600">Create your account</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Join TradeB2B</h1><p className="mt-2 text-sm text-slate-500">Start with your business email.</p></div>
    <form onSubmit={continueWithEmail} className="space-y-4">
      <label className="block text-sm font-medium text-slate-700" htmlFor="email">Email address</label>
      <div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={update('email')} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" disabled={isLoading} required autoFocus /></div>
      <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-70">Continue with email <ArrowRight className="h-4 w-4" /></button>
    </form>
    <div className="my-7 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200" />or sign up with<span className="h-px flex-1 bg-slate-200" /></div>
    <div className="space-y-3">
      <div className="google-signup-wrap relative"><div className="pointer-events-none flex h-11 items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-700"><GoogleMark />Continue with Google</div><GoogleLogin onSuccess={handleGoogleSignup} onError={() => setError('Google sign-up failed. Please try again.')} useOneTap={false} width="392" theme="outline" text="continue_with" /></div>
      <button type="button" onClick={handleMicrosoftSignup} disabled={isLoading} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:opacity-70"><span className="grid h-[18px] w-[18px] grid-cols-2 gap-px"><i className="bg-[#f35325]" /><i className="bg-[#81bc06]" /><i className="bg-[#05a6f0]" /><i className="bg-[#ffba08]" /></span>Continue with Microsoft</button>
    </div>
  </>;

  const detailsStep = <>
    <button type="button" onClick={() => { setStep('email'); setError(''); }} className="mb-6 flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-indigo-600"><ArrowLeft className="h-4 w-4" />Use a different email</button>
    <div className="mb-6"><p className="text-sm font-medium text-indigo-600">Almost there</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Set up your account</h1><p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><Mail className="h-4 w-4" />{form.email}</p></div>
    <form onSubmit={createAccount} className="space-y-4">
      <label className="block text-sm font-medium text-slate-700" htmlFor="username">Username</label>
      <div className="relative"><User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="username" autoComplete="username" placeholder="Choose a username" value={form.username} onChange={update('username')} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" disabled={isLoading} required autoFocus /></div>
      <label className="block text-sm font-medium text-slate-700" htmlFor="phone">Phone number</label>
      <input id="phone" type="tel" autoComplete="tel" placeholder="Your phone number" value={form.phone} onChange={update('phone')} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" disabled={isLoading} required />
      <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
      <div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="password" type="password" autoComplete="new-password" placeholder="Create a password" value={form.password} onChange={update('password')} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" disabled={isLoading} required /></div>
      <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-70">{isLoading ? <><Loader2 className="h-5 w-5 animate-spin" />Creating account…</> : <>Create account <ArrowRight className="h-4 w-4" /></>}</button>
    </form>
  </>;

  return <div className="flex min-h-screen flex-col bg-slate-50">
    <Header elements={[<a key="login" href="/login" className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-white transition hover:bg-indigo-700"><UserRoundPlus className="h-4 w-4" />Sign in</a>]} />
    <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6" style={{ background: 'radial-gradient(circle at top left, #e0e7ff 0, transparent 34%), radial-gradient(circle at bottom right, #dbeafe 0, transparent 30%)' }}>
      <section className="w-full max-w-md rounded-2xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8"><div className="mb-8 flex items-center gap-3"><Image src="/T-light-v2.png" alt="TradeB2B" width={42} height={42} className="rounded-lg" /><span className="text-lg font-extrabold tracking-tight text-slate-900">Trade<span className="text-indigo-600">B2B</span></span></div>{error && <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}{step === 'email' ? emailStep : detailsStep}<div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400"><ShieldCheck className="h-4 w-4" />Your information is protected and secure.</div></section>
    </main>
    <Footer />
    <style>{`.google-signup-wrap > div:last-child { position:absolute; inset:0; opacity:0; width:100% !important; height:44px !important; } .google-signup-wrap iframe { width:100% !important; height:44px !important; }`}</style>
  </div>;
}
