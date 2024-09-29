import { Route, Routes } from "react-router-dom";
import PrivateRouteCliente from "./routes/PrivateRoutes/PrivateRouteCliente";
import PrivateRouteAdmin from "./routes/PrivateRoutes/PrivateRouteAdmin";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import About from "./pages/About";
import CreateMaterial from "./pages/CreateMaterial";
import CreateCategory from "./pages/CreateCategory";
import CreateProduct from "./pages/CreateProduct";
import Register from "./pages/Register";
import ProductosRelojesDeportivos from "./pages/ProductosRelojesDeportivos";
import ProductosRelojesFormales from "./pages/ProductosRelojesFormales";
import ProductosCadenasOro from "./pages/ProductosCadenasOro";
import ProductosCadenasPlata from "./pages/ProductosCadenasPlata";
import ProductosPulserasOro from "./pages/ProductosPulserasOro";
import ProductosAnillosMatrimonio from "./pages/ProductosAnillosMatrimonio";
import ProductosAnillosSolitarioPiedras from "./pages/ProductosAnillosSolitarioPiedras";
import ProductosDijesOro from "./pages/ProductosDijesOro";
import ProductosDijesPlata from "./pages/ProductosDijesPlata";
import ProductosAretesOro from "./pages/ProductosAretesOro";
import Carrito from "./pages/Carrito";
import ListProducts from "./pages/ListProducts";
import ListFacturas from "./pages/ListFacturas";
import ListClients from "./pages/ListClients";
import ProductoSeleccionado from "./pages/ProductoSeleccionado";
import RegisterFactura from "./pages/RegisterFactura";
import ProductsByCategory from "./pages/ProductsByCategory";
import Compras from "./pages/Compras";
import './styles/Login.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {useEffect} from "react";
import { jwtDecode } from 'jwt-decode';
import {userApi} from "./common";
import {useAuth} from "./AuthProvider";


function App() {

  const auth = useAuth();

  useEffect(() => {
    /**     Toastr Options     */
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      timeOut: 3000,
      // Añadir margen inferior con la propiedad css
      onShown: function() {
        document.querySelector('.toast-top-center').style.marginTop = '10px';
      }
    };
  }, []);

  useEffect( () => {
    const token = localStorage.getItem('site');

    if (token) {
      const userDecoded = jwtDecode(token);
      const fetchGetUser = async () => {
        await fetch(`${userApi.getUser.url}/${userDecoded.id}`, {
          method: userApi.getUser.method,
          headers: {
            "Content-Type": "application/json",
          }
        }).then((response) => response.json()
            .then((data) => {
              auth.setUser(data?.user)
            }));
      }

      fetchGetUser();
    }
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acerda-de" element={<About />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categoria/:category" element={<ProductsByCategory />} />
        <Route path="/productos/relojes/deportivos" element={<ProductosRelojesDeportivos />} />
        <Route path="/productos/relojes/formales" element={<ProductosRelojesFormales />} />
        <Route path="/productos/cadenas/oro" element={<ProductosCadenasOro />} />
        <Route path="/productos/cadenas/plata" element={<ProductosCadenasPlata />} />
        <Route path="/productos/pulseras/oro" element={<ProductosPulserasOro />} />
        <Route path="/productos/anillos/matrimonio" element={<ProductosAnillosMatrimonio />} />
        <Route path="/productos/anillos/solitarioPiedras" element={<ProductosAnillosSolitarioPiedras />} />
        <Route path="/productos/dijes/oro" element={<ProductosDijesOro />} />
        <Route path="/productos/dijes/plata" element={<ProductosDijesPlata />} />
        <Route path="/productos/aretes/oro" element={<ProductosAretesOro />} />
        <Route path="/productSelect" element={<ProductoSeleccionado />} />
        <Route element={<PrivateRouteCliente />}>
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/factura" element={<RegisterFactura />} />
          <Route path="/compras" element={<Compras />} />
        </Route>
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/crear/material" element={<CreateMaterial />} />
          <Route path="/crear/categoria" element={<CreateCategory />} />
          <Route path="/crear/producto" element={<CreateProduct />} />
          <Route path="/consultar/productos" element={<ListProducts />} />
          <Route path="/consultar/facturas" element={<ListFacturas />} />
          <Route path="/consultar/clientes" element={<ListClients />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
