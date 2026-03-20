
import './App.css'
import { Payment } from './components/Payment'
import { Home } from './pages/Home'

const getSharedData = () => {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("data");
  if (!encoded) return null;
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
};

function App() {
  const isShared = !!getSharedData();

  return (
<>
<div className="min-h-screen flex flex-col justify-center">
  <Home />
  <Payment isShared={isShared} />
</div>
</>
  )
}

export default App
