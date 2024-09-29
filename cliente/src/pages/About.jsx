import Navbar from "../components/NavBar";
import "../styles/About.css";

const About = () => {
   return (
       <>
          <Navbar />
          <div className="about-section">
             <div className="container">
                <h2 className="subtitle">Quienes Somos</h2>
                <p className="text">
                   Bienvenidos a Joyeria D' Laura, donde la elegancia y la calidad se unen en cada pieza. Desde 1980, hemos sido sinónimo de excelencia en el mundo de la joyería, especializándonos en relojes de lujo, cadenas exquisitas y la fabricación artesanal de anillos de matrimonio.
                </p>

                <h2 className="subtitle">Nuestra Historia</h2>
                <p className="text">
                   Fundada en 1980, Joyeria D' Laura comenzó como un pequeño taller familiar dedicado a la creación de joyas únicas y personalizadas. Con el paso de los años, nuestro compromiso con la calidad y la atención al detalle nos ha permitido crecer y convertirnos en un referente en el sector de la joyería.
                </p>

                <h2 className="subtitle">Nuestra Pasión</h2>
                <p className="text">
                   Nuestra pasión por la joyería va más allá de la simple fabricación de piezas. Cada reloj, cadena y anillo de matrimonio es una obra de arte, creada con los más altos estándares de calidad y un diseño atemporal. Nos enorgullece trabajar con los mejores materiales y técnicas innovadoras para ofrecer joyas que no solo sean hermosas, sino que también cuenten una historia.
                </p>

                <h2 className="subtitle">Nuestro Compromiso</h2>
                <p className="text">
                   En Joyeria D' Laura, creemos que cada cliente es único y merece una experiencia personalizada. Nuestro equipo de especialistas está aquí para asesorarte y ayudarte a encontrar la joya perfecta para cada ocasión.
                </p>

                <h2 className="subtitle">Nuestro Taller</h2>
                <p className="text">
                   Como fabricantes de anillos de matrimonio, nos dedicamos a crear piezas que simbolicen el amor y el compromiso. Nuestro taller combina la artesanía tradicional con la tecnología moderna para asegurar que cada anillo sea perfecto.
                </p>

                <h2 className="subtitle">Visítanos</h2>
                <p className="text">
                   Te invitamos a visitar nuestra tienda y descubrir la belleza y calidad de nuestras joyas.
                </p>
             </div>
          </div>
       </>
   );
};

export default About;
