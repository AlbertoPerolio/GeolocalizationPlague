import "../styles/HomePage.css";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <section className="section-home" id="inicio">
        <div className="content-home">
          <div className="content-home2">
            <div className="home-image">
              <div className="box-container">
                <img
                  src={require("../img/bracelet.png")}
                  alt="img-home"
                  className="img-home"
                />
              </div>
            </div>
            <div className="home-text">
              <div className="box-container2">
                <h1 className="home-heading">
                  Diseñado Para Tu<span className="home-span"> Comodidad</span>
                </h1>
                <p className="para-home">
                  Con Vital Bracelet podrás cuidar de tu salud de una manera
                  fácil
                </p>
                <div className="btn-home">
                  <a href="#Nada" className="home-links">
                    Comprar Ahora
                  </a>
                  <a href="#articulos" className="home-links btn-2">
                    Explorar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Inicio de sobre nosotros */}
      <section className="section-about" id="sobrenosotros">
        <div className="about-us-container">
          <div className="about-us">
            <div className="about-left">
              <div className="content-about">
                <h3 className="heading-about">Sobre Nosotros</h3>
                <p className="para-about">
                  Somos un grupo de cinco compañeros que diseñó un brazalete
                  capaz de monitorear signos vitales cardíacos y, en caso de
                  detectar irregularidades críticas, notificar a los contactos
                  de emergencia a través de una aplicación.
                </p>
                <p className="para-about">
                  Tenemos la intención de realizar el dispositivo con materiales
                  reciclables y de un bajo costo.
                </p>
                <span className="span-about"></span>{" "}
                <Link to="/LeerMas" className="link-about">
                  Leer más
                </Link>
              </div>
            </div>
            <div className="about-right">
              <img
                src={require("../img/bracelet2.jpg")}
                className="img-about"
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Final de sobre nosotros */}

      {/* Inicio de Productos */}
      <section className="product-category" id="articulos">
        <h2 className="heading-product">Categorías del producto</h2>

        <div className="scroll-container">
          <div className="card-product">
            <img
              src={require("../img/bracelet3blackback.jpg")}
              className="img-card"
              alt="Bracelet Black"
            />
            <div className="card-body">
              <h5 className="card-title">Bracelet Black Plastic Design</h5>
              <p className="card-text">
                Un estilo de calle con una correa de plástico
              </p>
              <a href="#Nada" className="btn-product-ctg">
                leer más
              </a>
            </div>
          </div>
          <div className="card-product">
            <img
              src={require("../img/bracelet4blueback.jpg")}
              className="img-card"
              alt="Bracelet Blue"
            />
            <div className="card-body">
              <h5 className="card-title">Bracelet Blue Plastic Design</h5>
              <p className="card-text">
                Un estilo de calle con una correa de plástico
              </p>
              <a href="#Nada" className="btn-product-ctg">
                leer más
              </a>
            </div>
          </div>

          <div className="card-product">
            <img
              src={require("../img/bracelet5grayback.jpg")}
              className="img-card"
              alt="Bracelet Gray"
            />
            <div className="card-body">
              <h5 className="card-title">Bracelet Gray Aluminum Design</h5>
              <p className="card-text">
                Un estilo elegante con una correa de aluminio
              </p>
              <a href="#Nada" className="btn-product-ctg">
                leer más
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Fin de Productos */}
      {/*  Inicio de Contacto */}

      <section className="contact-form" id="contacto">
        <h3 className="heading-contact">Contactarnos</h3>
        <div className="contact-container">
          <div className="form-column">
            <form className="form-origin">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  id="nombre"
                  name="nombre"
                />
                <input
                  type="email"
                  placeholder="Correo"
                  id="correo"
                  name="correo"
                />
              </div>
              <div className="form-row">
                <textarea
                  placeholder="Tu Mensaje"
                  id="mensaje"
                  name="mensaje"
                ></textarea>
              </div>
              <div className="form-row center">
                <a href="#Nada" className="btn-contact">
                  Enviar Mensaje
                </a>
              </div>
            </form>
          </div>
          <div className="info-column">
            <div className="content-contact">
              <h2 className="heading-content">
                Más Sobre <span>Vital Bracelet</span>
              </h2>
              <p className="para-content">
                Somos estudiantes del Instituto Superior N°6039
              </p>
              <p className="para-content">
                Contestaremos a las preguntas o mensajes lo más rápido que
                podamos.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Final de contacto */}
    </div>
  );
}

export default HomePage;
