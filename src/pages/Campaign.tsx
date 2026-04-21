import { useEffect } from "react";

const campaignHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project Greenfield — Iconic Investors | Your AFSL Home After SMSF Adviser Network</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
  <style>
    /* ─── Reset & Base ─── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: 'Inter', sans-serif;
      color: #1a3c2e;
      background: #f8f5f0;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4 { font-family: 'Playfair Display', serif; line-height: 1.25; }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }

    /* ─── CSS Variables ─── */
    :root {
      --green:  #1a3c2e;
      --green-mid: #235240;
      --green-light: #2d6b52;
      --gold:   #c9a84c;
      --gold-light: #d4b96a;
      --cream:  #f8f5f0;
      --cream-dark: #ede8df;
      --white:  #ffffff;
      --text-dark: #1a3c2e;
      --text-mid: #3a5a4a;
      --text-light: #6b8f7e;
      --shadow-sm: 0 1px 4px rgba(26,60,46,.08);
      --shadow-md: 0 4px 20px rgba(26,60,46,.12);
      --shadow-lg: 0 8px 40px rgba(26,60,46,.16);
      --radius: 12px;
      --radius-lg: 20px;
      --max-w: 1180px;
    }

    /* ─── Utilities ─── */
    .container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }
    .section { padding: 96px 0; }
    .section--sm { padding: 64px 0; }
    .section-label {
      display: inline-block;
      font-family: 'Inter', sans-serif;
      font-size: .75rem;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 12px;
    }
    .section-title {
      font-size: clamp(1.75rem, 3.5vw, 2.75rem);
      color: var(--green);
      margin-bottom: 16px;
    }
    .section-sub {
      font-size: 1.0625rem;
      color: var(--text-mid);
      max-width: 640px;
      line-height: 1.7;
    }

    /* ─── Button ─── */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Inter', sans-serif;
      font-size: .9375rem;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 8px;
      cursor: pointer;
      transition: all .2s ease;
      border: 2px solid transparent;
      text-decoration: none;
      white-space: nowrap;
    }
    .btn-primary {
      background: var(--gold);
      color: var(--green);
      border-color: var(--gold);
    }
    .btn-primary:hover { background: var(--gold-light); border-color: var(--gold-light); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,168,76,.35); }
    .btn-outline {
      background: transparent;
      color: var(--white);
      border-color: rgba(255,255,255,.5);
    }
    .btn-outline:hover { background: rgba(255,255,255,.08); border-color: var(--white); }
    .btn-green {
      background: var(--green);
      color: var(--white);
      border-color: var(--green);
    }
    .btn-green:hover { background: var(--green-mid); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,60,46,.3); }

    /* ─── NAV ─── */
    .nav {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(255,255,255,.97);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(26,60,46,.08);
      transition: box-shadow .2s;
    }
    .nav.scrolled { box-shadow: var(--shadow-md); }
    .nav__inner {
      max-width: var(--max-w);
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    .nav__logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .nav__logo-mark {
      width: 36px;
      height: 36px;
      background: var(--green);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .nav__logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--green);
      line-height: 1.1;
    }
    .nav__logo-sub {
      font-size: .6875rem;
      font-weight: 500;
      color: var(--gold);
      letter-spacing: .05em;
      text-transform: uppercase;
    }
    .nav__links {
      display: flex;
      align-items: center;
      gap: 8px;
      list-style: none;
    }
    .nav__links a {
      font-size: .875rem;
      font-weight: 500;
      color: var(--text-mid);
      padding: 8px 14px;
      border-radius: 6px;
      transition: color .15s, background .15s;
    }
    .nav__links a:hover { color: var(--green); background: rgba(26,60,46,.06); }
    .nav__cta { margin-left: 16px; }
    .nav__hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 8px;
      background: none;
      border: none;
    }
    .nav__hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--green);
      border-radius: 2px;
      transition: all .25s;
    }
    .nav__mobile {
      display: none;
      flex-direction: column;
      background: var(--white);
      border-top: 1px solid rgba(26,60,46,.08);
      padding: 12px 24px 20px;
      gap: 4px;
    }
    .nav__mobile.open { display: flex; }
    .nav__mobile a {
      font-size: .9rem;
      font-weight: 500;
      color: var(--text-mid);
      padding: 10px 0;
      border-bottom: 1px solid rgba(26,60,46,.06);
    }
    .nav__mobile a:last-child { border-bottom: none; }

    @media (max-width: 860px) {
      .nav__links, .nav__cta { display: none; }
      .nav__hamburger { display: flex; }
    }

    /* ─── HERO ─── */
    .hero {
      background: linear-gradient(135deg, var(--green) 0%, #0f2419 100%);
      position: relative;
      overflow: hidden;
      padding: 120px 0 100px;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -40%;
      right: -15%;
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, rgba(201,168,76,.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero::after {
      content: '';
      position: absolute;
      bottom: -20%;
      left: -10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(201,168,76,.07) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero__inner {
      position: relative;
      z-index: 1;
      max-width: var(--max-w);
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 64px;
      align-items: center;
    }
    .hero__badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(201,168,76,.15);
      border: 1px solid rgba(201,168,76,.3);
      border-radius: 100px;
      padding: 6px 16px;
      font-size: .8125rem;
      font-weight: 600;
      color: var(--gold);
      letter-spacing: .06em;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    .hero__badge-dot {
      width: 6px;
      height: 6px;
      background: var(--gold);
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: .5; transform: scale(.8); }
    }
    .hero__headline {
      font-size: clamp(2.25rem, 4.5vw, 3.5rem);
      font-weight: 700;
      color: var(--white);
      margin-bottom: 20px;
      line-height: 1.15;
    }
    .hero__headline em {
      font-style: italic;
      color: var(--gold);
    }
    .hero__sub {
      font-size: 1.0625rem;
      color: rgba(255,255,255,.78);
      line-height: 1.75;
      max-width: 520px;
      margin-bottom: 36px;
    }
    .hero__actions { display: flex; gap: 16px; flex-wrap: wrap; }
    .hero__card {
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: var(--radius-lg);
      padding: 36px 32px;
      backdrop-filter: blur(8px);
    }
    .hero__card-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      color: var(--white);
      margin-bottom: 6px;
    }
    .hero__card-sub {
      font-size: .8125rem;
      color: rgba(255,255,255,.55);
      margin-bottom: 24px;
    }
    .hero__card-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 28px;
    }
    .hero__card-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: .9rem;
      color: rgba(255,255,255,.85);
    }
    .hero__card-check {
      width: 20px;
      height: 20px;
      background: rgba(201,168,76,.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .hero__from {
      border-top: 1px solid rgba(255,255,255,.1);
      padding-top: 20px;
      font-size: .8125rem;
      color: rgba(255,255,255,.5);
    }
    .hero__from strong { color: rgba(255,255,255,.85); display: block; font-size: .875rem; }

    @media (max-width: 900px) {
      .hero__inner { grid-template-columns: 1fr; }
      .hero__card { display: none; }
    }

    /* ─── TRUST BAR ─── */
    .trustbar {
      background: var(--green);
      padding: 28px 0;
    }
    .trustbar__inner {
      max-width: var(--max-w);
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1px;
    }
    .trustbar__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px 16px;
      position: relative;
    }
    .trustbar__item + .trustbar__item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: rgba(255,255,255,.15);
    }
    .trustbar__value {
      font-family: 'Playfair Display', serif;
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--gold);
      line-height: 1;
      margin-bottom: 4px;
    }
    .trustbar__label {
      font-size: .8125rem;
      font-weight: 500;
      color: rgba(255,255,255,.75);
      letter-spacing: .02em;
    }
    @media (max-width: 640px) {
      .trustbar__inner { grid-template-columns: repeat(2, 1fr); }
      .trustbar__item:nth-child(3)::before { display: none; }
    }

    /* ─── WHY ICONIC ─── */
    .why { background: var(--white); }
    .why__header { text-align: center; margin-bottom: 56px; }
    .why__header .section-sub { margin: 0 auto; }
    .why__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .why__card {
      background: var(--cream);
      border: 1px solid rgba(26,60,46,.08);
      border-radius: var(--radius);
      padding: 32px 28px;
      transition: transform .2s, box-shadow .2s, border-color .2s;
    }
    .why__card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
      border-color: rgba(201,168,76,.3);
    }
    .why__icon {
      width: 52px;
      height: 52px;
      background: rgba(26,60,46,.06);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .why__card-title {
      font-size: 1.0625rem;
      font-weight: 700;
      color: var(--green);
      margin-bottom: 8px;
    }
    .why__card-desc {
      font-size: .9rem;
      color: var(--text-mid);
      line-height: 1.65;
    }
    @media (max-width: 860px) { .why__grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) { .why__grid { grid-template-columns: 1fr; } }

    /* ─── PROCESS ─── */
    .process { background: var(--cream); }
    .process__header { text-align: center; margin-bottom: 56px; }
    .process__steps {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0;
      position: relative;
    }
    .process__steps::before {
      content: '';
      position: absolute;
      top: 28px;
      left: calc(10% + 28px);
      right: calc(10% + 28px);
      height: 2px;
      background: linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,.3) 100%);
      z-index: 0;
    }
    .process__step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 12px;
      position: relative;
      z-index: 1;
    }
    .process__num {
      width: 56px;
      height: 56px;
      background: var(--green);
      border: 3px solid var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gold);
      margin-bottom: 16px;
      box-shadow: 0 0 0 3px var(--cream);
    }
    .process__step-title {
      font-size: .9rem;
      font-weight: 700;
      color: var(--green);
      margin-bottom: 6px;
    }
    .process__step-desc {
      font-size: .8125rem;
      color: var(--text-mid);
      line-height: 1.55;
    }
    @media (max-width: 860px) {
      .process__steps { grid-template-columns: 1fr; gap: 32px; }
      .process__steps::before { display: none; }
      .process__step { flex-direction: row; text-align: left; gap: 20px; }
      .process__num { flex-shrink: 0; margin-bottom: 0; }
    }

    /* ─── CONTACT FORM ─── */
    .contact { background: var(--white); }
    .contact__inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
    }
    .contact__left {}
    .contact__left .section-sub { margin-bottom: 32px; }
    .contact__promise {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .contact__promise-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: .9rem;
      color: var(--text-mid);
    }
    .contact__promise-icon {
      width: 36px;
      height: 36px;
      background: rgba(201,168,76,.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .contact__form {
      background: var(--cream);
      border: 1px solid rgba(26,60,46,.08);
      border-radius: var(--radius-lg);
      padding: 40px 36px;
      box-shadow: var(--shadow-sm);
    }
    .contact__form-title {
      font-size: 1.25rem;
      color: var(--green);
      margin-bottom: 4px;
    }
    .contact__form-sub {
      font-size: .875rem;
      color: var(--text-light);
      margin-bottom: 28px;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }
    .form-group.full { grid-column: 1 / -1; }
    label {
      font-size: .8125rem;
      font-weight: 600;
      color: var(--text-dark);
      letter-spacing: .02em;
    }
    .form-optional { font-weight: 400; color: var(--text-light); }
    input, select, textarea {
      font-family: 'Inter', sans-serif;
      font-size: .9rem;
      color: var(--text-dark);
      background: var(--white);
      border: 1.5px solid rgba(26,60,46,.18);
      border-radius: 8px;
      padding: 11px 14px;
      transition: border-color .15s, box-shadow .15s;
      outline: none;
      width: 100%;
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--green);
      box-shadow: 0 0 0 3px rgba(26,60,46,.08);
    }
    textarea { resize: vertical; min-height: 100px; }
    .form-submit { width: 100%; justify-content: center; margin-top: 8px; font-size: 1rem; padding: 16px; }
    .form-privacy {
      text-align: center;
      font-size: .75rem;
      color: var(--text-light);
      margin-top: 12px;
    }
    @media (max-width: 860px) {
      .contact__inner { grid-template-columns: 1fr; gap: 48px; }
    }
    @media (max-width: 560px) {
      .form-row { grid-template-columns: 1fr; }
      .contact__form { padding: 28px 20px; }
    }

    /* ─── CAMPAIGN MATERIALS HEADING ─── */
    .campaign-header {
      background: var(--green);
      padding: 72px 0 56px;
      text-align: center;
    }
    .campaign-header h2 {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      color: var(--white);
      margin-bottom: 12px;
    }
    .campaign-header p {
      font-size: 1rem;
      color: rgba(255,255,255,.65);
      max-width: 560px;
      margin: 0 auto;
    }

    /* ─── EMAIL SECTION ─── */
    .emails { background: var(--cream); }
    .emails__header { margin-bottom: 48px; }
    .emails__grid { display: flex; flex-direction: column; gap: 28px; }
    .email-card {
      background: var(--white);
      border: 1px solid rgba(26,60,46,.08);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }
    .email-card__header {
      background: var(--green);
      padding: 20px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .email-card__day {
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--gold);
      background: rgba(201,168,76,.15);
      border: 1px solid rgba(201,168,76,.3);
      border-radius: 100px;
      padding: 4px 12px;
    }
    .email-card__subject {
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      color: var(--white);
      flex: 1;
    }
    .email-card__subject span {
      font-size: .8125rem;
      color: rgba(255,255,255,.5);
      font-family: 'Inter', sans-serif;
      font-style: normal;
      display: block;
      margin-top: 2px;
    }
    .email-card__body {
      padding: 28px;
      font-size: .9rem;
      color: var(--text-mid);
      line-height: 1.75;
    }
    .email-card__body p { margin-bottom: 14px; }
    .email-card__body p:last-child { margin-bottom: 0; }
    .email-card__body strong { color: var(--text-dark); }
    .email-cta-line {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba(26,60,46,.08);
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .email-cta-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: .875rem;
      font-weight: 600;
      color: var(--green);
      border: 1.5px solid rgba(26,60,46,.2);
      border-radius: 6px;
      padding: 8px 16px;
      transition: all .15s;
    }
    .email-cta-link:hover { background: var(--green); color: var(--white); border-color: var(--green); }
    .email-list {
      list-style: none;
      margin: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .email-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .email-list-num {
      width: 22px;
      height: 22px;
      background: var(--gold);
      color: var(--green);
      border-radius: 50%;
      font-size: .75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* ─── SMS SECTION ─── */
    .sms { background: var(--white); }
    .sms__header { margin-bottom: 48px; }
    .sms__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
    .sms-device {
      background: var(--cream);
      border: 1px solid rgba(26,60,46,.08);
      border-radius: var(--radius-lg);
      padding: 28px 24px;
      box-shadow: var(--shadow-sm);
    }
    .sms-device__label {
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sms-device__screen {
      background: var(--white);
      border-radius: 16px;
      padding: 20px;
      border: 1px solid rgba(26,60,46,.1);
    }
    .sms-device__contact {
      font-size: .8125rem;
      font-weight: 600;
      color: var(--text-mid);
      margin-bottom: 16px;
      text-align: center;
    }
    .sms-bubble-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: flex-end;
    }
    .sms-bubble {
      background: var(--green);
      color: var(--white);
      border-radius: 18px 18px 4px 18px;
      padding: 12px 16px;
      font-size: .875rem;
      line-height: 1.55;
      max-width: 90%;
      word-break: break-word;
    }
    .sms-bubble a { color: var(--gold); text-decoration: underline; }
    .sms-timestamp {
      font-size: .7rem;
      color: var(--text-light);
      text-align: right;
      margin-top: 4px;
    }
    @media (max-width: 640px) { .sms__grid { grid-template-columns: 1fr; } }

    /* ─── LINKEDIN SECTION ─── */
    .linkedin { background: var(--cream); }
    .linkedin__header { margin-bottom: 48px; }
    .linkedin__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .li-card {
      background: var(--white);
      border: 1px solid rgba(26,60,46,.08);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
    }
    .li-card__header {
      background: #0a66c2;
      padding: 18px 22px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .li-card__type {
      font-size: .75rem;
      font-weight: 700;
      color: var(--white);
      letter-spacing: .06em;
      text-transform: uppercase;
    }
    .li-card__limit {
      font-size: .7rem;
      color: rgba(255,255,255,.55);
      margin-left: auto;
    }
    .li-card__body {
      padding: 22px;
      font-size: .875rem;
      color: var(--text-mid);
      line-height: 1.7;
      flex: 1;
    }
    .li-card__body p { margin-bottom: 10px; }
    .li-card__body p:last-child { margin-bottom: 0; }
    .li-card__subject {
      font-size: .875rem;
      font-weight: 600;
      color: var(--text-dark);
      background: rgba(26,60,46,.04);
      border-left: 3px solid var(--gold);
      padding: 8px 12px;
      margin-bottom: 14px;
      border-radius: 0 6px 6px 0;
    }
    @media (max-width: 860px) { .linkedin__grid { grid-template-columns: 1fr; } }

    /* ─── ONE-PAGER ─── */
    .onepager { background: var(--white); }
    .onepager__header { margin-bottom: 48px; }
    .onepager__frame {
      max-width: 800px;
      margin: 0 auto;
      background: var(--white);
      border: 1px solid rgba(26,60,46,.12);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }
    .onepager__top {
      background: linear-gradient(135deg, var(--green) 0%, #0f2419 100%);
      padding: 48px 52px 40px;
      position: relative;
      overflow: hidden;
    }
    .onepager__top::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(201,168,76,.15) 0%, transparent 70%);
    }
    .onepager__wordmark {
      font-family: 'Playfair Display', serif;
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 4px;
    }
    .onepager__afsl {
      font-size: .75rem;
      font-weight: 600;
      color: var(--gold);
      letter-spacing: .1em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .onepager__top-tagline {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-style: italic;
      color: rgba(255,255,255,.85);
      max-width: 460px;
      line-height: 1.4;
    }
    .onepager__content { padding: 44px 52px; }
    .onepager__section-title {
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 16px;
    }
    .onepager__table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 36px;
    }
    .onepager__table th {
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--text-light);
      text-align: left;
      padding: 10px 14px;
      background: rgba(26,60,46,.04);
      border-bottom: 1px solid rgba(26,60,46,.1);
    }
    .onepager__table td {
      padding: 12px 14px;
      font-size: .875rem;
      color: var(--text-mid);
      border-bottom: 1px solid rgba(26,60,46,.06);
      vertical-align: top;
      line-height: 1.55;
    }
    .onepager__table td:first-child {
      font-weight: 600;
      color: var(--green);
      white-space: nowrap;
      width: 38%;
    }
    .onepager__steps {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin-bottom: 36px;
    }
    .onepager__step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .onepager__step-n {
      width: 36px;
      height: 36px;
      background: var(--green);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      font-weight: 700;
      color: var(--gold);
      margin-bottom: 8px;
      flex-shrink: 0;
    }
    .onepager__step-label {
      font-size: .75rem;
      font-weight: 600;
      color: var(--green);
      line-height: 1.3;
    }
    .onepager__footer {
      background: rgba(26,60,46,.03);
      border-top: 1px solid rgba(26,60,46,.08);
      padding: 20px 52px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .onepager__contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: .8125rem;
      color: var(--text-mid);
    }
    .onepager__contact-item svg { flex-shrink: 0; color: var(--gold); }
    @media (max-width: 640px) {
      .onepager__top, .onepager__content { padding: 28px 24px; }
      .onepager__footer { padding: 16px 24px; }
      .onepager__steps { grid-template-columns: repeat(3, 1fr); gap: 8px; }
    }

    /* ─── FOOTER ─── */
    .footer {
      background: var(--green);
      padding: 48px 0 32px;
    }
    .footer__inner {
      max-width: var(--max-w);
      margin: 0 auto;
      padding: 0 24px;
    }
    .footer__top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 40px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .footer__brand-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 6px;
    }
    .footer__brand-afsl {
      font-size: .75rem;
      color: var(--gold);
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .footer__brand-desc {
      font-size: .8125rem;
      color: rgba(255,255,255,.5);
      max-width: 280px;
      margin-top: 12px;
      line-height: 1.6;
    }
    .footer__links-title {
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: rgba(255,255,255,.45);
      margin-bottom: 16px;
    }
    .footer__links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer__links a {
      font-size: .875rem;
      color: rgba(255,255,255,.65);
      transition: color .15s;
    }
    .footer__links a:hover { color: var(--gold); }
    .footer__divider { border: none; border-top: 1px solid rgba(255,255,255,.08); margin-bottom: 24px; }
    .footer__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .footer__copy {
      font-size: .8125rem;
      color: rgba(255,255,255,.35);
    }
    .footer__disclaimer {
      font-size: .75rem;
      color: rgba(255,255,255,.3);
      max-width: 520px;
      line-height: 1.55;
    }
  </style>
</head>
<body>

<!-- ══════════════════════════════════════════════
     NAVIGATION
══════════════════════════════════════════════ -->
<nav class="nav" id="mainNav">
  <div class="nav__inner">
    <a href="#" class="nav__logo">
      <div class="nav__logo-mark">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2L3 7v11h5v-5h4v5h5V7L10 2z" fill="none" stroke="#c9a84c" stroke-width="1.5" stroke-linejoin="round"/>
          <circle cx="10" cy="5.5" r="1.5" fill="#c9a84c"/>
        </svg>
      </div>
      <div>
        <div class="nav__logo-text">Iconic Investors</div>
        <div class="nav__logo-sub">AFSL 450822</div>
      </div>
    </a>

    <ul class="nav__links">
      <li><a href="https://iconicinvestors.com.au" target="_blank" rel="noopener">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#why">Licensee Services</a></li>
      <li><a href="#why">Specialist Services</a></li>
      <li><a href="#contact">Contact Us</a></li>
    </ul>

    <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" class="btn btn-primary nav__cta">
      Book a Free Call
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>

    <button class="nav__hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>

  <div class="nav__mobile" id="mobileMenu">
    <a href="https://iconicinvestors.com.au" target="_blank" rel="noopener">Home</a>
    <a href="#about">About</a>
    <a href="#why">Licensee Services</a>
    <a href="#why">Specialist Services</a>
    <a href="#contact">Contact Us</a>
    <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener">Book a Free Call</a>
  </div>
</nav>

<!-- ══════════════════════════════════════════════
     HERO
══════════════════════════════════════════════ -->
<section class="hero" id="home">
  <div class="hero__inner">
    <div class="hero__left">
      <div class="hero__badge">
        <span class="hero__badge-dot"></span>
        Now Accepting Applications — April 2026
      </div>

      <h1 class="hero__headline">
        Your <em>AFSL Home</em><br>After SMSF<br>Adviser Network
      </h1>

      <p class="hero__sub">
        SMSF Adviser Network (AFSL 430062) closed on 7 April 2026. If you were an authorised representative, you need a new AFSL home — fast, without compromise. Iconic Investors is open and ready.
      </p>

      <div class="hero__actions">
        <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" class="btn btn-primary">
          Book a Free Call
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M3 7.5h9M9 4l3.5 3.5L9 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="#why" class="btn btn-outline">
          See What We Offer
        </a>
      </div>
    </div>

    <div class="hero__card">
      <div class="hero__card-title">Why Iconic Investors?</div>
      <div class="hero__card-sub">A boutique licensee built for experienced advisers</div>
      <ul class="hero__card-list">
        <li>
          <span class="hero__card-check">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5L8 3" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          One flat fee — no revenue share ever
        </li>
        <li>
          <span class="hero__card-check">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5L8 3" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          Live in 2–4 weeks from application
        </li>
        <li>
          <span class="hero__card-check">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5L8 3" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          SMSF specialist-friendly compliance framework
        </li>
        <li>
          <span class="hero__card-check">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5L8 3" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          Boutique support — real people, direct line
        </li>
        <li>
          <span class="hero__card-check">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5L8 3" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          30+ years combined experience
        </li>
      </ul>
      <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" class="btn btn-primary" style="width:100%;justify-content:center;">
        Book Your Discovery Call
      </a>
      <div class="hero__from">
        <strong>Antonio Albuquerque</strong>
        Managing Director, Iconic Investors
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════
     TRUST BAR
══════════════════════════════════════════════ -->
<div class="trustbar">
  <div class="trustbar__inner">
    <div class="trustbar__item">
      <div class="trustbar__value">30+</div>
      <div class="trustbar__label">Years Combined Experience</div>
    </div>
    <div class="trustbar__item">
      <div class="trustbar__value">450822</div>
      <div class="trustbar__label">AFSL Number</div>
    </div>
    <div class="trustbar__item">
      <div class="trustbar__value">2–4 Wks</div>
      <div class="trustbar__label">To Be Authorised &amp; Live</div>
    </div>
    <div class="trustbar__item">
      <div class="trustbar__value">Flat Fee</div>
      <div class="trustbar__label">No Revenue Share. Ever.</div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════
     WHY ICONIC
══════════════════════════════════════════════ -->
<section class="section why" id="why">
  <div class="container">
    <div class="why__header">
      <span class="section-label">Why Iconic</span>
      <h2 class="section-title">Built for Advisers Who Know Their Worth</h2>
      <p class="section-sub">We built Iconic Investors because experienced advisers deserve a licensee that respects their independence, protects their clients, and keeps their business sustainable.</p>
    </div>

    <div class="why__grid">

      <!-- 1 Independence -->
      <div class="why__card">
        <div class="why__icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path d="M13 3L4 8v8c0 4.4 3.8 8.5 9 9.5 5.2-1 9-5.1 9-9.5V8L13 3z" stroke="#1a3c2e" stroke-width="1.6" stroke-linejoin="round" fill="none"/>
            <path d="M9 13l2.5 2.5L17 10" stroke="#c9a84c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="why__card-title">True Independence</h3>
        <p class="why__card-desc">No product quotas. No preferred platforms. No hidden incentives. Your recommendations are yours — we protect that at every level of our compliance framework.</p>
      </div>

      <!-- 2 Flat Fee -->
      <div class="why__card">
        <div class="why__icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <rect x="3" y="7" width="20" height="14" rx="2" stroke="#1a3c2e" stroke-width="1.6" fill="none"/>
            <path d="M3 11h20" stroke="#1a3c2e" stroke-width="1.6"/>
            <path d="M8 16h4M16 16h2" stroke="#c9a84c" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </div>
        <h3 class="why__card-title">One Flat Fee</h3>
        <p class="why__card-desc">One annual fee. No percentage of revenue. No volume hurdles. No surprises. As you grow your practice, your licensee cost stays fixed — the way it should be.</p>
      </div>

      <!-- 3 SMSF Expertise -->
      <div class="why__card">
        <div class="why__icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <circle cx="13" cy="13" r="9" stroke="#1a3c2e" stroke-width="1.6" fill="none"/>
            <path d="M13 8v5l3 3" stroke="#c9a84c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.5 6.5l1.5 1.5M18 6.5l-1.5 1.5" stroke="#1a3c2e" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </div>
        <h3 class="why__card-title">SMSF Specialist-Friendly</h3>
        <p class="why__card-desc">Our compliance framework is built with SMSF specialist advisers in mind — audit support, investment strategy documentation, and SOA templates that understand superannuation nuance.</p>
      </div>

      <!-- 4 Fast Onboarding -->
      <div class="why__card">
        <div class="why__icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path d="M5 13h12M14 9l4 4-4 4" stroke="#1a3c2e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 6v14" stroke="#c9a84c" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </div>
        <h3 class="why__card-title">Fast Onboarding</h3>
        <p class="why__card-desc">We've streamlined every step. From your first call to authorisation in as little as 2–4 weeks. No bureaucratic delays — you're not starting from scratch, and neither are we.</p>
      </div>

      <!-- 5 Boutique Support -->
      <div class="why__card">
        <div class="why__icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path d="M18 9a5 5 0 0 0-10 0c0 3.5 5 9 5 9s5-5.5 5-9z" stroke="#1a3c2e" stroke-width="1.6" fill="none"/>
            <circle cx="13" cy="9" r="2" stroke="#c9a84c" stroke-width="1.4" fill="none"/>
          </svg>
        </div>
        <h3 class="why__card-title">Boutique Support</h3>
        <p class="why__card-desc">You'll have a direct line to real people who know your name and your business. No call centres, no ticket queues — a genuine relationship with your licensee team.</p>
      </div>

      <!-- 6 Built to Last -->
      <div class="why__card">
        <div class="why__icon">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <rect x="4" y="14" width="5" height="8" rx="1" stroke="#1a3c2e" stroke-width="1.6" fill="none"/>
            <rect x="10.5" y="10" width="5" height="12" rx="1" stroke="#1a3c2e" stroke-width="1.6" fill="none"/>
            <rect x="17" y="6" width="5" height="16" rx="1" stroke="#c9a84c" stroke-width="1.6" fill="none"/>
          </svg>
        </div>
        <h3 class="why__card-title">Built to Last</h3>
        <p class="why__card-desc">Iconic Investors is not a holding bay. We're a long-term AFSL home. Our model, compliance infrastructure, and team are designed for advisers building lasting practices.</p>
      </div>

    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════
     PROCESS
══════════════════════════════════════════════ -->
<section class="section process" id="process">
  <div class="container">
    <div class="process__header">
      <span class="section-label">How It Works</span>
      <h2 class="section-title">What the Transition Looks Like</h2>
      <p class="section-sub">We've helped advisers transition before. Here's exactly how it works — from first conversation to being fully live under AFSL 450822.</p>
    </div>

    <div class="process__steps">
      <div class="process__step">
        <div class="process__num">1</div>
        <div>
          <div class="process__step-title">Discovery Call</div>
          <div class="process__step-desc">30-minute call with Antonio to understand your practice, client base, and needs.</div>
        </div>
      </div>
      <div class="process__step">
        <div class="process__num">2</div>
        <div>
          <div class="process__step-title">Application</div>
          <div class="process__step-desc">Complete your AR application and provide supporting documentation. We guide every step.</div>
        </div>
      </div>
      <div class="process__step">
        <div class="process__num">3</div>
        <div>
          <div class="process__step-title">Review</div>
          <div class="process__step-desc">Our compliance team reviews your application and prepares your authorisation paperwork.</div>
        </div>
      </div>
      <div class="process__step">
        <div class="process__num">4</div>
        <div>
          <div class="process__step-title">Authorisation</div>
          <div class="process__step-desc">You're registered as an Authorised Representative under AFSL 450822. ASIC notified.</div>
        </div>
      </div>
      <div class="process__step">
        <div class="process__num">5</div>
        <div>
          <div class="process__step-title">Ongoing Support</div>
          <div class="process__step-desc">Compliance support, document templates, CPD guidance, and a direct line to your licensee team.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════
     CONTACT FORM
══════════════════════════════════════════════ -->
<section class="section contact" id="contact">
  <div class="container">
    <div class="contact__inner">
      <div class="contact__left" id="about">
        <span class="section-label">Get in Touch</span>
        <h2 class="section-title">Ready to Talk?<br>We're Ready to Listen.</h2>
        <p class="section-sub">Fill in the form and a member of the Iconic team will be in touch within one business day. Prefer to book directly? Use the calendar link below.</p>

        <div class="contact__promise" style="margin-top: 32px;">
          <div class="contact__promise-item">
            <div class="contact__promise-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9l3.5 3.5L15 5" stroke="#c9a84c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            Response within one business day
          </div>
          <div class="contact__promise-item">
            <div class="contact__promise-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9l3.5 3.5L15 5" stroke="#c9a84c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            No obligation, no pressure
          </div>
          <div class="contact__promise-item">
            <div class="contact__promise-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9l3.5 3.5L15 5" stroke="#c9a84c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            Speak directly with Antonio or our compliance team
          </div>
          <div class="contact__promise-item">
            <div class="contact__promise-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9l3.5 3.5L15 5" stroke="#c9a84c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            Your enquiry is kept strictly confidential
          </div>
        </div>

        <div style="margin-top: 36px;">
          <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" class="btn btn-green">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            Book Directly in My Calendar
          </a>
        </div>
      </div>

      <div class="contact__form">
        <h3 class="contact__form-title">Send Us a Message</h3>
        <p class="contact__form-sub">We'll respond within one business day.</p>

        <form onsubmit="handleFormSubmit(event)">
          <div class="form-row">
            <div class="form-group">
              <label for="fname">Full Name</label>
              <input type="text" id="fname" name="name" placeholder="Jane Smith" required />
            </div>
            <div class="form-group">
              <label for="femail">Email Address</label>
              <input type="email" id="femail" name="email" placeholder="jane@example.com.au" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="fphone">Phone Number</label>
              <input type="tel" id="fphone" name="phone" placeholder="0400 000 000" />
            </div>
            <div class="form-group">
              <label for="fstate">State</label>
              <select id="fstate" name="state">
                <option value="">Select state…</option>
                <option>NSW</option>
                <option>VIC</option>
                <option>QLD</option>
                <option>WA</option>
                <option>SA</option>
                <option>TAS</option>
                <option>ACT</option>
                <option>NT</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="fasic">ASIC Rep No. <span class="form-optional">(optional)</span></label>
            <input type="text" id="fasic" name="asic" placeholder="e.g. 001234567" />
          </div>

          <div class="form-group">
            <label for="fmessage">Message</label>
            <textarea id="fmessage" name="message" placeholder="Tell us a little about your practice and what you're looking for…"></textarea>
          </div>

          <button type="submit" class="btn btn-primary form-submit">
            Send Message
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <p class="form-privacy">By submitting you agree to our privacy policy. We never share your data.</p>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════
     CAMPAIGN MATERIALS HEADER
══════════════════════════════════════════════ -->
<div class="campaign-header">
  <div class="container">
    <span class="section-label" style="color:rgba(201,168,76,.7);">Project Greenfield — Internal Campaign Assets</span>
    <h2>Outreach Templates</h2>
    <p>Email, SMS, and LinkedIn templates for reaching displaced SMSF Adviser Network advisers. All copy is adviser-to-adviser — direct, respectful, no pressure.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════
     EMAIL COPY SECTION
══════════════════════════════════════════════ -->
<section class="section emails" id="emails">
  <div class="container">
    <div class="emails__header">
      <span class="section-label">Email Templates</span>
      <h2 class="section-title">3-Email Sequence</h2>
      <p class="section-sub">Send over 12 days. Keep tone direct and respectful — adviser to adviser. Personalise [First Name] and [Your Name] fields before sending.</p>
    </div>

    <div class="emails__grid">

      <!-- Email 1 -->
      <div class="email-card">
        <div class="email-card__header">
          <span class="email-card__day">Day 1</span>
          <div class="email-card__subject">
            Your next step after SMSF Adviser Network
            <span>Subject line — send on Day 1 of your sequence</span>
          </div>
        </div>
        <div class="email-card__body">
          <p><strong>Subject:</strong> Your next step after SMSF Adviser Network</p>
          <p>Hi [First Name],</p>
          <p>By now you'll know that SMSF Adviser Network (AFSL 430062) closed its doors on 7 April 2026. If you were operating under that licence, you're currently without a dealer group — and that's a position no one should be in for long.</p>
          <p>My name is Antonio Albuquerque. I'm the Managing Director of Iconic Investors (AFSL 450822), a boutique licensee in Forestville, NSW. We work exclusively with experienced, independent financial advisers — people like you.</p>
          <p>Here's what we offer:</p>
          <ul class="email-list">
            <li><span class="email-list-num">1</span><span>One flat annual fee — no revenue share, no percentage of FUM or revenue</span></li>
            <li><span class="email-list-num">2</span><span>2–4 week onboarding from application to authorisation</span></li>
            <li><span class="email-list-num">3</span><span>A compliance framework built with SMSF specialists in mind</span></li>
            <li><span class="email-list-num">4</span><span>Boutique support — a direct line to real people who know your business</span></li>
          </ul>
          <p>If you're exploring your options, I'd like to have a 30-minute conversation — no obligation, no pressure. Just a straight conversation about whether Iconic Investors could be the right home for your practice.</p>
          <div class="email-cta-line">
            <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" class="email-cta-link">
              Book a Free Call
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <span style="font-size:.8125rem;color:var(--text-light);">iconicinvestors.com.au</span>
          </div>
          <p style="margin-top:16px;">Warm regards,<br><strong>Antonio Albuquerque</strong><br>Managing Director, Iconic Investors<br>AFSL 450822 | connect@iconicinvestors.com.au</p>
        </div>
      </div>

      <!-- Email 2 -->
      <div class="email-card">
        <div class="email-card__header">
          <span class="email-card__day">Day 5</span>
          <div class="email-card__subject">
            Still looking for your next AFSL home?
            <span>Short follow-up — send on Day 5</span>
          </div>
        </div>
        <div class="email-card__body">
          <p><strong>Subject:</strong> Still looking for your next AFSL home?</p>
          <p>Hi [First Name],</p>
          <p>Just checking in — I reached out earlier this week about Iconic Investors following the SMSF Adviser Network closure.</p>
          <p>If you're still working through your options, I'm happy to have a quick 30-minute call to walk you through how we work and whether it could be a fit for your practice.</p>
          <p>No pitch, no pressure — just a straight conversation between advisers.</p>
          <div class="email-cta-line">
            <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" class="email-cta-link">
              Find a Time
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
          <p style="margin-top:16px;">Regards,<br><strong>Antonio Albuquerque</strong><br>Iconic Investors — AFSL 450822</p>
        </div>
      </div>

      <!-- Email 3 -->
      <div class="email-card">
        <div class="email-card__header">
          <span class="email-card__day">Day 12</span>
          <div class="email-card__subject">
            What to look for in your next dealer group
            <span>Value-add email — send on Day 12</span>
          </div>
        </div>
        <div class="email-card__body">
          <p><strong>Subject:</strong> What to look for in your next dealer group</p>
          <p>Hi [First Name],</p>
          <p>Whether you're considering Iconic Investors or exploring other options, I wanted to share a few things worth thinking about as you evaluate your next AFSL home.</p>
          <ul class="email-list">
            <li><span class="email-list-num">1</span><span><strong>Fee structure</strong> — Is it a flat fee, or does your licensee take a percentage of your revenue as you grow? A percentage model means the more successful you become, the more you pay.</span></li>
            <li><span class="email-list-num">2</span><span><strong>SMSF compliance capability</strong> — Does the licensee's compliance framework genuinely understand SMSF advice, or are SMSF clients treated as edge cases?</span></li>
            <li><span class="email-list-num">3</span><span><strong>Scalability of support</strong> — Will you get a direct line to compliance support, or will you be triaging tickets? The answer matters when a client situation is time-sensitive.</span></li>
            <li><span class="email-list-num">4</span><span><strong>Cultural fit</strong> — Is the licensee's model built for high-volume, institution-aligned advisers, or for independent specialists who want to run their own practice?</span></li>
          </ul>
          <p>At Iconic Investors, we've built our model around all four. If you'd like to see how we stack up, I'm happy to have a call.</p>
          <div class="email-cta-line">
            <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" class="email-cta-link">
              Book a Call with Antonio
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5L8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
          <p style="margin-top:16px;">Best,<br><strong>Antonio Albuquerque</strong><br>Managing Director, Iconic Investors<br>AFSL 450822</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════
     SMS SECTION
══════════════════════════════════════════════ -->
<section class="section sms" id="sms">
  <div class="container">
    <div class="sms__header">
      <span class="section-label">SMS Templates</span>
      <h2 class="section-title">2-SMS Sequence</h2>
      <p class="section-sub">Short, respectful, adviser-to-adviser. Include opt-out language as required by your compliance obligations. Personalise [First Name] before sending.</p>
    </div>

    <div class="sms__grid">

      <div class="sms-device">
        <div class="sms-device__label">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="3" y="1" width="8" height="12" rx="1.5" stroke="#c9a84c" stroke-width="1.3" fill="none"/><circle cx="7" cy="10.5" r=".75" fill="#c9a84c"/></svg>
          Day 2 — First SMS
        </div>
        <div class="sms-device__screen">
          <div class="sms-device__contact">Iconic Investors</div>
          <div class="sms-bubble-wrap">
            <div class="sms-bubble">
              Hi [First Name], it's Antonio from Iconic Investors. I know the SMSF Adviser Network closure has left many advisers looking for a new AFSL home. We're a boutique licensee — flat fee, 2–4 week onboarding, SMSF-friendly compliance. Happy to have a quick chat: <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener">iconicinvestors.com.au/call</a> — Reply STOP to opt out.
            </div>
            <div class="sms-timestamp">Delivered</div>
          </div>
        </div>
      </div>

      <div class="sms-device">
        <div class="sms-device__label">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="3" y="1" width="8" height="12" rx="1.5" stroke="#c9a84c" stroke-width="1.3" fill="none"/><circle cx="7" cy="10.5" r=".75" fill="#c9a84c"/></svg>
          Day 7 — Follow-Up SMS
        </div>
        <div class="sms-device__screen">
          <div class="sms-device__contact">Iconic Investors</div>
          <div class="sms-bubble-wrap">
            <div class="sms-bubble">
              Hi [First Name], following up from Iconic Investors. If you're still evaluating your AFSL options, I'd welcome a 30-min call — no obligation. Book here: <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener">iconicinvestors.com.au/call</a> — Antonio. Reply STOP to opt out.
            </div>
            <div class="sms-timestamp">Delivered</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════
     LINKEDIN SECTION
══════════════════════════════════════════════ -->
<section class="section linkedin" id="linkedin">
  <div class="container">
    <div class="linkedin__header">
      <span class="section-label">LinkedIn Templates</span>
      <h2 class="section-title">3 LinkedIn Outreach Templates</h2>
      <p class="section-sub">Use these for direct outreach to displaced advisers on LinkedIn. Personalise before sending — don't blast without reviewing each profile first.</p>
    </div>

    <div class="linkedin__grid">

      <!-- Connection Request -->
      <div class="li-card">
        <div class="li-card__header">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true"><path d="M5 7h2v8H5V7zm1-3a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 6 4zm4 3h2v1.1c.4-.7 1.2-1.3 2.3-1.3C16 6.8 17 8 17 10v5h-2v-4.5c0-.9-.3-1.5-1.1-1.5-.9 0-1.4.6-1.4 1.5V15h-2V7z"/></svg>
          <span class="li-card__type">Connection Request</span>
          <span class="li-card__limit">Under 300 chars</span>
        </div>
        <div class="li-card__body">
          <p>Hi [First Name] — I'm reaching out following the SMSF Adviser Network closure. I run Iconic Investors (AFSL 450822), a boutique licensee for independent advisers. Happy to connect and share some information if it's useful. — Antonio</p>
          <p style="font-size:.75rem;color:var(--text-light);margin-top:8px;">Character count: ~230 — within LinkedIn's 300-char limit for connection notes.</p>
        </div>
      </div>

      <!-- Post-Connection Message -->
      <div class="li-card">
        <div class="li-card__header">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true"><path d="M3 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm7 4.5L4 6.5v1l6 4 6-4v-1L10 9.5z"/></svg>
          <span class="li-card__type">Post-Connection Message</span>
        </div>
        <div class="li-card__body">
          <p>Hi [First Name],</p>
          <p>Thanks for connecting.</p>
          <p>I wanted to reach out directly — with the SMSF Adviser Network closure, I know a number of advisers are working through their options right now.</p>
          <p>At Iconic Investors, we've built our licensee model specifically for independent advisers who want to run their practice their way — flat fee, boutique support, SMSF-friendly compliance.</p>
          <p>If it would be useful, I'm happy to have a 30-minute call to walk you through how we work. No obligation at all.</p>
          <p>Calendar link: <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" style="color:#0a66c2;">Book a time here</a></p>
          <p>Best,<br><strong>Antonio Albuquerque</strong><br>Iconic Investors | AFSL 450822</p>
        </div>
      </div>

      <!-- InMail -->
      <div class="li-card">
        <div class="li-card__header">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true"><path d="M2 4h16v12H2V4zm1 1v1.5l7 4.5 7-4.5V5H3zm0 2.5V15h14V7.5L10 12 3 7.5z"/></svg>
          <span class="li-card__type">InMail</span>
        </div>
        <div class="li-card__body">
          <div class="li-card__subject">
            Subject: AFSL options following the SMSF Adviser Network closure
          </div>
          <p>Hi [First Name],</p>
          <p>My name is Antonio Albuquerque — I'm the Managing Director of Iconic Investors, a boutique AFSL licensee based in Forestville, NSW (AFSL 450822).</p>
          <p>I noticed you were previously authorised under the SMSF Adviser Network and wanted to reach out in case you're currently evaluating your next AFSL home.</p>
          <p>We work exclusively with experienced, independent advisers. Our model is straightforward: one flat annual fee, SMSF-informed compliance, and genuine boutique support — not a call centre.</p>
          <p>We can typically onboard advisers in 2–4 weeks from application, which I know matters when you're between licences.</p>
          <p>If you'd like a brief call to see whether there's a fit, I'd welcome it. You can book directly here: <a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener" style="color:#0a66c2;">iconicinvestors.com.au/call</a></p>
          <p>Either way, I wish you well in finding the right home for your practice.</p>
          <p><strong>Antonio Albuquerque</strong><br>Managing Director, Iconic Investors<br>AFSL 450822</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════
     ONE-PAGER PREVIEW
══════════════════════════════════════════════ -->
<section class="section onepager" id="onepager">
  <div class="container">
    <div class="onepager__header" style="text-align:center; margin-bottom:48px;">
      <span class="section-label">One-Pager Preview</span>
      <h2 class="section-title">Downloadable One-Pager</h2>
      <p class="section-sub" style="margin:0 auto;">A printable A4 overview for advisers requesting more information. Print from browser or export to PDF.</p>
    </div>

    <div class="onepager__frame">

      <div class="onepager__top">
        <div class="onepager__wordmark">Iconic Investors</div>
        <div class="onepager__afsl">AFSL 450822 &nbsp;|&nbsp; ABN Listed on ASIC</div>
        <div class="onepager__top-tagline">"Your AFSL Home for Independent Financial Planners"</div>
      </div>

      <div class="onepager__content">

        <div class="onepager__section-title">Our Services</div>
        <table class="onepager__table">
          <thead>
            <tr>
              <th>Service</th>
              <th>What This Means for You</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AFSL Authorisation</td>
              <td>Full Authorised Representative registration under AFSL 450822, ASIC-notified and compliant from day one.</td>
            </tr>
            <tr>
              <td>Compliance Framework</td>
              <td>SMSF-informed policies, SOA templates, investment strategy documents, and ongoing compliance review.</td>
            </tr>
            <tr>
              <td>Ongoing Compliance Support</td>
              <td>Direct access to our compliance team for file reviews, advice queries, and regulatory updates.</td>
            </tr>
            <tr>
              <td>PI Insurance Guidance</td>
              <td>Support navigating professional indemnity requirements and maintaining cover appropriate to your practice.</td>
            </tr>
            <tr>
              <td>CPD Management</td>
              <td>CPD tracking, guidance on approved providers, and documentation for your annual compliance register.</td>
            </tr>
            <tr>
              <td>Practice Development</td>
              <td>Coaching, referral network access, and strategic guidance from advisers with 30+ years combined experience.</td>
            </tr>
          </tbody>
        </table>

        <div class="onepager__section-title">Onboarding — 5 Steps to Authorisation</div>
        <div class="onepager__steps">
          <div class="onepager__step">
            <div class="onepager__step-n">1</div>
            <div class="onepager__step-label">Discovery Call</div>
          </div>
          <div class="onepager__step">
            <div class="onepager__step-n">2</div>
            <div class="onepager__step-label">Application</div>
          </div>
          <div class="onepager__step">
            <div class="onepager__step-n">3</div>
            <div class="onepager__step-label">Compliance Review</div>
          </div>
          <div class="onepager__step">
            <div class="onepager__step-n">4</div>
            <div class="onepager__step-label">Authorisation</div>
          </div>
          <div class="onepager__step">
            <div class="onepager__step-n">5</div>
            <div class="onepager__step-label">Ongoing Support</div>
          </div>
        </div>

        <div style="background:rgba(26,60,46,.04);border-radius:10px;padding:16px 20px;border-left:3px solid var(--gold);">
          <div style="font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;">Our Commitment to You</div>
          <div style="font-size:.875rem;color:var(--text-mid);line-height:1.65;">One flat fee. No revenue share. No percentages. No surprises. Your success stays yours.</div>
        </div>

      </div>

      <div class="onepager__footer">
        <div class="onepager__contact-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 4h10v7H2z" stroke="#c9a84c" stroke-width="1.2" fill="none" rx="1"/><path d="M2 5l5 4 5-4" stroke="#c9a84c" stroke-width="1.2" stroke-linecap="round"/></svg>
          connect@iconicinvestors.com.au
        </div>
        <div class="onepager__contact-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5" stroke="#c9a84c" stroke-width="1.2" fill="none"/><path d="M2 7h10M7 2c-1.5 2-1.5 8 0 10M7 2c1.5 2 1.5 8 0 10" stroke="#c9a84c" stroke-width="1.1"/></svg>
          iconicinvestors.com.au
        </div>
        <div class="onepager__contact-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2C4.8 2 3 3.8 3 6c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke="#c9a84c" stroke-width="1.2" fill="none"/><circle cx="7" cy="6" r="1.3" stroke="#c9a84c" stroke-width="1.1" fill="none"/></svg>
          Forestville NSW 2087
        </div>
      </div>

    </div>

    <!-- Print button -->
    <div style="text-align:center;margin-top:28px;">
      <button onclick="window.print()" class="btn btn-outline" style="border-color:rgba(26,60,46,.25);color:var(--text-mid);">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="5" width="10" height="7" rx="1" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M5 5V3h6v2M5 12v1h6v-1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="12" cy="8" r=".75" fill="currentColor"/></svg>
        Print / Save as PDF
      </button>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════
     FOOTER
══════════════════════════════════════════════ -->
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__top">
      <div>
        <div class="footer__brand-name">Iconic Investors</div>
        <div class="footer__brand-afsl">AFSL 450822</div>
        <p class="footer__brand-desc">Boutique AFSL Licensee for Experienced Financial Advisers. Based in Forestville NSW 2087.</p>
      </div>

      <div>
        <div class="footer__links-title">Navigation</div>
        <ul class="footer__links">
          <li><a href="https://iconicinvestors.com.au" target="_blank" rel="noopener">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#why">Licensee Services</a></li>
          <li><a href="#why">Specialist Services</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>

      <div>
        <div class="footer__links-title">Campaign Assets</div>
        <ul class="footer__links">
          <li><a href="#emails">Email Templates</a></li>
          <li><a href="#sms">SMS Templates</a></li>
          <li><a href="#linkedin">LinkedIn Templates</a></li>
          <li><a href="#onepager">One-Pager</a></li>
        </ul>
      </div>

      <div>
        <div class="footer__links-title">Contact</div>
        <ul class="footer__links">
          <li><a href="mailto:connect@iconicinvestors.com.au">connect@iconicinvestors.com.au</a></li>
          <li><a href="https://iconicinvestors.com.au" target="_blank" rel="noopener">iconicinvestors.com.au</a></li>
          <li><a href="https://api.leadconnectorhq.com/widget/booking/EES2gzrU89UBYJYY3l2p" target="_blank" rel="noopener">Book a Call</a></li>
        </ul>
      </div>
    </div>

    <hr class="footer__divider" />

    <div class="footer__bottom">
      <div class="footer__copy">&copy; 2026 Iconic Investors Pty Ltd. All rights reserved.</div>
      <p class="footer__disclaimer">
        Iconic Investors Pty Ltd holds Australian Financial Services Licence No. 450822. This page is intended for licensed financial advisers only and does not constitute personal financial advice. Any advice or information provided is general in nature.
      </p>
    </div>
  </div>
</footer>

<!-- ══════════════════════════════════════════════
     SCRIPTS
══════════════════════════════════════════════ -->
<script>
  // Sticky nav shadow on scroll
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Contact form handler (demo)
  function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Message Sent';
    btn.disabled = true;
    btn.style.background = '#2d6b52';
    btn.style.borderColor = '#2d6b52';
    btn.style.cursor = 'default';
    form.querySelectorAll('input, select, textarea').forEach(f => f.disabled = true);
    const note = document.createElement('p');
    note.style.cssText = 'text-align:center;color:#2d6b52;font-weight:600;font-size:.875rem;margin-top:12px;';
    note.textContent = 'Thank you — we will be in touch within one business day.';
    form.appendChild(note);
  }
</script>

<!-- Print styles -->
<style>
  @media print {
    .nav, .hero, .trustbar, .why, .process, .contact, .campaign-header, .emails, .sms, .linkedin, .footer { display: none !important; }
    .onepager { padding: 0 !important; }
    .onepager__header { display: none !important; }
    .onepager__frame { box-shadow: none !important; border: none !important; max-width: 100% !important; }
    body { background: white !important; }
  }
</style>

</body>
</html>
`;

const Campaign = () => {
  useEffect(() => {
    // Replace entire document with campaign HTML
    document.open();
    document.write(campaignHTML);
    document.close();
  }, []);

  return null;
};

export default Campaign;
