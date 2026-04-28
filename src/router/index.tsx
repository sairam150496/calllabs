import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PUBLIC_ROUTES } from '@/config/routes'
import { ComingSoon } from '@/pages/ComingSoon'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
        <Route path={PUBLIC_ROUTES.TESTS} element={<ComingSoon title="Lab Tests" />} />
        <Route path={PUBLIC_ROUTES.PACKAGES} element={<ComingSoon title="Health Packages" />} />
        <Route path={PUBLIC_ROUTES.AMBULANCE} element={<ComingSoon title="Ambulance Service" />} />
        <Route path={PUBLIC_ROUTES.MEDICINE} element={<ComingSoon title="Medicine Delivery" />} />
        <Route path={PUBLIC_ROUTES.DOCTOR} element={<ComingSoon title="Doctor Consultation" />} />
        <Route path={PUBLIC_ROUTES.REMINDER} element={<ComingSoon title="Medicine Reminder" />} />
        <Route
          path={PUBLIC_ROUTES.PHYSIOTHERAPY}
          element={<ComingSoon title="Physiotherapy" />}
        />
        <Route path={PUBLIC_ROUTES.HOME_NURSE} element={<ComingSoon title="Home Nurse" />} />
        <Route path={PUBLIC_ROUTES.ABOUT} element={<ComingSoon title="About Us" />} />
        <Route path={PUBLIC_ROUTES.CONTACT} element={<ComingSoon title="Contact Us" />} />
        <Route path={PUBLIC_ROUTES.PRIVACY} element={<ComingSoon title="Privacy Policy" />} />
        <Route
          path={PUBLIC_ROUTES.TERMS}
          element={<ComingSoon title="Terms & Conditions" />}
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
