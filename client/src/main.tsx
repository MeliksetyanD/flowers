import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import Layout from './layout/Layout.tsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import '/public/globalStyles/global.css'
import '/public/globalStyles/normalize.css'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<h1>Home</h1>} />
			</Route>
			<Route path='*' element={<ErrorPage />} />
		</Routes>
	</BrowserRouter>
)
