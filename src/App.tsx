// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {
  // BrowserRouter,
  HashRouter, Route,
  // Router,
  Routes
} from 'react-router-dom'
import AppLayout from './layouts/home/AppLayout'
import Home from './pages/Home/home'
import ProductDetail from './pages/Home/productdetail'
import Cart from './pages/Home/cart'
import Dashboard from './pages/Admin/dashboard'
import PageProduct from './pages/Admin/product/pageProduct'
import PageSize from './pages/Admin/size/pageSize'
import PageColor from './pages/Admin/color/pageColor'
import NotFoundPage from './pages/notfound'
import AppLayoutAdmin from './layouts/admin/AppLayoutAdmin'
import UserProfile from './pages/Admin/userprofile'
import ProtectedRoute from './routes/ProtectedRoute'
import GlobalModal from './components/common/GlobalModal'
import SearchResult from './pages/Home/searchresults'
function App() {
  return (
    // <div className='h-screen flex items-center justify-center bg-gray-100'>
    //   <h1 className='text-4xl font-bold text-blue-600'>
    //     Hello vite 7 + Tailwind V4
    //   </h1>
    // </div>
    <HashRouter>
      <GlobalModal />
      <Routes>
        {/* Role User */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="project-mini/productdetail/:id" element={<ProductDetail />} />
          <Route path='project-mini/:keyword' element={<SearchResult />} />
          <Route path="project-mini/cart" element={<ProtectedRoute requiredRole={["User", "Admin"]}><Cart /></ProtectedRoute>} />
        </Route>
        {/* Role Admin */}
        <Route element={<ProtectedRoute requiredRole="Admin"><AppLayoutAdmin /></ProtectedRoute>}>
          <Route index path="project-mini/dashboard" element={<Dashboard />} />
          <Route path='project-mini/product' element={<PageProduct />} />
          <Route path='project-mini/colorPro' element={<PageColor />} />
          <Route path='project-mini/sizePro' element={<PageSize />} />
          <Route path='project-mini/userprofile' element={<UserProfile />} />

        </Route>
        {/* Trang 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
