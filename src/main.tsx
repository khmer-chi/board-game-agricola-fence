// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import '@pixi/layout/react';

const el = document.getElementById('root')!;
createRoot(el).render(<App />);
