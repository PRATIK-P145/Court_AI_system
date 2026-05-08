/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CaseProvider } from './context/CaseContext';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import CaseAnalysisPage from './pages/CaseAnalysisPage';
import VerificationPage from './pages/VerificationPage';

export default function App() {
  return (
    <CaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="analysis" element={<CaseAnalysisPage />} />
            <Route path="verification" element={<VerificationPage />} />
          </Route>
        </Routes>
      </Router>
    </CaseProvider>
  );
}
